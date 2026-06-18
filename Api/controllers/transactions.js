const Transaction = require('../models/transaction');
const { TRANSACTION_CATEGORIES } = require('../constants/transactions');
const { SendData, ServerError } = require('../helpers/response');
const getter = require('../helpers/getter');

module.exports.getCategories = (req, res, next) => next(SendData(TRANSACTION_CATEGORIES));

module.exports.get = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const query = {
      user: res.locals.user.id
    };

    if (filter) {
      query.name = new RegExp(filter, 'i');
    }

    const data = await getter(Transaction, query, req, res);

    return next(SendData(data));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.createTransaction = async (req, { locals: { user } }, next) => {
  try {
    const data = new Transaction({
      ...req.body,
      user: user.id
    });

    await data.save();

    return next(SendData(data.response('cp')));
  } catch (err) {
    return next(ServerError(err));
  }
};
