class CoursesController {
    // [GET] /courses
    index(req, res) {
        res.render('courses');
    }

    // [GET] /courses/:slug
    show(req, res) {
        res.render('lessions');
    }
}

module.exports = new CoursesController();
