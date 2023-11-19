function showPasswords(checked){
    if (checked){
        document.querySelector('#password').type = 'text';
        document.querySelector('#confirmPassword').type = 'text';
    }
    else {
        document.querySelector('#password').type = 'password';
        document.querySelector('#confirmPassword').type = 'password';
    }
}
function validatePasswords(){
    let password = document.querySelector('#password');
    let confirm = document.querySelector('#confirmPassword');
    if (password.value != confirm.value){
        confirm.setCustomValidity('Mật khẩu phải trùng nhau!');
        confirm.reportValidity();
    }
    else{
        confirm.setCustomValidity('');
    }
}
document.addEventListener("DOMContentLoaded", function () {

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var email = urlParams.get('email'); 

    changePasswordForm = document.getElementById('changePasswordForm');
    let oldpassword = document.querySelector('#oldpassword');
    let password = document.querySelector('#password');
    let confirm = document.querySelector('#confirmPassword');

    changePasswordForm.addEventListener("submit",function(event){
        
        event.preventDefault();
        //!need server to handle change password
        if (password.value === confirm.value){
            sendPasswordToServer(password.value);

            $('#masterdiv').empty();
            AppName = "<h1 class='bg-transparent text-center fw-bold' id='AppName'>AdsMap</h1>";
            Noti1 = "<h5 class='bg-transparent text-center' id='noti1'>Đặt lại mật khẩu thành công.</h5>"
            Noti2 = "<h5 class='bg-transparent text-center mb-5' id='noti2'>Tự động điều hướng sau 3 giây...</h5>"
            $('#mainBody').append(AppName,Noti1,Noti2);

            updatePassword(email,password.value);
            setTimeout(function(){
                window.location.href = '/screens/canbo/dangnhap/dangnhap.html';
                
            },3000);
            
        }
        
    });
    function sendPasswordToServer(password) {
        // Add your code here to send the password to the server
        console.log("Sending password to the server:", password);
        // You might want to use AJAX, fetch, or another method to send the password to the server.
    }
});

async function updatePassword(userEmail, newPassword) {
    try {
        // Fetch JSON file
        const response = await fetch('/screens/canbo/taikhoan.json');
        const data = await response.json();

        // Find the user by email
        const user = Object.values(data).find(user => user.email === userEmail);
        
        if (user) {
            user.password = newPassword
            console.log('Updated user data in memory:', data);
            //! Need node.js to manipulate json file in real scenerio

        } else {
            console.log(`User with email ${userEmail} not found`);
        }
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
}