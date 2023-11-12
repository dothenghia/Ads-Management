const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);


async function validateLogin(e){
    e.preventDefault();
    try {
        // Fetch JSON file
        const response = await fetch('/screens/canbo/taikhoan.json');
        const data = await response.json();

        // Get user input
        const emailInput = document.getElementById('Email').value;
        const passwordInput = document.getElementById('Password').value;

        // Check if user input matches any user in the JSON data
        const user = Object.values(data).find(user => user.email === emailInput && user.password === passwordInput);

        if (user) {
            //!change this after import backend, (WORK ON CLIENT SIDE ONLY)
            if (emailInput == 'phuong@gmail.com'){
                window.location.href = '/screens/phuong/index.html'
            }
            else if (emailInput == 'quan@gmail.com'){
                window.location.href = '/screens/quan/index.html'
            }
            else if (emailInput == 'so@gmail.com'){
                window.location.href = '/screens/so/index.html'
            }
            
        } else {
            document.getElementById('LoiDangNhap').innerHTML = '• Sai email hoặc mật khẩu';
        }
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
}