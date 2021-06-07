const express = require('express');
const router = express.Router();

const exercisesRouter = require('../app/controllers/exercises.controller');

router.get('/:lessonSlug/:slug', exercisesRouter.show);
router.put('/:lessonSlug/:slug/update', exercisesRouter.update);

module.exports = router;
