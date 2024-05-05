'use strict'

const slugify = require('slugify')
const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'board'
const COLLECTION_NAME = 'boards'

var boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description:{
      type: String,
      require: true
    },
    type: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    columnOrderIds: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    _destroy: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

boardSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next()
  }

  this.slug = slugify(this.title, { lower: true, trim: true })
  next()
})

module.exports = model(DOCUMENT_NAME, boardSchema)
