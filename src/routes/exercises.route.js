const express = require('express');
const router = express.Router();

const exercisesRouter = require('../app/controllers/exercises.controller');

router.get('/:lessionSlug/create', exercisesRouter.create);
router.post('/:lessionSlug/store', exercisesRouter.store);
router.get('/:lessionSlug/:slug', exercisesRouter.show);

module.exports = router;
