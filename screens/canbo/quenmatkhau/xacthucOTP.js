
document.addEventListener("DOMContentLoaded", function () {
    // Get the email from the URL query parameters
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var email = urlParams.get('email'); 

    // Use the email as needed on this page
    console.log("Email from previous page:", email);
    // Add your logic to handle the email on this page
    
});

//!Client-side for demo
function guiOTP() {
    // Get the OTP value from the input field
    var enteredOTP = document.getElementById("OTP").value;

    // Compare it with the expected value '111111'
    if (enteredOTP === '111111') {
        // Simulate a delay to mimic server response
        setTimeout(function () {
            // Redirect to the desired URL after the delay
            window.location.href = '/screens/canbo/datlaimatkhau/datlaimatkhau.html';
        }, 0); // Adjust the delay time as needed
    } else {
        // OTP is incorrect, handle the error as needed
        console.log("Incorrect OTP. Please try again.");
    }
}

//!Server side when implement server
function guiOTP2() {
    // Get the OTP value from the input field
    var enteredOTP = document.getElementById("OTP").value;
    console.log("OTP entered: ", enteredOTP)
    // Compare it with the expected value '111111'
    if (enteredOTP === '111111') {
        // Simulate server response using jQuery Ajax
        $.ajax({
            type: "POST",
            url: "/your_server_endpoint", // Replace with your actual server endpoint
            data: { otp: enteredOTP },
            success: function (response) {
                // Server responded successfully
                // Redirect to the desired URL
                window.location.href = '/screens/canbo/datlaimatkhau/datlaimatkhau.html';
            },
            error: function (error) {
                // Handle server error
                console.error("Server error:", error);
            }
        });
    } else {
        // OTP is incorrect, handle the error as needed
        console.log("Incorrect OTP. Please try again.");
    }
}
//!Server-side above

