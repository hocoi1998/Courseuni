const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'src/public/uploads/' });

const profileController = require('../app/controllers/profile.controller');

router.get('/', profileController.profile);
router.put('/update', profileController.profileUpdate);
router.get('/avatar', profileController.profileAvatar);
router.post(
    '/avatar',
    upload.single('avatar'),
    profileController.profileUpdateAvatar,
);
router.get('/security', profileController.profileSecurity);
router.put('/security/update', profileController.profileSecurityUpdate);

module.exports = router;
