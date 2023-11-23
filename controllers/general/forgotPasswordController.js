const controller = {}

controller.show = (req, res) => {
    res.render('general/forgotPassword', {
        layout: 'layout_general',
    });
};
// Corrected controller.otp method
controller.otp = (req, res) => {
    // Get the email from the form
    const email = req.body.Email;
    // Redirect to OTPValidate with the email as a query parameter
    const encodedEmail = encodeURIComponent(email);
    // render to OTPValidate with the email query parameter
    res.redirect(`/OTPValidate?email=${encodedEmail}`);
};
module.exports = controller;