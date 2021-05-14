const express = require('express');
const router = express.Router();

const registerController = require('../app/controllers/register.controller');

router.get('/', registerController.register);
router.post('/', registerController.postRegister);

module.exports = router;
