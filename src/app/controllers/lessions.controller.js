const Lession = require('../models/Lession');
const { multipleMongooseToObject } = require('../../util/mongoose');

class LessionsController {
    // [GET] /:slug
    show(req, res, next) {
        Lession.find({ courseSlug: req.params.slug })
            .then((lessions) => {
                res.render('lessions', {
                    lessions: multipleMongooseToObject(lessions),
                });
            })
            .catch(next);
    }
    // [GET] /courses/:slug/create
    create(req, res, next) {
        res.render('admin/create/lession-create', {
            courseSlug: req.params.courseSlug,
            slug: req.params.slug,
        });
    }
    // [POST] /courses/:slug/store
    store(req, res, next) {
        const lession = new Lession(req.body);
        lession
            .save()
            .then(() => {
                res.redirect('/courses');
            })
            .catch((error) => {});
    }
}

module.exports = new LessionsController();
