const controller = {}
const admin = require('../../config/firebaseAdmin');
const jwt = require('jsonwebtoken');
const accountsModel = require('../../models/accountsModel')

jwtSecret = 'suffering';
const decoded = jwt.verify(token, jwtSecret);
const userId = decoded.sub; //user ID
const role = decoded.accountType; // userRole


controller.show = (req, res) => {
    res.render('general/changePassword', {
        layout: 'layout_general',
    });
};

controller.submit = async (req,res) => {
    const {oldPassword, newPassword, newConfirmPassword } = req.body;
    const userSnapshot = await db.collection('accounts').where('id', '==', userId).get();
    const user = userSnapshot.docs[0].data();
    if (oldPassword != user.password){
        // Sai mật khẩu
        // sẽ làm sau khi có quyết định cuối cùng

    }
    if (newPassword === newConfirmPassword) {
        try {
            if (!userSnapshot.empty) {
                const userDocRef = userSnapshot.docs[0].ref;
                await userDocRef.update({ password: newPassword });
                res.redirect('/login');
            } else {
                res.send('Người dùng không tồn tại');
            }
        } catch (error) {
            //console.error('Error updating password:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.render('general/changePassword', {
            layout: 'layout_general',
            error: 'Mật khẩu không trùng khớp, vui lòng thử lại.',
        });
    }
}
module.exports = controller;