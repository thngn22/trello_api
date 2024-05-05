'use strict'

const slugify = require('slugify')
const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'card'
const COLLECTION_NAME = 'cards'

var cardSchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    columnId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
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

cardSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next()
  }

  this.slug = slugify(this.title, { lower: true, trim: true })
  next()
})

module.exports = model(DOCUMENT_NAME, cardSchema)
