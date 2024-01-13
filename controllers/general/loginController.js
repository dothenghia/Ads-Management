const { passport, generateToken } = require('../../config/passportConfig');
// require('dotenv').config();
// database_url = process.env.DATABASE_URL;
// database_name = process.env.DATABASE_NAME;
// indexing = database_url.indexOf('?');
// full_url = database_url.slice(0,indexing) + database_name +  database_url.slice(indexing)
// console.log(full_url)

const controller = {}
originalUrl = null;
controller.show = (req, res) => {
    // console.log(database_url);
    // console.log(full_url);
    const statusCode = req.query.status || 200;
    originalUrl = req.query.returnTo;
    if (statusCode == '500'){
        res.render('general/login', { layout: 'layout_general',error: 'Lỗi hệ thống, vui lòng thử lại.' });
    }
    else if (statusCode == '401'){
        res.render('general/login', { layout: 'layout_general',error: 'Vui lòng đăng nhập vào đúng tài khoản.' });
    }
    else res.render('general/login', { layout: 'layout_general' });
};

controller.submit = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.render('./general/login', { layout: 'layout_general', error: 'Sai tên đăng nhập hoặc mật khẩu.' });
        }
        const token = generateToken(user);
    
        res.cookie('jwtToken', token, { httpOnly: true });
        console.log(originalUrl);
        switch (user.role) {
            case '1':
                if (originalUrl && originalUrl.includes('phuong')){
                    res.redirect(originalUrl);
                    originalUrl = null;
                    break;
                }
                res.redirect('/phuong/bando');
                break;
            case '2':
                if (originalUrl && originalUrl.includes('quan')){
                    res.redirect(originalUrl);
                    originalUrl = null;
                    break;
                }
                res.redirect('/quan/bando');
                break;
            case '3':
                if (originalUrl && originalUrl.includes('so')){
                    res.redirect(originalUrl);
                    originalUrl = null;
                    break;
                }
                res.redirect('/so/thongtinquangcao');
                break;
            default:
                res.redirect('/');
                break;
        }
    })(req, res, next); // IIFE Immediately Invoked Function Expression
};



controller.initiateGoogleSignIn = passport.authenticate('google', { scope: ['email'] });
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
                res.redirect('/quan/bando'); 
                break;
            case '3':
                res.redirect('/so/thongtinquangcao');
                break;
            default:
                res.redirect('/');
        }
    })(req, res, next); // IIFE
};
controller.initiateFacebookSignIn = passport.authenticate('facebook');

controller.facebookSignInCallback = (req, res, next) => {
    passport.authenticate('facebook', { failureRedirect: '/login' }, (err, user) => {
        if (err || !user) {
            return res.render('./general/login', { layout: 'layout_general', error: 'Đăng nhập bằng Facebook đã bị lỗi. Vui lòng kiểm tra lại!' });
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
                res.redirect('/so/thongtinquangcao');
                break;
            default:
                res.redirect('/');
        }
    })(req, res, next); // IIFE
};


module.exports = controller;
