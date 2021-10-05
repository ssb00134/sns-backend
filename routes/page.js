const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
router.get('/', (req, res, next) => {
  console.log('main page');
  res.send({
    title: 'NodeBird',
    twits: [],
    user: null,
    loginError: req.flash('loginError'),
    post: '123',
  });
});

router.get('/join', (req, res, next) => {
  console.log('main page');
  console.log('req.isAuth', req.isAuthenticated());
  res.send({
    title: '회원가입',
    user: null,
    joinError: req.flash('joinError'),
  });
});
module.exports = router;