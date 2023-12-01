const controller = {};
const users = [
    { username: 'so@gmail.com', password: '123', accountType: '3' },
    { username: 'quan@gmail.com', password: '123', accountType: '2' },
    { username: 'phuong@gmail.com', password: '123', accountType: '1' },
];
controller.show = (req,res) =>{
    res.render("general/login",{layout: "layout_general"});
}

//! RENDER = Tạo trang # REDIRECT = điều hướng
// Route: Handle login form submission //!POST
controller.submit = (req,res) => {
    const { username, password } = req.body;
  
    // Find the user in the simulated user database
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Set the user's account type in the session
        req.session.accountType = user.accountType;
        // Redirect to the home page after successful login
        res.redirect('/');
    } else {
        // Display an error message for invalid username or password
        res.render('./general/login', { layout: 'layout_general', error: 'Sai tên đăng nhập hoặc mật khẩu.'}); //! t có thể sửa một element trong hbs
        //việc render sẽ thực hiện ở views, do đó đến được general/login
    }
}

module.exports = controller;