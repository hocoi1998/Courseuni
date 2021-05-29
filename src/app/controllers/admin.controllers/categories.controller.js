const Category = require('../../models/Category');
const { mongooseToObject } = require('../../../util/mongoose');
const { multipleMongooseToObject } = require('../../../util/mongoose');

class categoriesController {
    // [GET] /categories
    show(req, res, next) {
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 10;
        let skip = (currentPage - 1) * perPage;
        const title = 'Danh mục khoá học';
        Promise.all([
            Category.find({}).skip(skip).limit(perPage),
            Category.countDocuments(),
            Category.countDocumentsDeleted(),
        ])
            .then(([categories, count, deletedCount]) => {
                res.render('admin/list/categories-list', {
                    title,
                    layout: 'admin',
                    categories: multipleMongooseToObject(categories),
                    pagination: {
                        page: currentPage,
                        limit: perPage,
                        totalRows: count,
                    },
                    deletedCount,
                });
            })
            .catch(next);
    }

    // [GET] /admin/categories/create
    create(req, res, next) {
        res.render('admin/create/category-create', {
            title: 'Thêm danh mục',
            layout: 'admin',
        });
    }

    // [POST] /admin/categories/store
    store(req, res, next) {
        const category = new Category(req.body);
        category
            .save()
            .then(() => {
                res.redirect('/admin/categories');
            })
            .catch(next);
        // res.json(req.body)
    }

    // [GET] /admin/categories/:categorySlug/edit

    edit(req, res, next) {
        Promise.all([
            Category.findOne({ slug: req.params.categorySlug }).populate(
                'category',
            ),
        ])
            .then(([category]) =>
                res.render('admin/edit/category-edit', {
                    layout: 'admin',
                    title: 'Sửa danh mục ' + category.name,
                    category: mongooseToObject(category),
                }),
            )
            .catch(next);
    }

    // [PUT] /admin/categories/:CategorySlug/update
    update(req, res, next) {
        Category.updateOne({ slug: req.params.categorySlug }, req.body)
            .then(() => res.redirect('/admin/categories'))
            .catch(next);
    }

    // [DELETE] /admin/categories/:categorySlug/delete
    delete(req, res, next) {
        Category.delete({ slug: req.params.categorySlug })
            .then(res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/trash/categories
    trash(req, res, next) {
        Category.findDeleted({})
            .then((categories) =>
                res.render('admin/trash/categories-trash', {
                    layout: 'admin',
                    title: 'Thùng rác',
                    categories: multipleMongooseToObject(categories),
                }),
            )
            .catch(next);
    }

    // [PATCH] /admin/trash/:categorySlug/restore
    restore(req, res, next) {
        Category.restore({ slug: req.params.categorySlug })
            .then(res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /admin/trash/:categorySlug/forceDelete
    forceDelete(req, res, next) {
        Category.deleteOne({ slug: req.params.categorySlug })
            .then(res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/categories/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Category.delete({ slug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forceDelete':
                Category.deleteMany({ slug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Category.restore({ slug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new categoriesController();
