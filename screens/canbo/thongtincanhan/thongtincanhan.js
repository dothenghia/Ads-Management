//! Sau này chỉnh để hiển thị avatar theo tài khoản
fetch('/assets/chung/data/taikhoan.json')
.then((response ) => response.json())
.then((data) => {
    const user = Object.values(data).find(user => user.email === "so@gmail.com")
    const avatar = document.getElementById("genericAvatar");
    avatar.src = user.avatar;
    const email = document.getElementById("email");
    email.innerHTML = user.email;
    const name = document.getElementById("name");
    name.innerHTML = user.name;
    const phone = document.getElementById("phone");
    phone.innerHTML = user.phone;
    const date = document.getElementById("date");
    date.innerHTML = user.date;
})  
.catch((error) => {
    console.error('Error fetching JSON:', error);
});


function backButton(){
    window.location.href = '/screens/phuong/index.html';
}
