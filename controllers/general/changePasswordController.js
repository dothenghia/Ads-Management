const controller = {}
const jwt = require('jsonwebtoken');
const accountsModel = require('../../models/accountsModel')
const {hashPassword,checkPassword} = require('../../config/bcryptConfig');
jwtSecret = 'suffering';

controller.show = (req, res) => {
    res.render('general/changePassword', {
        layout: 'layout_general',
    });
};

controller.submit = async (req,res) => {
    const token = req.cookies.jwtToken;
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.sub; //user ID
    console.log(req.body);
    const {oldpassword, newpassword, confirmnewpassword } = req.body;
    const user = await accountsModel.findOne({_id: userId});
    console.log(user);
    if (await checkPassword(oldpassword,user.hashedpassword)){
        if (newpassword === confirmnewpassword) {
            try {
                if (!user.empty) {
                    await user.updateOne({ hashedpassword: await hashPassword(newpassword) });
                    res.redirect('/changePasswordDone');
                } else {
                    res.send('Người dùng không tồn tại');
                }
            } catch (error) {
          
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.render('general/changePassword', {
                layout: 'layout_general',
                error: 'Mật khẩu mới không trùng khớp, vui lòng thử lại.',
            });
        }
    }
    else{
        res.render('general/changePassword',{
            layout:'layout_general',
            error: 'Mật khẩu cũ không trùng khớp, vui lòng thử lại.',
        });
    }
}
module.exports = controller;