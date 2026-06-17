const express = require('express');
const controller = require('../controllers/transactions');
const { isAuth } = require('../middlewares/isAuth');
const rbac = require('../middlewares/rbac');

const router = express.Router();

router.route('/categories').get(isAuth, rbac('transactionCategories', 'read'), controller.getCategories);

module.exports = router;
