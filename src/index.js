const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const paginateHelper = require('express-handlebars-paginate');
const cookieParser = require('cookie-parser');

const SortMiddleware = require('./app/middlewares/SortMiddleware');
const InfoMiddleware = require('./app/middlewares/InfoMiddleware');

const app = express();
const port = 3000;

const route = require('./routes/index.route');
const db = require('./config/db');
const moment = require('moment');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser('ddtoanK61HUMG'));

// Custom middlewares
app.use(SortMiddleware);
app.use(InfoMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            // cat: (a) => (a === 'Frontend' ? 'Backend' : 'Frontend'),
            gender: (a) => (a === 'Nam' ? 'Nữ' : 'Nam'),
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fas fa-sort',
                    asc: 'fas fa-sort-up',
                    desc: 'fas fa-sort-down"',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `
                <a href="?_sort&column=${field}&type=${type}">
                        <i class="${icon}"></i>
                    </a>
                `;
            },
            paginateHelper: paginateHelper.createPagination,
            moment: (a) => moment(a).format('MM/DD/YYYY'),
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Bootstrap & jquery & fontawesome
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
