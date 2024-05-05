'use strict'

const { Types } = require('mongoose')
class Cache {
  constructor(redis, name) {
    this.redis = redis
    this.name = name
  }

  #key = (filter) => {
    const filterKey = Object.keys(filter).sort()
    const fields = filterKey.map((key) => {
      return `${key}:${filter[key].toString()}`
    })
    return `${this.name}:${fields.join(':')}`
  }

  #hgetAll = async (key) => {
    return await this.redis.hVals(key)
  }

  #hget = async (key, field) => {
    return await this.redis.hGet(key, field)
  }

  #hset = async (key, value, fieldValue) => {
    if (!value) {
      await this.redis.hSet(key, '', '')
    }
    await this.redis.hSet(
      key,
      value[fieldValue].toString(),
      JSON.stringify(value)
    )
  }

  #get = async (key) => {
    const value = await this.redis.get(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set = async (key, value, redisOptions = undefined) => {
    await this.redis.set(key, JSON.stringify(value), redisOptions)
  }

  findOneWithCache = async (filter, query, redisOptions) => {
    const key = this.#key(filter)
    let item = await this.#get(key)
    if (!item && query) {
      item = await query()
      if (item) {
        await this.set(key, item, redisOptions)
      }
    }
    return item
  }

  findOneInHset = async (filter, field, query = null) => {
    const key = this.#key(filter)
    let item = await this.#hget(key, field)
    if (!item && query) {
      item = await query()
      await this.#hset(key, item, field)
    }
    return item
  }

  findWithCache = async (filter, field, query) => {
    const key = this.#key(filter)
    let items = await this.#hgetAll(key)
    if (!items && query) {
      items = await query()
      await this.#hset(key, items, field)
    }
  }

  findOneWithHsetField = async (filter, hsetFieldValue, hsetField, query) => {
    const key = this.#key(filter)
    let item = await this.#hget(key, hsetFieldValue)
    if (!item && query) {
      item = await query()
      await this.#hset(key, item, hsetField)
    }
    return item
  }
}

class Repository extends Cache {
  #defaultOption
  #defaultPaginateOption

  constructor(model, name) {
    super(name)
    this.model = model
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
    cache = false,
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
    if (cache) {
      return await this.findWithCache(filter, '_id', query)
    }
    return await query()
  }

  findById = async (
    id,
    cache = false,
    mongodbOptions = { ...this.#defaultOption },
    redisOptions
  ) => {
    const query = async () =>
      await this.model
        .findById(new Types.ObjectId(id))
        .select(this.#createFilter(mongodbOptions))
        .sort(mongodbOptions.sort)
        .lean()
    if (cache) {
      return await this.findOneWithCache({ _id: id }, query, redisOptions)
    }
    return await query()
  }

  findOne = async (
    filter,
    cache = false,
    mongodbOptions = { ...this.#defaultOption },
    redisOptions
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
    if (cache) {
      return await this.findOneWithCache(filter, query, redisOptions)
    }
    return await query()
  }

  findOneAndUpdate = async (filter, object) => {
    return await this.model.findOneAndUpdate(filter, object, {
      upsert: true,
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
