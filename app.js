const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const cors = require('cors');
const { sequelize } = require('./models');

dotenv.config();
const pageRouter = require('./routes/page');
//passport설정
const passport = require('passport');
const passportConfig = require('./passport');

const app = express();
app.set('port', process.env.PORT || 4000);

//db설정
sequelize.sync();
passportConfig();

nunjucks.configure('views', {
  express: app,
  watch: true,
});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(flash());

//뷰설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(cors());

//passport설정
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});