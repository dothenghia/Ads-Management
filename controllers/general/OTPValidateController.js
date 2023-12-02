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
  command = req.query.command;
  if (command) {
    const { otp, timestamp } = generateOTP();
    req.session.otp = otp;
    req.session.otpTimestamp = timestamp;
    var mailOptions = {
      from: "kiznlh@gmail.com",
      to: req.session.email,
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
        res.render("general/OTPValidate", {
          layout: "layout_general",
          command: 'OTP đã được gửi lại.'
        });
      }
    });
  
  }
  else{
    res.render("general/OTPValidate", {
      layout: "layout_general",
    });
  }
  
 
};

// Route: Handle OTP validation form submission
controller.submit = (req, res) => {
  const otpValue = req.body.OTP;
  const storedOTP = req.session.otp;
  const storedEmail = req.session.email;
  const storedTimestamp = req.session.otpTimestamp;

  const currentTime = Date.now();
  const timeDifference = currentTime - storedTimestamp;
  const validityPeriod = 60 * 60 * 1000; // 1 hour 
  if (timeDifference > validityPeriod) {
    res.redirect('/forgotPassword?error=otpInvalid');
  }
  else if (otpValue !== storedOTP) {
    res.render("general/OTPValidate", {
      layout: "layout_general",
      wrongOTP: "OTP đã nhập sai, vui lòng thử lại."
    });
  }
  else {
    if (storedEmail)
      res.redirect(`/resetPassword`);
    else
      res.redirect('/forgotPassword?error=emailError');
  }
};
module.exports = controller;
