const express = require('express');
const router = express.Router();

const detailLessonsController = require('../app/controllers/detailLessons.controller');

router.get('/:courseSlug/:lessonSlug', detailLessonsController.show);
router.post(
    '/:courseSlug/:lessonSlug/comment',
    detailLessonsController.comment,
);
router.put(
    '/:courseSlug/:lessonSlug/comment/update',
    detailLessonsController.update,
);
router.put('/:courseSlug/:lessonSlug/reply', detailLessonsController.reply);
router.put(
    '/:courseSlug/:lessonSlug/reply/update',
    detailLessonsController.updateReply,
);

module.exports = router;
