# egg-passport-http-bearer

## Install

```bash
$ npm i egg-passport --save
$ npm i egg-passport-http-bearer --save
```

**Note:** also need [egg-passport](https://github.com/eggjs/egg-passport) .

## Usage

```js
// {app_root}/config/plugin.js
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-http-bearer',
};
```

## Example

see [fixture](test/fixture/apps/passport-local-test) for more detail.

```js
// ./controller/home.js
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = `
      <div>
        <h2>${ctx.path}</h2>
        <a href="/admin">admin</a>
      </div>
    `;
  }

  async admin() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      // show user info
    } else {
      // do user login
    }
  }

  async logout() {
    const ctx = this.ctx;

    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }
}
```

```js
// router.js
module.exports = app => {
  app.router.get('/', 'home.render');
  app.router.get('/admin', 'home.admin');

  const localStrategy = app.passport.authenticate('bearer', { session: false}); // without session for restful api
  app.router.post('/passport/token', localStrategy);

  app.router.get('/logout', 'user.logout');
};
```

see [passport example](https://github.com/eggjs/examples/tree/master/passport) for more detail.
