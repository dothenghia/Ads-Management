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

module.exports = {
    onclickAction: onclickAction,
    onclickRedirect: onclickRedirect,
    toJSON: toJSON,
    fromJSON: fromJSON,
    arrayLength: arrayLength
};