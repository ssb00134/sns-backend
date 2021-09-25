const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');

const app = express();
app.set('port',process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
}));

//뷰설정
app.set('views', path.join(__dirname,'views'));
app.set('view engine','jsx');


express.Router().get('/',(req,res,next)=>{
    console.log('/req',req);
    res.render('main',{
    title: 'nodebird'
    }
    )
})


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});