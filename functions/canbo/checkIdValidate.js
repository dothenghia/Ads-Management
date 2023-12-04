function checkIDValidate(id) {
    if (id < 0) {
        return false;
    }
    return true;
}

module.exports = {
    checkIDValidate: checkIDValidate
}