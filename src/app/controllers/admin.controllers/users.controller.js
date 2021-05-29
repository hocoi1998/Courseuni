const User = require('../../models/User');
const { mongooseToObject } = require('../../../util/mongoose');
const { multipleMongooseToObject } = require('../../../util/mongoose');

class usersController {
    // [GET] /users
    show(req, res, next) {
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 10;
        let skip = (currentPage - 1) * perPage;
        const title = 'Quản lý tài khoản';
        Promise.all([
            User.find({}).skip(skip).limit(perPage),
            User.countDocuments(),
        ])
            .then(([users, count]) => {
                res.render('admin/list/users-list', {
                    title,
                    layout: 'admin',
                    users: multipleMongooseToObject(users),
                    pagination: {
                        page: currentPage,
                        limit: perPage,
                        totalRows: count,
                    },
                });
            })
            .catch(next);
    }

    // [GET] /admin/users/:id/edit

    edit(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                res.render('admin/edit/user-edit', {
                    account: mongooseToObject(user),
                    layout: 'admin',
                    title: 'Thông tin tài khoản ' + user.name,
                });
            })
            .catch(next);
    }

    // [PUT] /admin/users/:id/update
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new usersController();
