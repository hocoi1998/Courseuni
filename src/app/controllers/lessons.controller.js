const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class LessonsController {
    // [GET] /:slug
    show(req, res, next) {
        let courseQuery = Course.findOne({ slug: req.params.slug });
        let lessonQuery = Lesson.find({ courseSlug: req.params.slug });

        Promise.all([courseQuery, lessonQuery])
            .then(([course, lessons]) => {
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
                res.render('lessons', {
                    title: mongooseToObject(course).name,
                    lessons: multipleMongooseToObject(lessons),
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
}

module.exports = new LessonsController();
