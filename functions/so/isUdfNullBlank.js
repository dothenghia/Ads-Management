function isUdfNullBlank(value) {
    if (value === "" || value === null || value === undefined) {
        return "Chưa có dữ liệu";
    }
    return value;
}

module.exports.isUdfNullBlank = isUdfNullBlank;