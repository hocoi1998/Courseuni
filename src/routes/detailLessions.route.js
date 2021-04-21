const express = require('express');
const router = express.Router();

const detailLessionsController = require('../app/controllers/detailLessions.controller');
router.get('/:courseSlug/:lessionSlug', detailLessionsController.show);

module.exports = router;
