const { TRANSACTION_CONSTANTS } = require('../constants/transactions');
const { SendData, ServerError } = require('../helpers/response');

module.exports.getCategories = async (req, res, next) => {
  try {
    const data = await TRANSACTION_CONSTANTS.TRANSACTION_CATEGORIES;

    return next(SendData(data));
  } catch (err) {
    return next(ServerError(err));
  }
};
