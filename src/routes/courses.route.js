const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/courses.controller');

//coursesController.index

router.use('/:slug', coursesController.show);
router.use('/', coursesController.index);

module.exports = router;
