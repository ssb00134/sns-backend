const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
  console.log('4000실행');
  res.send({
    title: 'NodeBird',
    twits: [],
    user: null,
    loginError: req.flash('loginError'),
  });
});
module.exports = router;