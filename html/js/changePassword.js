document.addEventListener('DOMContentLoaded', function () {
    const oldPasswordInput = document.getElementById('oldpassword');
    const newPasswordInput = document.getElementById('newpassword');
    const newConfirmPasswordInput = document.getElementById('confirmnewpassword');
    newConfirmPasswordInput.addEventListener('change', function () {
        if (newPasswordInput.value != newConfirmPasswordInput.value) {
            newConfirmPasswordInput.setCustomValidity('Mật khẩu phải trùng nhau!');
            newConfirmPasswordInput.reportValidity();
        }
        else {
            newConfirmPasswordInput.setCustomValidity('');
        }
    })
    const showPasswordCheckbox = document.getElementById('showPassword');

    showPasswordCheckbox.addEventListener('change', function () {
        const passwordType = showPasswordCheckbox.checked ? 'text' : 'password';
        oldPasswordInput.type = passwordType;
        newPasswordInput.type = passwordType;
        newConfirmPasswordInput.type = passwordType;
    });
})