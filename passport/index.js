const { User } = require('../models/user');
const local = require('./localStrategy');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne(
      { where: { id } }.then((user) => {
        done(null, user).catch((err) => done(error));
      }),
    );
  });
  local(passport);
};
