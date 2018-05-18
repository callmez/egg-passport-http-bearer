'use strict';

const debug = require('debug')('egg-passport-local');
const HttpBearerStrategy = require('passport-http-bearer').Strategy;

module.exports = app => {
  const config = app.config.passportHttpBearer;
  config.passReqToCallback = true;

  app.passport.use(new HttpBearerStrategy({ passReqToCallback: true }, (req, token, done) => {
    const data = {
      provider: 'bearer',
      token,
    };
    debug('%s %s get user: %j', req.method, req.url, data);

    app.passport.doVerify(req, data, done);
  }));
};
