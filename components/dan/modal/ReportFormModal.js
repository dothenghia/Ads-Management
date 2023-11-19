
import CaptchaBox from "../captcha/CaptchaBox.js";

export default function ReportFormModal() {


    function submitReportForm() {

    }

    window.submitReportForm = submitReportForm;

    function ShowCaptchaBox() {
        document.querySelector('.captcha-box-root').innerHTML = CaptchaBox();
    }

    window.ShowCaptchaBox = ShowCaptchaBox;

    return `
        <div class="report-form-modal-container">
            <div class="report-form-modal">

                <div class="report-form-modal__title">
                    <h1>Đơn phản hồi thông tin</h1>
                    <button type="button" onclick="document.querySelector('.modal-root').innerHTML = ''">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>


                <div

                    class="report-form-modal__form"
                >
                    <div class="report-form-modal__row">
                        <div class="report-form-modal__col">
                            <label for="form">Hình thức báo cáo <span class="text-danger">*</span></label>
                            <select
                                id="form"
                                name="form"
                                aria-label="form"
                            >
                                <option value="Tố giác sai phạm">Tố giác sai phạm</option>
                                <option value="Đăng ký nội dung">Đăng ký nội dung</option>
                                <option value="Đóng góp ý kiến">Đóng góp ý kiến</option>
                                <option value="Giải đáp thắc mắc">Giải đáp thắc mắc</option>
                            </select>
                        </div>
                        <div class="report-form-modal__col">
                            <label for="fullname">Họ và tên <span class="text-danger">*</span></label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                aria-label="fullname"
                                placeholder="Nhập họ và tên"
                                required
                            >
                        </div>
                    </div>


                    <div class="report-form-modal__row">
                        <div class="report-form-modal__col">
                            <label for="email">Email <span class="text-danger">*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                aria-label="email"
                                placeholder="Nhập địa chỉ email"
                                required
                            >
                        </div>
                        <div class="report-form-modal__col">
                            <label for="phone">Số điện thoại <span class="text-danger">*</span></label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                aria-label="phone"
                                placeholder="Nhập số điện thoại"
                                required
                            >
                        </div>
                    </div>


                    <div class="report-form-modal__fluid">
                        <label for="content">Nội dung báo cáo <span class="text-danger">*</span></label>
                        <textarea
                            id="content"
                            name="content"
                            aria-label="content"
                            placeholder="Nhập nội dung báo cáo"
                            row="3"
                            cols="50"
                            required
                        ></textarea>
                    </div>


                    <div class="report-form-modal__fluid">
                        <label for="files">Hình ảnh đính kèm (Tối đa 2 hình)</label>
                        
                        <div class="report-form-modal__drop-area">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <p>Kéo thả file vào đây hoặc</p>
                            <span>Chọn ảnh</span> 
                            <input
                                type="file"
                                id="files"
                                name="FileInput"
                                multiple
                            >
                            
                        </div>
                    </div>

                    <div class="report-form-modal__submit">
                        <button type="submit" class="btn btn-outline-primary custom-btn" onclick="ShowCaptchaBox()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            Phản hồi
                        </button>
                    </div>

                </div>

            </div>


        </div>
    
    `
}