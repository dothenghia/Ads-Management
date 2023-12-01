const express = require('express'); //Khai báo các thứ cần thiết
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const passport = require('./config/passportConfig').passport;
const helpers = {
    // Chung
    "mathOps": require("./functions/canbo/mathOps"),
    "httpFuncs": require("./functions/canbo/httpFuncs"),

    // Sở
    "reportTrans": require("./functions/so/translateReportType"),
    "reportLocation": require("./functions/so/getReportLocation"),
    "reportStatus": require("./functions/so/getReportStatus"),

    // Phường
    "getAd": require("./functions/phuong/getAd"),
}
const app = express();
app.use(express.static(__dirname + "/html"));
// Use body-parser middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

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
        // Chung
        equalNumber: helpers.mathOps.equalNumber,
        addNumber: helpers.mathOps.addNumber,
        onclickAction: helpers.httpFuncs.onclickAction,
        onclickRedirect: helpers.httpFuncs.onclickRedirect,
        createGlobal: helpers.httpFuncs.createGlobal,
        getGlobal: helpers.httpFuncs.getGlobal,
        removeGlobal: helpers.httpFuncs.removeGlobal,
        incrementGlobal: helpers.httpFuncs.incrementGlobal,
        fromJSON: helpers.httpFuncs.fromJSON,
        toJSON: helpers.httpFuncs.toJSON,
        arrayLength: helpers.httpFuncs.arrayLength,

        // Sở
        translateReportType: helpers.reportTrans.translateReportType,
        getReportLocation: helpers.reportLocation.getReportLocation,
        getReportStatus: helpers.reportStatus.getReportStatus,

        // Phường
        getLocation: helpers.getAd.getLocation,
        getAdInfo: helpers.getAd.getAdInfo
    }
}));
app.set('view engine', 'hbs');

//! get sẽ là method mà bọn mày sử dụng nhiều nhất, chỉ khi submit form như đăng nhập đổi mật khẩu thì thì mới xài post
// Route: Login Page
app.use('/',require("./routes/general/loginRoute"));
app.use('/login', require("./routes/general/loginRoute")); //! nếu muốn sử dụng layout khác với default thì chỉnh layout trong này 
app.use('/resetPassword', require("./routes/general/resetPasswordRoute"))
app.use('/forgotPassword', require("./routes/general/forgotPasswordRoute"))
app.use('/OTPValidate',require("./routes/general/OTPValidateRoute"))
//! Viết code bọn bay tiếp theo dưới này
app.use('/phuong', require("./routes/user/phuongRoute"));
app.use('/so', require("./routes/user/soRoute"));



//! PORT 3000, đừng thay PORT KHÁC NẾU NHƯ LÀ 1 THẰNG ĐÀN ÔNG
// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
