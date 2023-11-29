const controller = {}


controller.show = (req, res) => {
    emailz = decodeURIComponent(req.query.Email);
    console.log(emailz)
    res.render('general/OTPValidate', {
        layout: 'layout_general',
        email: req.query.Email,
    });
};


// Route: Handle OTP validation form submission
controller.submit = (req, res) => {
    const otp = req.body.OTP; // Retrieve the OTP value from the form body
    const email = req.query.Email; // Retrieve the Email from the query parameters

    // Add your OTP validation logic here

    // Render or redirect based on the validation result
    res.render('general/OTPValidate', {
        layout: 'layout_general',
        email: email, // Pass the Email back to the template
        wrongOTP: 'Invalid OTP', // Example: Set an error message if OTP is invalid
    });
};
module.exports = controller;