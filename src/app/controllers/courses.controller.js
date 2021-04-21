const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CoursesController {
    // [GET] /courses
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    // [GET] /courses/create
    create(req, res, next) {
        res.render('admin/create/course-create');
    }
    // [POST] /courses/store
    store(req, res, next) {
        const course = new Course(req.body);
        course
            .save()
            .then(() => {
                res.redirect('/courses');
            })
            .catch((error) => {});
    }
}

module.exports = new CoursesController();
