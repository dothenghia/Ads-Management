let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
var keyDirect = urlParams.get("key");
var settingURL;
if (keyDirect == "so") {
    var settingURL = "/screens/canbo/caidat/caidat.html?key=" + "so";
} else if (keyDirect == "quan") {
    var settingURL = "/screens/canbo/caidat/caidat.html?key=" + "quan";
} else {
    var settingURL = "/screens/canbo/caidat/caidat.html?key=" + "phuong";
}

function displayImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
        document.getElementById("genericAvatar").src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}
function backButton() {
    window.location.href = settingURL;
}
