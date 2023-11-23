document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    confirmPasswordInput.addEventListener('change',function(){
      if (passwordInput.value != confirmPasswordInput.value){
          confirmPasswordInput.setCustomValidity('Mật khẩu phải trùng nhau!');
          confirmPasswordInput.reportValidity();
      }
      else{
          confirmPasswordInput.setCustomValidity('');
      }
    })
    const showPasswordCheckbox = document.getElementById('showPassword');

    showPasswordCheckbox.addEventListener('change', function () {
        const passwordType = showPasswordCheckbox.checked ? 'text' : 'password';
        passwordInput.type = passwordType;
        confirmPasswordInput.type = passwordType;
    });
    
});