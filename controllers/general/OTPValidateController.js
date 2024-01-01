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
    let mailOptions = {
      from: "kiznlh@gmail.com",
      to: req.session.email,
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
