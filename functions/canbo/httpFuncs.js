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
    arrayIndex: arrayIndex
};