function onclickAction(htmlAction) {
    return `onclick="${htmlAction}"`;
}

function onclickRedirect(url) {
    return `onclick="window.location.href='${url}'"`;
}

module.exports.onclickRedirect = onclickRedirect;