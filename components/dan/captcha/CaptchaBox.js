
export default function CaptchaBox() {

    function submitCaptchaBox() {
        console.log('submitCaptchaBox');

        setTimeout(() => {
            document.querySelector('.captcha-box-root').innerHTML = '';
            document.querySelector('.report-form-modal-root').classList.add('hide');
        }, 3500);
    }

    window.submitCaptchaBox = submitCaptchaBox;

    return `
    <div class="captcha-box-container">
        <div class="captcha">
            <div class="spinner">
                <label>
                    <input type="checkbox" onchange="submitCaptchaBox()">
                    <span class="checkmark"><span>&nbsp;</span></span>
                </label>
            </div>
            <div class="text">
                I'm not a robot
            </div>
            <div class="logo">
                <img src="https://forum.nox.tv/core/index.php?media/9-recaptcha-png/"/>
                <p>reCAPTCHA</p>
                <small>Privacy - Terms</small>
            </div>
        </div>
    </div>
    `
}
