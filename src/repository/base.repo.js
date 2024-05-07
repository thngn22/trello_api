'use strict'

const { Types } = require('mongoose')
class Repository {
  #defaultOption
  #defaultPaginateOption

  constructor(model, name) {
    this.model = model
    this.name = name
    this.#defaultOption = {
      select: [],
      unselect: ['_v', 'is_deleted'],
      sort: 'ctime'
    }
    this.#defaultPaginateOption = {
      page: 1,
      limit: 20
    }
  }

  #createFilter = ({ select, unselect }) => {
    if (select) return Object.fromEntries(select.map((el) => [el, 1]))
    if (unselect) return Object.fromEntries(unselect.map((el) => [el, 0]))
    return []
  }

  create = async (object) => {
    return JSON.parse(JSON.stringify(await this.model.create(object)))
  }

  insertMany = async (objects) => {
    return await this.model.insertMany(objects, {
      upsert: true,
      new: true
    })
  }

  deleteMany = async (filter) => {
    return await this.model.deleteMany(filter)
  }

  find = async (
    filter,
    mongodbOptions = { ...this.#defaultOption }
  ) => {
    const query = async () =>
      await this.model
        .find({
          ...filter,
          is_deleted: {
            $ne: true
          }
        })
        .select(this.#createFilter(mongodbOptions))
        .sort(mongodbOptions.sort)
        .lean()
    return await query()
  }

  findById = async (
    id,
    mongodbOptions = { ...this.#defaultOption }
  ) => {
    const query = async () =>
      await this.model
        .findById(new Types.ObjectId(id))
        .select(this.#createFilter(mongodbOptions))
        .sort(mongodbOptions.sort)
        .lean()
    return await query()
  }

  findOne = async (
    filter,
    mongodbOptions = { ...this.#defaultOption }
  ) => {
    const query = async () =>
      await this.model
        .findOne({
          ...filter,
          is_deleted: {
            $ne: true
          }
        })
        .select(this.#createFilter(mongodbOptions))
        .lean()
    return await query()
  }

  findOneAndUpdate = async (filter, object) => {
    return await this.model.findOneAndUpdate(filter, object, {
      // upsert: true,
      new: true
    })
  }

  findOneAndSoftDelete = async (filter) => {
    return await this.model.findOneAndUpdate(filter, {
      is_deleted: true
    })
  }

  findOneAndDelete = async (filter) => {
    return await this.model.findOneAndDelete(filter)
  }

  page = async (
    filter,
    mongodbOptions = {
      ...this.#defaultOption,
      ...this.#defaultPaginateOption
    }
  ) => {
    const _options = {
      ...this.#defaultOption,
      ...this.#defaultPaginateOption,
      ...mongodbOptions
    }
    return await this.model
      .find({
        ...filter,
        is_deleted: {
          $ne: true
        }
      })
      .select(this.#createFilter(_options))
      .skip((_options.page - 1) * _options.limit)
      .size(_options.limit)
      .sort(_options.sort)
      .lean()
  }

  updateMany = async (filter, object) => {
    return await this.model.updateMany(filter, object, {
      new: true
    })
  }
}

module.exports = Repository
