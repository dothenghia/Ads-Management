const controller = {}


let {changeId} = require("../../../html/assets/data");

// console.log(AdLocation);
controller.show = (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    
    changeId('permissionreq', id);
    res.send("Deleted");
    // Trước mắt chưa chỉ delete giả bằng thay đổi reportID, refresh lại sẽ quay lại từ đầu
}

module.exports = controller;