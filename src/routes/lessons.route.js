const express = require('express');
const router = express.Router();

const lessonsController = require('../app/controllers/lessons.controller');

router.get('/:slug', lessonsController.show);

module.exports = router;
