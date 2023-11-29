const controller = {}

controller.show = (req, res) => {

    res.render('general/resetPassword', {
        layout: 'layout_general',
    });
};


//! RENDER = Tạo trang # REDIRECT = điều hướng
// Route: Handle login form submission //!POST
controller.submit = (req,res) => {
    const { password, confirmPassword } = req.body;

    if (password === confirmPassword) {
        // Passwords match, redirect to the login page or handle as needed
        res.render('/login',{layout: 'layout_general'});
    } else {
        // Passwords do not match, handle accordingly (e.g., show an error)
        res.render('general/resetPassword', {
            layout: 'layout_general',
            error: 'Mật khẩu và xác nhận mật khẩu không khớp.',
        });
    }
}
module.exports = controller;