'use strict'

const slugify = require('slugify')
const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'column'
const COLLECTION_NAME = 'columns'

var columnSchema = new Schema(
  {
    boardId: {
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
    cardOrderIds: {
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

columnSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next()
  }

  this.slug = slugify(this.title, { lower: true, trim: true })
  next()
})

module.exports = model(DOCUMENT_NAME, columnSchema)
