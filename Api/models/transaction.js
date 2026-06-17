const mongoose = require('mongoose');
const softDelete = require('../helpers/softDelete');
const dbFields = require('../helpers/dbFields');

const { TRANSACTION_TYPES, TRANSACTION_CATEGORY_VALUES } = require('../constants/transactions');

const { Schema } = mongoose;

const schema = new Schema(
  {
    title: {
      type: String,
      maxlength: 128,
      trim: true,
      required: true
    },
    amount: {
      type: Number,
      min: 0.01,
      required: true
    },
    type: {
      type: String,
      enum: TRANSACTION_TYPES,
      lowercase: true,
      required: true
    },
    category: {
      type: String,
      enum: TRANSACTION_CATEGORY_VALUES,
      trim: true,
      lowercase: true,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);
schema.plugin(softDelete);
schema.plugin(dbFields, {
  fields: {
    public: ['_id', 'title', 'amount', 'type', 'category', 'date', 'createdAt', 'updatedAt'],
    listing: ['_id', 'title', 'amount', 'type', 'category', 'date', 'createdAt', 'updatedAt'],
    cp: ['_id', 'title', 'amount', 'type', 'category', 'date', 'createdAt', 'updatedAt']
  }
});

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', schema);
