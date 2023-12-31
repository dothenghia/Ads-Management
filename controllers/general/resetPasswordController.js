const controller = {}
const bcryptConfig = require('../../config/bcryptConfig');
const accountsModel = require('../../models/accountsModel');
controller.show = (req, res) => {
    res.render('general/resetPassword', {
        layout: 'layout_general',
    });
};

controller.submit = async (req,res) => {
    const { password, confirmPassword } = req.body;
    const storedEmail = req.session.email;
    if (password === confirmPassword) {
        try {
            const user = await accountsModel.findOne({email: storedEmail});
            if (user) {
                await user.updateOne({ hashedpassword: await bcryptConfig.hashPassword(password) });
                res.redirect('/changePasswordDone');
            } else {
                res.render('general/resetPassword', {
                    layout: 'layout_general',
                    error: 'Người dùng không tồn tại.',
                });
            }
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.render('general/resetPassword', {
            layout: 'layout_general',
            error: 'Mật khẩu không trùng khớp, vui lòng thử lại.',
        });
    }
}
module.exports = controller;