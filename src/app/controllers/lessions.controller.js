const Lession = require('../models/Lession');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

class LessionsController {
    // [GET] /:slug
    show(req, res, next) {
        let courseQuery = Course.findOne({ slug: req.params.slug });
        let lessionQuery = Lession.find({ courseSlug: req.params.slug });

        Promise.all([courseQuery, lessionQuery])
            .then(([course, lessions]) => {
                if (course) {
                    User.findOne({ _id: req.signedCookies.userId }).then(
                        (data) => {
                            if (
                                data.learning.includes(req.params.slug) == false
                            ) {
                                User.updateOne(
                                    { _id: req.signedCookies.userId },
                                    { $push: { learning: req.params.slug } },
                                ).then();
                                Course.updateOne(
                                    { slug: req.params.slug },
                                    { totalStudent: course.totalStudent + 1 },
                                ).then();
                            }
                        },
                    );
                    // res.cookie('khoahoc', course.slug);
                } else {
                    res.redirect('/');
                }
                res.render('lessions', {
                    lessions: multipleMongooseToObject(lessions),
                });
            })
            .catch(next);
    }
}

module.exports = new LessionsController();
