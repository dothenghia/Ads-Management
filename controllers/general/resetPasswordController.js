const controller = {}
const admin = require('../../config/firebaseAdmin');
const db = admin.firestore();
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
            const userSnapshot = await db.collection('accounts').where('email', '==', storedEmail).get();
            if (!userSnapshot.empty) {
                const userDocRef = userSnapshot.docs[0].ref;
                await userDocRef.update({ password: password });
                res.redirect('/login');
            } else {
                res.render('general/resetPassword', {
                    layout: 'layout_general',
                    error: 'Người dùng không tồn tại.',
                });
            }
        } catch (error) {
            //console.error('Error updating password:', error);
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