const express = require('express');
const router = express.Router();

const lessionsController = require('../app/controllers/lessions.controller');

router.get('/:slug/create', lessionsController.create);
router.post('/:slug/store', lessionsController.store);
router.get('/:slug', lessionsController.show);

module.exports = router;
