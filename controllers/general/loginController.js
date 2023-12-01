const { passport, generateToken } = require('../../config/passportConfig');

const controller = {};

controller.show = (req, res) => {
    res.render('general/login', { layout: 'layout_general' });
};

controller.submit = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.render('./general/login', { layout: 'layout_general', error: 'Sai tên đăng nhập hoặc mật khẩu.' });
        }

        const token = generateToken(user);

        res.cookie('jwtToken', token, { httpOnly: true });

        switch (user.role) {
            case '1':
                res.redirect('/phuong/bando');
                break;
            case '2':
                res.redirect('/quan/bando');
                break;
            case '3':
                res.redirect('/so');
                break;
            default:
                res.redirect('/');
        }
    })(req, res, next); // IIFE Immediately Invoked Function Expression
};



controller.initiateGoogleSignIn = passport.authenticate('google', { scope: ['profile', 'email'] });
controller.googleSignInCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
        if (err || !user) {
            return res.render('./general/login', { layout: 'layout_general', error: 'Đăng nhập bằng Google đã bị lỗi. Vui lòng kiểm tra lại!' });
        }
        const token = generateToken(user);

        res.cookie('jwtToken', token, { httpOnly: true });

        switch (user.role) {
            case '1':
                res.redirect('/phuong/bando');
                break;
            case '2':
                res.redirect('/quan');
                break;
            case '3':
                res.redirect('/so');
                break;
            default:
                res.redirect('/');
        }
    })(req, res, next); // IIFE
};
module.exports = controller;
