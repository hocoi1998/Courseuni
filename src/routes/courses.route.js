const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/courses.controller');

router.get('/', coursesController.index);

module.exports = router;
