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
        subject: "Reset Password OTP - AdsMap",
        html: `
            <p>Hello,</p>
            <p>Your One-Time Password for account verification is: <strong>${otp}</strong>.</p>
            <p>This code is valid for 1 hour.</p>
            <p>Enter this code to complete the verification process.</p>
            <p>Thank you.</p>
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
