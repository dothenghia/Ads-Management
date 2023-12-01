const { passport, generateToken } = require('/config/passport');

const controller = {};

controller.show = (req, res) => {
  res.render('general/login', { layout: 'layout_general' });
};

controller.submit = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.render('./general/login', {
        layout: 'layout_general',
        error: 'Sai tên đăng nhập hoặc mật khẩu.',
      });
    }

    const token = generateToken(user);

    return res.json({ token });
  })(req, res);
};

module.exports = controller;
