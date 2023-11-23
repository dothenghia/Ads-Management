const excludedRoutes = ['/login', '/forgetPassword']; // Add routes that should be excluded from authentication

const authMiddleware = (req, res, next) => {
    // Check if the requested route is in the excludedRoutes array
    if (excludedRoutes.includes(req.path)) {
        // Allow access to excluded routes without authentication
        next();
    } else {
        // Check if the user is authenticated
        if (req.session && req.session.accountType) {
            // User is authenticated, proceed to the next middleware or route handler
            next();
        } else {
            // User is not authenticated, redirect to the login page
            res.redirect('/login');
        }
    }
};

module.exports = authMiddleware;