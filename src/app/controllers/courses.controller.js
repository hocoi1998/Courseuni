const Course = require('../models/Course');
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CoursesController {
    // [GET] /courses
    index(req, res, next) {
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 6;
        let skip = (currentPage - 1) * perPage;
        const title = 'Courseuni - Danh sách khoá học';
        Promise.all([
            Course.find({}).skip(skip).limit(perPage),
            Course.countDocuments(),
            Category.find({}),
        ])
            .then(([courses, count, categories]) =>
                res.render('courses', {
                    title,
                    pagination: {
                        page: currentPage,
                        limit: perPage,
                        totalRows: count,
                    },
                    // totalPage: count / perPage,
                    courses: multipleMongooseToObject(courses),
                    categories: multipleMongooseToObject(categories),
                }),
            )
            .catch(next);
    }
}

module.exports = new CoursesController();
