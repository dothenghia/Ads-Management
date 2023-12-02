const controller = {};

controller.logout = (req, res) => {
    res.clearCookie('jwtToken');
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/login');
        }
    });
};

module.exports = controller;