const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'src/public/uploads/' });

const siteController = require('../app/controllers/site.controller');

router.get('/logout', siteController.logout);
router.get('/profile', siteController.profile);
router.put('/profile/update', siteController.profileUpdate);
router.get('/profile/security', siteController.profileSecurity);
router.put('/profile/security/update', siteController.profileSecurityUpdate);
router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
