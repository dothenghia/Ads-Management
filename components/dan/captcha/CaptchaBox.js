
export default function CaptchaBox() {

    return `
    <div class="captcha-box-container">
        <div class="captcha">
            <div class="spinner">
                <label>
                    <input type="checkbox" id="captcha-box-input">
                    <span class="checkmark"><span>&nbsp;</span></span>
                </label>
            </div>
            <div class="text">
                I'm not a robot
            </div>
            <div class="logo">
                <img src="https://forum.nox.tv/core/index.php?media/9-recaptcha-png/"/>
                <p>reCAPTCHA</p>
                <div>
                    <a href="https://policies.google.com/privacy?hl=en"><small>Privacy</small></a>
                    <small style="margin-left: 3px; margin-right: 3px"> - </small>
                    <a href="https://policies.google.com/terms?hl=en"><small>Terms</small></a>
                </div>
            </div>
        </div>
    </div>
    `
}
