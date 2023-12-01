const { passport, generateToken } = require('../../config/passportConfig');

const controller = {};

controller.show = (req, res) => {
    res.render('general/login', { layout: 'layout_general' });
};

controller.submit = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            res.render('./general/login', { layout: 'layout_general', error: 'Sai tên đăng nhập hoặc mật khẩu.' });
        }
        const token = generateToken(user);
        return res.json({ token });
    })
    (req, res, next); //  immediately invoked function expression (IIFE) 
};


module.exports = controller;
