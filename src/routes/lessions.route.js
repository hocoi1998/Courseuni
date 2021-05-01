const express = require('express');
const router = express.Router();

const lessionsController = require('../app/controllers/lessions.controller');

router.get('/:slug', lessionsController.show);

module.exports = router;
