const express = require('express');
const controller = require('../controllers/transactions');
const { isAuth } = require('../middlewares/isAuth');
const rbac = require('../middlewares/rbac');
const { validator } = require('../middlewares/validator');

const router = express.Router();

router.route('/categories').get(isAuth, rbac('transactionCategories', 'read'), controller.getCategories);

router
  .route('/')
  .post(validator('createTransaction'), isAuth, rbac('transactions', 'create'), controller.createTransaction);

module.exports = router;
