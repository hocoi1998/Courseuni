const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        const title = 'Courseuni - Học lập trình miễn phí!';
        let courseQuery = Course.find({})
            .sort({ totalStudent: 'desc' })
            .limit(6);
        Promise.all([
            courseQuery,
            Course.countDocuments(),
            User.countDocuments(),
            User.countDocuments({ learning: [] }),
        ])
            .then(([courses, count, students, notLearning]) => {
                res.render('home', {
                    title,
                    courses: multipleMongooseToObject(courses),
                    count,
                    students,
                    learning: students - notLearning,
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        const title = 'Tìm kiếm';
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 6;
        let skip = (currentPage - 1) * perPage;
        const q = new RegExp(req.query.q, 'i');

        const courseQuery = Course.find({ $or: [{ name: q }, { author: q }] })
            .skip(skip)
            .limit(perPage);
        const lessonQuery = Lesson.find({ name: q });
        const count = Course.countDocuments({
            $or: [{ name: q }, { author: q }],
        });
        Promise.all([courseQuery, lessonQuery, count]).then(
            ([courses, lessons, count]) => {
                res.render('search', {
                    title,
                    courses: multipleMongooseToObject(courses),
                    lessons: multipleMongooseToObject(lessons),
                    key: req.query.q,
                    pagination: {
                        page: currentPage,
                        limit: perPage,
                        totalRows: count,
                    },
                });
            },
        );
    }

    // [GET] /logout
    logout(req, res) {
        res.clearCookie('userId');
        res.redirect('/');
    }
}

module.exports = new SiteController();
