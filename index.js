const express = require('express'); //Khai báo các thứ cần thiết
const expressHbs = require('express-handlebars');
const passport = require('./config/passportConfig').passport;
const {connectToMongoDB,closeMongoDBConnection} = require('./config/mongodbConfig');
const port = 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const checkAuthenticated =  require("./controllers/middleware/authenticateJWT");
const helpers = {
    // Chung
    "mathOps": require("./functions/canbo/mathOps"),
    "httpFuncs": require("./functions/canbo/httpFuncs"),
    "checkIDValidate": require("./functions/canbo/checkIdValidate"),

    // Sở
    "reportTrans": require("./functions/so/translateReportType"),
    "reportLocation": require("./functions/so/getReportLocation"),
    "reportStatus": require("./functions/so/getReportStatus"),
    "translateAgentArea": require("./functions/so/translateAgentArea"),
    "getAgentRole": require("./functions/so/getAgentRole"),
    "isUdfNullBlank": require("./functions/so/isUdfNullBlank"), //? Đây là hàm để check null
    "wrapInObject": require("./functions/so/wrapInObject"), //? Đây là hàm để wrap nhiều tham số thành 1 object

    // Phường
    "getAd": require("./functions/phuong/getAd"),
}

const app = express();
app.use(express.static(__dirname + "/html"));
// Use body-parser middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'suffering',
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieParser());
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
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
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
        arrayIndex: helpers.httpFuncs.arrayIndex,
        mongoDateToLocaleString: helpers.httpFuncs.mongoDateToLocaleString,
        checkIDValidate: helpers.checkIDValidate.checkIDValidate,

        // Sở
        translateReportType: helpers.reportTrans.translateReportType,
        getReportLocation: helpers.reportLocation.getReportLocation,
        getReportStatus: helpers.reportStatus.getReportStatus,
        translateAgentArea: helpers.translateAgentArea.translateAgentArea,
        getAgentRole: helpers.getAgentRole.getAgentRole,
        isUdfNullBlank: helpers.isUdfNullBlank.isUdfNullBlank,
        wrapInObject: helpers.wrapInObject.wrapInObject,

        // Phường
        getLocation: helpers.getAd.getLocation,
        getAdInfo: helpers.getAd.getAdInfo,
        getAdLocationInfo: helpers.getAd.getAdLocationInfo,
        getReportInfo: helpers.getAd.getReportInfo,
    }
}));
app.set('view engine', 'hbs');


// Route: Login Page
app.use('/', require("./routes/general/loginRoute"));
app.use('/login', require("./routes/general/loginRoute"));
app.use('/resetPassword', require("./routes/general/resetPasswordRoute"))
app.use('/forgotPassword', require("./routes/general/forgotPasswordRoute"))
app.use('/OTPValidate', require("./routes/general/OTPValidateRoute"));
app.use('/phuong', checkAuthenticated, require("./routes/user/phuongRoute"));
app.use('/quan', checkAuthenticated,require("./routes/user/quanRoute"));
app.use('/so', checkAuthenticated, require("./routes/user/soRoute"));
app.use('/logout', require("./routes/general/logoutRoute"));


// Start the server on port 3000
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToMongoDB();
  });
// Handle graceful shutdown (computer turned off by software function,)
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully');
    await closeMongoDBConnection();
    process.exit(0);
});
  