function checkIDValidate(value) {
    // console.log("value: ", value);
    return value;
}

function CheckValidateWithSpecificField(obj, field) {
    Object.keys(obj[0]).forEach(function(key) {
        if (key.toString() == field) {
            return obj[0][key];
        }
    });
}
module.exports = {
    checkIDValidate: checkIDValidate,
    CheckValidateWithSpecificField: CheckValidateWithSpecificField
}