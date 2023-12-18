function isUdfNullBlank(value) {
    if (value === "" || value === null || value === undefined) {
        return "Chưa có dữ liệu";
    }
    return value;
}

function isArrayEmpty(arr) {
    // console.log(arr);
    if (arr.length === 0) {
        return true;
    }
    return false;

}

module.exports= {
    isUdfNullBlank: isUdfNullBlank, 
    isArrayEmpty: isArrayEmpty
};