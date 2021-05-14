const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CoursesController {
    // [GET] /courses
    index(req, res, next) {
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 6;

        let skip = (currentPage - 1) * perPage;

        Promise.all([
            Course.find({}).skip(skip).limit(perPage),
            Course.countDocuments(),
        ])
            .then(([courses, count]) =>
                res.render('courses', {
                    pagination: {
                        page: currentPage,
                        limit: perPage,
                        totalRows: count,
                    },
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new CoursesController();
