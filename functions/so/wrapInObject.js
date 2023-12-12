
// wrap n parameter in 1 object using rest
function wrapInObject(...params) {
    const obj = {};

    for (let i = 0; i < params.length - 1; i++) {
        obj[`param_${i + 1}`] = params[i];
    }
    
    return obj;
}

module.exports.wrapInObject = wrapInObject;