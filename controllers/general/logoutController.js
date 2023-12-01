const controller = {};

controller.logout = (req, res) => {
    res.clearCookie('jwtToken');
    res.redirect('/login');
};

module.exports = controller;