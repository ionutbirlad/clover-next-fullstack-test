const { TRANSACTION_CATEGORIES } = require('../constants/transactions');
const { SendData } = require('../helpers/response');

module.exports.getCategories = (req, res, next) => next(SendData(TRANSACTION_CATEGORIES));
