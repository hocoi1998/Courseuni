const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'src/public/uploads/' });

const usersController = require('../app/controllers/admin.controllers/users.controller');
const categoriesController = require('../app/controllers/admin.controllers/categories.controller');
const dashboardController = require('../app/controllers/admin.controllers/dashboard.controller');
const coursesController = require('../app/controllers/admin.controllers/courses.controller');
const lessonsController = require('../app/controllers/admin.controllers/lessons.controller');
const exercisesController = require('../app/controllers/admin.controllers/exercises.controller');

router.get('/users', usersController.show);
router.get('/users/:id/edit', usersController.edit);
router.put('/users/:id/update', usersController.update);

router.get('/categories', categoriesController.show);
router.get('/categories/create', categoriesController.create);
router.post('/categories/store', categoriesController.store);
router.get('/categories/:categorySlug/edit', categoriesController.edit);
router.put('/categories/:categorySlug/update', categoriesController.update);
router.delete('/categories/:categorySlug/delete', categoriesController.delete);
router.get('/trash/categories', categoriesController.trash);
router.patch(
    '/trash/categories/:categorySlug/restore',
    categoriesController.restore,
);
router.delete(
    '/trash/categories/:categorySlug/forceDelete',
    categoriesController.forceDelete,
);
router.post(
    '/categories/handle-form-actions',
    categoriesController.handleFormActions,
);
router.post(
    '/trash/categories/handle-form-actions',
    categoriesController.handleFormActions,
);

router.get('/courses/create', coursesController.create);
router.post('/courses/store', upload.single('image'), coursesController.store);
router.get('/courses/:courseSlug/edit', coursesController.edit);
router.post(
    '/courses/:courseSlug/update',
    upload.single('image'),
    coursesController.update,
);
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

router.get('/courses/:courseSlug', lessonsController.show);
router.get('/courses/:courseSlug/create', lessonsController.create);
router.post('/courses/:courseSlug/store', lessonsController.store);
router.get('/courses/:courseSlug/:lessonSlug/edit', lessonsController.edit);
router.put('/courses/:courseSlug/:lessonSlug/update', lessonsController.update);
router.delete(
    '/courses/:courseSlug/:lessonSlug/delete',
    lessonsController.delete,
);
router.get('/trash/courses/:courseSlug', lessonsController.trash);
router.patch(
    '/trash/courses/:courseSlug/:lessonSlug/restore',
    lessonsController.restore,
);
router.delete(
    '/trash/courses/:courseSlug/:lessonSlug/forceDelete',
    lessonsController.forceDelete,
);
router.post(
    '/courses/:courseSlug/handle-form-actions',
    lessonsController.handleFormActions,
);
router.post(
    '/trash/courses/:courseSlug/handle-form-actions',
    lessonsController.handleFormActions,
);

router.get('/courses/:courseSlug/:lessonSlug', exercisesController.show);
router.get(
    '/courses/:courseSlug/:lessonSlug/create',
    exercisesController.create,
);
router.post(
    '/courses/:courseSlug/:lessonSlug/store',
    exercisesController.store,
);
router.get(
    '/courses/:courseSlug/:lessonSlug/:slug/edit',
    exercisesController.edit,
);
router.put(
    '/courses/:courseSlug/:lessonSlug/:slug/update',
    exercisesController.update,
);
router.delete(
    '/courses/:courseSlug/:lessonSlug/:slug/delete',
    exercisesController.delete,
);
router.get('/trash/courses/:courseSlug/:lessonSlug', exercisesController.trash);
router.patch(
    '/trash/courses/:courseSlug/:lessonSlug/:slug/restore',
    exercisesController.restore,
);
router.delete(
    '/trash/courses/:courseSlug/:lessonSlug/:slug/forceDelete',
    exercisesController.forceDelete,
);
router.post(
    '/courses/:courseSlug/:lessonSlug/handle-form-actions',
    exercisesController.handleFormActions,
);
router.post(
    '/trash/courses/:courseSlug/:lessonSlug/handle-form-actions',
    exercisesController.handleFormActions,
);

router.get('/courses', coursesController.show);
router.get('/', dashboardController.dashboard);

module.exports = router;
