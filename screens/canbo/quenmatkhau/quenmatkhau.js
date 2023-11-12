

document.addEventListener("DOMContentLoaded", function () {
    myForm = document.getElementById("myForm");

    myForm.addEventListener("submit", function (event) {
        event.preventDefault();

        email = document.getElementById("Email").value;

        // Redirect to xacthucOTP.html with email as a query parameter
        window.location.href = "xacthucOTP.html?email=" + encodeURIComponent(email);
    });
});


