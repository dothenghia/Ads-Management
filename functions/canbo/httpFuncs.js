globalVars = {}
function createGlobal(name, value) {
    globalVars[name] = value;
}
function getGlobal(globalName) {
    return globalVars[globalName];
}
function removeGlobal(globalName) {
    if (globalVars.hasOwnProperty(globalName))
        delete globalVars[globalName];
}
function incrementGlobal(globalName) {
    if (globalName in globalVars)
        globalVars[globalName] += 1;
}

function onclickAction(htmlAction) {
    return `onclick="${htmlAction}"`;
}

function onclickRedirect(url) {
    return `onclick="window.location.href='${url}'"`;
}

function toJSON(data) {
    return JSON.stringify(data);
}

function fromJSON(json) {
    return JSON.parse(json);
}

function arrayLength(array) {
    return array.length;
}

function arrayIndex(array, index) {
    return array[index];
}

function mapToArray(map) {
    let result = [];
    for (let key in map) {
        result.push(map[key]);
    }
    return result;
}

function equalString(string1, string2) {
    console.log(string1 == string2);
    return string1 == string2;
}

function mongoDateToLocaleString(date) {
    let dateObject = new Date(date);
    return "Ngày " + dateObject.getDate().toString().padStart(2, 0) + " tháng " + (dateObject.getMonth() + 1).toString().padStart(2, 0) + " năm " + dateObject.getFullYear();
}

module.exports = {
    createGlobal: createGlobal,
    getGlobal: getGlobal,
    incrementGlobal: incrementGlobal,
    removeGlobal: removeGlobal,

    onclickAction: onclickAction,
    onclickRedirect: onclickRedirect,
    toJSON: toJSON,
    fromJSON: fromJSON,
    arrayLength: arrayLength,
    arrayIndex: arrayIndex,
    mapToArray: mapToArray,
    equalString: equalString,

    mongoDateToLocaleString: mongoDateToLocaleString
};