const jwt = require('jsonwebtoken');
const jwtSecret = 'suffering';

function checkAuthenticated(req, res, next) {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        const { accountType } = decoded;

        if (!accountType) {
            return res.redirect('/login');
        }

        // Ensure case sensitivity based on your requirements
        const path = req.path.toLowerCase();

        switch (accountType) {
            case '1':
                if (path.startsWith('/phuong')) {
                    return next();
                }
                break;
            case '2':
                if (path.startsWith('/quan')) {
                    return next();
                }
                break;
            case '3':
                if (path.startsWith('/so')) {
                    return next();
                }
                break;
            default:
                break;
        }

        return res.redirect('/login');
    } catch (err) {
        return res.redirect('/login');
    }
}

module.exports = checkAuthenticated;
