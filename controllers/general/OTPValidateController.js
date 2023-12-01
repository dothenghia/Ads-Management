const controller = {};
const nodemailer = require("nodemailer");
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}
const OTP = generateOTP();
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
  receiverEmail = decodeURIComponent(req.query.Email);
//   console.log(receiverEmail);
  if (receiverEmail) {
    var mailOptions = {
        from: "kiznlh@gmail.com",
        to: receiverEmail,
        subject: "Reset Password OTP - AdsMap",
        html: `
            <p>Hello,</p>
            <p>Your One-Time Password for account verification is: <strong>${OTP}</strong>.</p>
            <p>Enter this code to complete the verification process.</p>
            <p>Thank you.</p>
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  res.render("general/OTPValidate", {
    layout: "layout_general",
    email: req.query.Email,
  });
};

// Route: Handle OTP validation form submission
controller.submit = (req, res) => {
  const email = req.query.Email; // Retrieve the Email from the query parameters

  res.render("general/OTPValidate", {
    layout: "layout_general",
    email: email, // Pass the Email back to the template
    wrongOTP: "Invalid OTP", // Example: Set an error message if OTP is invalid
  });
};
module.exports = controller;
