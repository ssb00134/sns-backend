const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const { User, Post } = require('../models');

router.get('/', (req, res, next) => {
  console.log('main page');
  Post.findAll({
    include: {
      model: User,
      atributes: ['id', 'nick'],
      order: [['createAt', 'DESC']],
    },
  }).then((posts) => {
    console.log('posts : ', posts);
    res.send({
      title: 'nordBird',
      twits: posts,
      user: req.user,
      loginError: req.flash('loginError'),
    });
  });
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
  console.log('main page');
  res.send({
    title: '회원가입',
    user: null,
    joinError: req.flash('joinError'),
  });
});
module.exports = router;