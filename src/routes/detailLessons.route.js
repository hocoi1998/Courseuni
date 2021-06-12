const express = require('express');
const router = express.Router();

const detailLessonsController = require('../app/controllers/detailLessons.controller');

router.get('/:courseSlug/:lessonSlug', detailLessonsController.show);
router.post(
    '/:courseSlug/:lessonSlug/comment',
    detailLessonsController.comment,
);
router.post(
    '/:courseSlug/:lessonSlug/comment/update',
    detailLessonsController.update,
);
router.put('/:courseSlug/:lessonSlug/reply', detailLessonsController.reply);
router.post(
    '/:courseSlug/:lessonSlug/reply/update',
    detailLessonsController.updateReply,
);

module.exports = router;
