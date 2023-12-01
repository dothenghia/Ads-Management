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
const expressHbs = require('express-handlebars');
const passport = require('passport');

app.use(passport.initialize());
const helpers = {
    "checkRole": require("./functions/canbo/mathOperations")
}
const app = express();

app.use(express.static(__dirname + "/html"));
//! điều này sẽ khiến khi import các CSS ở trong cái hbs Thì chỉ cần ghi css/....
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// Configure Handlebars as the view engine
app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout', //!Layout sẽ là phần header dành cho cán bộ chung, nếu thấy tại sao tao có layout riêng ở bên dưới nữa thì đọc phần bên dưới
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: [
        __dirname + '/views/partials/',
        __dirname + '/views/partials/components',
        __dirname + '/views/partials/screens/'
    ],
    helpers: {
        equalNumber: helpers.checkRole.equalNumber
    }
}));
app.set('view engine', 'hbs');

// Use the express-session middleware for session management
app.use(session({
    secret: 'suffering',
    resave: false,
    saveUninitialized: true,
}));
//! KO BỎ COMMENT DÒNG NÀY 
//app.use(authMiddleware);


//Phần bên trên ko nên đụng vào 
// Simulated user database

//! get sẽ là method mà bọn mày sử dụng nhiều nhất, chỉ khi submit form như đăng nhập đổi mật khẩu thì thì mới xài post
// Route: Login Page
app.use('/',require("./routes/general/loginRoute"));
app.use('/login', require("./routes/general/loginRoute")); //! nếu muốn sử dụng layout khác với default thì chỉnh layout trong này 
app.use('/resetPassword', require("./routes/general/resetPasswordRoute"))
app.use('/forgotPassword', require("./routes/general/forgotPasswordRoute"))
app.use('/OTPValidate',require("./routes/general/OTPValidateRoute"))
app.post("/create", async (req, res) => {
    try {
      const id = req.body.email; // Change res.body to req.body
  
      const userJson = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
  
      // Wait for the Firestore operation to complete
      await db.collection("accounts").doc(id).set(userJson);
  
      res.send("User created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
//!ĐIỀU hướng cái này: index sẽ là ROOT, từ đó đi vào phải có ./, ko có nó bị lỗi ko hiểu tại sao

//! Viết code bọn bay tiếp theo dưới này
app.use('/phuong', require("./routes/user/phuongRoute"));
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
