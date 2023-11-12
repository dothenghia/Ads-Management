const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    myForm = document.getElementById("myForm");

    myForm.addEventListener("submit", function (event) {
        event.preventDefault();

        email = document.getElementById("Email").value;

        // Redirect to xacthucOTP.html with email as a query parameter
        window.location.href = "xacthucOTP.html?email=" + encodeURIComponent(email);
    });
});

// datlaimatkhau.js
// !Server side
// document.addEventListener("DOMContentLoaded", function () {
//     var myForm = document.getElementById("myForm");

//     myForm.addEventListener("submit", function (event) {
//         event.preventDefault();

//         var email = document.getElementById("Email").value;

//         // Using the Fetch API for AJAX request
//         fetch("your_server_endpoint_here", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: email,
//             }),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             // Assuming your server responds with a redirect URL
//             return response.json();
//         })
//         .then(data => {
//             // Redirect to xacthucOTP.html
//             window.location.href = "xacthucOTP.html";
//         })
//         .catch(error => {
//             console.error("Error submitting the form:", error);
//         });
//     });
// });

