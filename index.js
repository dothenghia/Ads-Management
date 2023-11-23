//! TRƯỚC KHI CHẠY FILE: Vì tao đã git ignore node_module (ĐIỀU GẦN NHƯ PHẢI LÀM) NÓ NẶNG NHƯ 
//! NÊN PHẢI CHẠY: npm ci hoặc npm install (ci = đúng version, install = mới nhất để tải package có trong file package)

//! CÁC TỆP TĨNH (HTML CSS) thì bỏ vào thư mục html, """"NHỚ ĐỔI SRC TRONG HBS (tốt nhất là từ ROOT: / để khỏi bị lỗi)"""
//! CHUYỂN DẦN CÁC FILE QUA MVC (MODELS, VIEWS, CONTROLLERS)
//! MODELS SẼ CHỨA CÁC HÀM GỌI DATABASE,
//! VIEWS SẼ CHỨA CÁC TRANG HBS
//! CONTROLLERS SẼ CHỨA CÁC HÀM XỬ LÍ REQUEST CỦA USER
//! Routes sẽ chứa các request của user sau đó đưa đến controller 

// các thư mục đều đã có file mẫu nên dựa theo đó để làm
const express = require('express'); //Khai báo các thứ cần thiết
const session = require('express-session');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const app = express();
app.use(express.static("./"));
// Use body-parser middleware to parse form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


// Configure Handlebars as the view engine
app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout', //!Layout sẽ là phần header dành cho cán bộ chung, nếu thấy tại sao tao có layout riêng ở bên dưới nữa thì đọc phần bên dưới
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
}));
app.set('view engine', 'hbs');

// Use the express-session middleware for session management
app.use(session({
    secret: 'suffering',
    resave: false,
    saveUninitialized: true,
}));
//Phần bên trên ko nên đụng vào 
// Simulated user database
const users = [
    { username: 'so@gmail.com', password: '123', accountType: '3' },
    { username: 'quan@gmail.com', password: '123', accountType: '2' },
    { username: 'phuong@gmail.com', password: '123', accountType: '1' },
];
//!phần này là của tao ko liên quan
// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
    if (req.session.accountType) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect('/login');
    }
};

// Route: Home Page
app.get('/', checkAuth, (req, res) => {
    // This route is accessible only if the user is authenticated
    res.render('login', { accountType: req.session.accountType });
});
//! get sẽ là method mà bọn mày sử dụng nhiều nhất, chỉ khi submit form như đăng nhập đổi mật khẩu thì thì mới xài post
// Route: Login Page
app.get('/login', (req, res) => {
    res.render('login',{layout: 'layout_general'}); //! nếu muốn sử dụng layout khác với default thì chỉnh layout trong này 
});


// Route: Handle login form submission //!POST
app.post('/login', (req, res) => {
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
        res.render('login', { layout: 'layout_general', error: 'Sai tên đăng nhập hoặc mật khẩu.' }); //! t có thể sửa một element trong hbs, TUY NHIÊN: Nếu nhiều quá thì sãy xài ROUTES và CONTROLLERS
    }
});

//! Viết code bọn bay tiếp theo dưới này
//! Mẫu cho việc sử dụng  ROUTES Vào CONTROLLERS
// app.use("/task1.htm", require("./routes/task1Route"))
// app.use("/task2.htm", require("./routes/task2Route"))
// app.use("/task3.htm", require("./routes/task3Route"))
// app.use("/task4.htm", require("./routes/task4Route"))

//! Sử dụng method get (Bọn bay sẽ làm cái này nhiều nhất)
//! Sử dụng method post thì ở trên đã có (submit form), lúc submit form thì nhớ điền action = chính page đó (EX: "/login"), method ="post", mỗi thành phần INPUT phải có name (EX: username, password)
// app.get("/admin",(req,res) => {
//     res.render("index", {layout: "admin"})
// })



//! PORT 3000, đừng thay PORT KHÁC NẾU NHƯ LÀ 1 THẰNG ĐÀN ÔNG
// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
