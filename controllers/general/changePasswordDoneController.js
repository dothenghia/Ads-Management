const controller = {};

controller.show = (req, res) => {
    res.clearCookie('jwtToken');
    res.render('general/changePasswordDone',{layout: 'layout_general'});
};

module.exports = controller;