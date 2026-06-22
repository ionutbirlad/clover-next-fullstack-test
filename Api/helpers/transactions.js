const { TRANSACTION_CATEGORIES } = require('../constants/transactions');

const isCategoryValidForType = (category, type) =>
  TRANSACTION_CATEGORIES.some(item => item.value === category && item.type === type);

module.exports = {
  isCategoryValidForType
};
