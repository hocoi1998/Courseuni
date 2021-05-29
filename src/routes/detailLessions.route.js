const express = require('express');
const router = express.Router();

const detailLessionsController = require('../app/controllers/detailLessions.controller');

router.get('/:courseSlug/:lessionSlug', detailLessionsController.show);
router.post(
    '/:courseSlug/:lessionSlug/comment',
    detailLessionsController.comment,
);
router.put(
    '/:courseSlug/:lessionSlug/comment/update',
    detailLessionsController.update,
);
router.put('/:courseSlug/:lessionSlug/reply', detailLessionsController.reply);

module.exports = router;
