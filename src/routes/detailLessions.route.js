const express = require('express');
const router = express.Router();

const detailLessionsController = require('../app/controllers/detailLessions.controller');

router.get(
    '/:courseSlug/:slug',
    detailLessionsController.showVideo,
    detailLessionsController.showLessions,
);

module.exports = router;
