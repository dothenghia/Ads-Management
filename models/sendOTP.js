const generateRandomOTP = () => {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000);
};

const sendEmail = async (toEmail, otp) => {
    const transporter = nodemailer.createTransport({
        // Configure your email service provider here
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: toEmail,
        subject: 'Reset Password OTP',
        text: `Your OTP for resetting the password is: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};