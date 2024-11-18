const express = require('express');
const { payment } = require('../controllers/payment.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/',authenticate,payment)

module.exports = router 