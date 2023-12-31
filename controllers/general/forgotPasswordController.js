const controller = {};
const nodemailer = require("nodemailer");

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = Date.now(); 
    return { otp, timestamp };
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "kiznlh@gmail.com", // Your email address
        pass: "nqgj rhqz euoa wqyq", // Your email password or app password
    },
});


controller.show = (req, res) => {
    const errorParam = req.query.error;
    errorMessage = null;
    if (errorParam === 'otpInvalid'){
        errorMessage = 'OTP quá hạn, vui lòng thử lại.';
    }
    else if (errorParam != null){
        errorMessage = 'Lỗi email, vui lòng thử lại.'
    }
    res.render("general/forgotPassword", {
        layout: "layout_general",
        error: errorMessage, 
    });
};
controller.otp = (req, res) => {
    const email = req.body.Email;
    const { otp, timestamp } = generateOTP();
    req.session.otp = otp;
    req.session.email = email;
    req.session.otpTimestamp = timestamp;
    var mailOptions = {
        from: "kiznlh@gmail.com",
        to: email,
        subject: "Đổi mật khẩu - AdsMap",
        html: `
            <p>Xin chào,</p>
            <p>Mã OTP của bạn để khôi phục tài khoản là: <strong>${otp}</strong>.</p>
            <p>Mã này có hiệu lực trong vòng 1 giờ.</p>
            <p>Vòng lòng nhập mã này để hoàn tất việc khôi phục tài khoản.</p>
            <p>Cám ơn bạn.</p>
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else {
            console.log("Email sent: " + info.response);
            res.redirect(`/OTPValidate`);
        }
    });
};
module.exports = controller;
