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
}

module.exports = new CoursesController();
