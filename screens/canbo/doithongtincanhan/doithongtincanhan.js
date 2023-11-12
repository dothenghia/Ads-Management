function displayImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('genericAvatar').src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}
function backButton(){
    window.location.href = '/screens/phuong/index.html';
}
