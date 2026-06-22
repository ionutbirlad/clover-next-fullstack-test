const escapeRegExp = require('lodash/escapeRegExp');
const Transaction = require('../models/transaction');
const { TRANSACTION_CATEGORIES } = require('../constants/transactions');
const { SendData, ServerError, NotFound, ValidationError } = require('../helpers/response');
const getter = require('../helpers/getter');
const { isCategoryValidForType } = require('../helpers/transactions');

module.exports.getCategories = (req, res, next) => next(SendData(TRANSACTION_CATEGORIES));

module.exports.get = async (req, res, next) => {
  try {
    const { title } = req.query;
    const query = {
      user: res.locals.user.id
    };

    if (title) {
      query.title = new RegExp(escapeRegExp(title), 'i');
    }

    const data = await getter(Transaction, query, req, res);

    return next(SendData(data));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.create = async (req, { locals: { user } }, next) => {
  try {
    // Check for type and category combination validity
    const { category, type } = req.body;
    if (!isCategoryValidForType(category, type)) {
      return next(ValidationError('/category'));
    }

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

    // Check for type and category combination validity
    const { category, type } = body;
    const nextCategory = category ?? targetTransaction.category;
    const nextType = type ?? targetTransaction.type;
    if (!isCategoryValidForType(nextCategory, nextType)) {
      return next(ValidationError('/category'));
    }

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
