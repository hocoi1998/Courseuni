const express = require('express');
const router = express.Router();

const categoriesController = require('../app/controllers/categories.controller');

router.get('/:slug', categoriesController.show);
// router.put('/update', profileController.profileUpdate);
// router.get('/avatar', profileController.profileAvatar);
// router.post('/avatar', upload.single('avatar'), profileController.profileUpdateAvatar);
// router.get('/security', profileController.profileSecurity);
// router.put('/security/update', profileController.profileSecurityUpdate);

module.exports = router;
