const Transaction = require('../models/transaction');
const { TRANSACTION_CATEGORIES } = require('../constants/transactions');
const { SendData, ServerError, NotFound } = require('../helpers/response');
const getter = require('../helpers/getter');

module.exports.getCategories = (req, res, next) => next(SendData(TRANSACTION_CATEGORIES));

module.exports.get = async (req, res, next) => {
  try {
    const { title } = req.query;
    const query = {
      user: res.locals.user.id
    };

    if (title) {
      query.title = new RegExp(title, 'i');
    }

    const data = await getter(Transaction, query, req, res);

    return next(SendData(data));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.create = async (req, { locals: { user } }, next) => {
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

module.exports.getById = async ({ params: { id } }, { locals: { user } }, next) => {
  try {
    const targetTransaction = await Transaction.findOne({
      _id: id,
      user: user.id
    });
    if (targetTransaction === null) return next(NotFound());

    return next(SendData(targetTransaction.response('cp')));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.update = async ({ params: { id }, body }, { locals: { user } }, next) => {
  try {
    const targetTransaction = await Transaction.findOne({
      _id: id,
      user: user.id
    });
    if (targetTransaction === null) return next(NotFound());

    const data = Object.assign(targetTransaction, body);

    await data.save();

    return next(SendData(targetTransaction.response('cp')));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.delete = async ({ params: { id } }, { locals: { user } }, next) => {
  try {
    const targetTransaction = await Transaction.findOne({
      _id: id,
      user: user.id
    });
    if (targetTransaction === null) return next(NotFound());

    await targetTransaction.softDelete();

    return next(SendData({ message: 'Transaction deleted successfully!' }));
  } catch (err) {
    return next(ServerError(err));
  }
};
