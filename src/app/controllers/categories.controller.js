const Course = require('../models/Course');
const Category = require('../models/Category');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /categories
    show(req, res, next) {
        const title = 'Danh mục khoá học ';
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 10;

        let skip = (currentPage - 1) * perPage;
        Category.findOne({ slug: req.params.slug }).then((category) => {
            const cate = mongooseToObject(category);
            let courseQuery = Course.find({ category: cate })
                .populate('course')
                .populate('category')
                .skip(skip)
                .limit(perPage);
            Promise.all([
                courseQuery,
                Course.countDocuments(),
                Category.find({}),
            ])
                .then(([courses, count, categories]) => {
                    res.render('categories', {
                        title: title + cate.name,
                        courses: multipleMongooseToObject(courses),
                        categories: multipleMongooseToObject(categories),
                        pagination: {
                            page: currentPage,
                            limit: perPage,
                            totalRows: count,
                        },
                        categorySlug: cate.slug,
                    });
                })
                .catch(next);
        });
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
