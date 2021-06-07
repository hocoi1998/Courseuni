const User = require('../../models/User');
const Course = require('../../models/Course');
const Lesson = require('../../models/Lesson');
const Exercise = require('../../models/Exercise');

class dashboardController {
    // DASHBOARD
    // [GET] /admin
    dashboard(req, res, next) {
        const title = 'Dashboard';
        Promise.all([
            User.countDocuments(),
            Course.countDocuments(),
            Lesson.countDocuments(),
            Exercise.countDocuments(),
        ])
            .then(
                ([userNumber, courseNumber, lessonNumber, exerciseNumber]) => {
                    res.render('admin/dashboard/dashboard', {
                        title,
                        layout: 'admin',
                        userNumber,
                        courseNumber,
                        lessonNumber,
                        exerciseNumber,
                    });
                },
            )
            .catch(next);
    }
}

module.exports = new dashboardController();
