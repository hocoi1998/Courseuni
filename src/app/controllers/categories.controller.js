const Course = require('../models/Course');
const Category = require('../models/Category');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CategoryController {
    // [GET] /categories
    show(req, res, next) {
        const title = 'Danh mục khoá học ';
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 6;

        let skip = (currentPage - 1) * perPage;
        Category.findOne({ slug: req.params.slug }).then((category) => {
            const cate = mongooseToObject(category);
            let courseQuery = Course.find({ category: cate })
                .populate('category')
                .skip(skip)
                .limit(perPage);
            Promise.all([
                courseQuery,
                Course.countDocuments({ category: cate }),
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
}

module.exports = new CategoryController();
