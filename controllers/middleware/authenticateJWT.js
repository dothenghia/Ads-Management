const jwt = require('jsonwebtoken');
const jwtSecret = 'suffering';

async function checkAuthenticated(req, res, next) {
    const token = req.cookies.jwtToken;
    
    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = await jwt.verify(token, jwtSecret);
        req.user = decoded;
        const { accountType } = decoded;

        if (!accountType) {
            return res.redirect('/login');
        }

        // Ensure case sensitivity based on your requirements
        const path = req.originalUrl.toLowerCase();
        console.log("path: " + path);
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

        return res.redirect('/login?status=401');
    } catch (err) {
        return res.redirect('/login?status=500');
    }
}

module.exports = checkAuthenticated;
