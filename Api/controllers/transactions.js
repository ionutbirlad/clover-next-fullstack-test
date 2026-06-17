const Transaction = require('../models/transaction');
const { TRANSACTION_CATEGORIES } = require('../constants/transactions');
const { SendData, ServerError } = require('../helpers/response');

module.exports.getCategories = (req, res, next) => next(SendData(TRANSACTION_CATEGORIES));

module.exports.createTransaction = async (req, { locals: { user } }, next) => {
  try {
    const data = new Transaction(req.body);

    await data.save();

    return next(SendData(data.response('cp')));
  } catch (err) {
    return next(ServerError(err));
  }
};
