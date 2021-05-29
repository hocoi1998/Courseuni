const User = require('../../models/User');
const Course = require('../../models/Course');
const Lession = require('../../models/Lession');
const Exercise = require('../../models/Exercise');

class dashboardController {
    // DASHBOARD
    // [GET] /admin
    dashboard(req, res, next) {
        const title = 'Dashboard';
        Promise.all([
            User.countDocuments(),
            Course.countDocuments(),
            Lession.countDocuments(),
            Exercise.countDocuments(),
        ])
            .then(
                ([userNumber, courseNumber, lessionNumber, exerciseNumber]) => {
                    res.render('admin/dashboard/dashboard', {
                        title,
                        layout: 'admin',
                        userNumber,
                        courseNumber,
                        lessionNumber,
                        exerciseNumber,
                    });
                },
            )
            .catch(next);
    }
}

module.exports = new dashboardController();
