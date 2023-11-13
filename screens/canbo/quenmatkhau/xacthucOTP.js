const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get the email from the URL query parameters
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var email = urlParams.get('email'); 

    // Use the email as needed on this page
    console.log("Email from previous page:", email);
    // Add your logic to handle the email on this page
    myForm = $i('myForm');
    myForm.addEventListener("submit", function (event) {
        event.preventDefault();
    
        var enteredOTP = $i("OTP").value;

        //! hiện tại chỉ là demo, sau này sẽ thêm AJAX hoặc fetchAPI
        // Compare it with the expected value '111111'
        if (enteredOTP === '111111') {
            // Simulate a delay to mimic server response
            setTimeout(function () {
                // Redirect to the desired URL after the delay
                window.location.href = '/screens/canbo/datlaimatkhau/datlaimatkhau.html?email=' + encodeURIComponent(email);
            }, 1000); // Adjust the delay time as needed
        } else {
            // OTP is incorrect, handle the error as needed

            $i('wrongOTP').innerHTML = 'OTP đã nhập sai, vui lòng thử lại.'
            //Dòng này cần được sửa theo AJAX hoặc fetchAPI
            window.history.replaceState = ({}, '', '?error=wrong_otp')
        }
    
    
        
    });
});

function guilaiOTP(){
    alert('OTP đã được gửi lại, vui lòng kiểm tra Email.');
}