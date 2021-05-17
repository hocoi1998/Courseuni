const User = require('../models/User');
const Course = require('../models/Course');
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
        res.render('search', {
            title,
        });
    }

    // [GET] /logout
    logout(req, res) {
        res.clearCookie('userId');
        res.redirect('/');
    }
}

module.exports = new SiteController();
