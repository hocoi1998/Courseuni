const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'src/public/uploads/' });

const coursesController = require('../app/controllers/admin.controllers/courses.controller');
const lessionsController = require('../app/controllers/admin.controllers/lessions.controller');
const exercisesController = require('../app/controllers/admin.controllers/exercises.controller');

router.get('/courses/create', coursesController.create);
router.post('/courses/store', upload.single('image'), coursesController.store);
router.get('/courses/:courseSlug/edit', coursesController.edit);
router.put('/courses/:courseSlug/update', coursesController.update);
router.delete('/courses/:courseSlug/delete', coursesController.delete);
router.get('/trash/courses', coursesController.trash);
router.patch('/trash/courses/:courseSlug/restore', coursesController.restore);
router.delete(
    '/trash/courses/:courseSlug/forceDelete',
    coursesController.forceDelete,
);
router.post(
    '/courses/handle-form-actions',
    coursesController.handleFormActions,
);
router.post(
    '/trash/courses/handle-form-actions',
    coursesController.handleFormActions,
);

router.get('/courses/:courseSlug', lessionsController.show);
router.get('/courses/:courseSlug/create', lessionsController.create);
router.post('/courses/:courseSlug/store', lessionsController.store);
router.get('/courses/:courseSlug/:lessionSlug/edit', lessionsController.edit);
router.put(
    '/courses/:courseSlug/:lessionSlug/update',
    lessionsController.update,
);
router.delete(
    '/courses/:courseSlug/:lessionSlug/delete',
    lessionsController.delete,
);
router.get('/trash/courses/:courseSlug', lessionsController.trash);
router.patch(
    '/trash/courses/:courseSlug/:lessionSlug/restore',
    lessionsController.restore,
);
router.delete(
    '/trash/courses/:courseSlug/:lessionSlug/forceDelete',
    lessionsController.forceDelete,
);
router.post(
    '/courses/:courseSlug/handle-form-actions',
    lessionsController.handleFormActions,
);
router.post(
    '/trash/courses/:courseSlug/handle-form-actions',
    lessionsController.handleFormActions,
);

router.get('/courses/:courseSlug/:lessionSlug', exercisesController.show);
router.get(
    '/courses/:courseSlug/:lessionSlug/create',
    exercisesController.create,
);
router.post(
    '/courses/:courseSlug/:lessionSlug/store',
    exercisesController.store,
);
router.get(
    '/courses/:courseSlug/:lessionSlug/:slug/edit',
    exercisesController.edit,
);
router.put(
    '/courses/:courseSlug/:lessionSlug/:slug/update',
    exercisesController.update,
);
router.delete(
    '/courses/:courseSlug/:lessionSlug/:slug/delete',
    exercisesController.delete,
);
router.get(
    '/trash/courses/:courseSlug/:lessionSlug',
    exercisesController.trash,
);
router.patch(
    '/trash/courses/:courseSlug/:lessionSlug/:slug/restore',
    exercisesController.restore,
);
router.delete(
    '/trash/courses/:courseSlug/:lessionSlug/:slug/forceDelete',
    exercisesController.forceDelete,
);
router.post(
    '/courses/:courseSlug/:lessionSlug/handle-form-actions',
    exercisesController.handleFormActions,
);
router.post(
    '/trash/courses/:courseSlug/:lessionSlug/handle-form-actions',
    exercisesController.handleFormActions,
);

router.get('/courses', coursesController.show);

module.exports = router;
