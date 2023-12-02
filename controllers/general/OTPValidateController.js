const controller = {};

controller.show = (req, res) => {
  res.render("general/OTPValidate", {
    layout: "layout_general",
  });
};

// Route: Handle OTP validation form submission
  controller.submit = (req, res) => {
    const otpValue = req.body.OTP;
    const storedOTP = req.session.otp;
    const storedEmail = req.session.email;
    if (otpValue !== storedOTP){
      console.log(otpValue + "   " + storedOTP)
      res.render("general/OTPValidate", {
        layout: "layout_general",
        wrongOTP: "OTP đã nhập sai, vui lòng thử lại."
      });
    }
    else{
      if (storedEmail)
        res.redirect(`/resetPassword`);
      else
        res.redirect('/forgotPassword');
    }
  };
module.exports = controller;
