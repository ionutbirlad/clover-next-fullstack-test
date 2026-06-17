const { TRANSACTION_TYPES, TRANSACTION_CATEGORY_VALUES } = require('../constants/transactions');

module.exports = {
  createTransaction: {
    $id: 'createTransaction',
    type: 'object',
    properties: {
      title: { type: 'string', maxLength: 128, isNotEmpty: true },
      amount: { type: 'number', minimum: 0.01 },
      type: { type: 'string', enum: TRANSACTION_TYPES },
      category: { type: 'string', enum: TRANSACTION_CATEGORY_VALUES },
      date: { type: 'string', format: 'date' }
    },
    required: ['title', 'amount', 'type', 'category', 'date'],
    additionalProperties: false
  },
  updateTransaction: {
    $id: 'updateTransaction',
    type: 'object',
    properties: {
      title: { type: 'string', maxLength: 128 },
      amount: { type: 'number', minimum: 0.01 },
      type: { $ref: 'country', enum: TRANSACTION_TYPES },
      category: { type: 'string', enum: TRANSACTION_CATEGORY_VALUES },
      date: { type: 'string', format: 'date' }
    },
    additionalProperties: false
  }
};
