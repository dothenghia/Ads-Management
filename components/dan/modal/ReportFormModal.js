
import CaptchaBox from "../captcha/CaptchaBox.js";

export default function ReportFormModal() {

    function ShowCaptchaBox(e) {
        e.preventDefault();
        document.querySelector('.captcha-box-root').innerHTML = CaptchaBox();
    }
    window.ShowCaptchaBox = ShowCaptchaBox;


    // Upload file handler
    function InputUploadFile(e) {
        const files = e.target.files;
        console.log(files);

        let list = '';
        for (let i = 0; i < files.length; i++) {
            if (i >= 2) break;
            list += `
                <div class="report-form-modal__file-item item-${i}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    <div>
                        <p>${files[i].name}</p>
                        <span>${files[i].size} B</span>
                    </div>
                </div>
            `
        }
        document.querySelector('.report-form-modal__file-list').innerHTML = list;
        document.querySelector('.report-form-modal__files-area label').style.display = 'none';
        document.querySelector('.report-form-modal__files-area button').style.display = 'block';
    }
    window.InputUploadFile = InputUploadFile;

    function ClearUploadFile() {
        document.querySelector('.report-form-modal__file-list').innerHTML = `
            <label for="report-form-modal__files">
                <img src='/assets/dan/illustration/uploadfile.png' alt='upload file'>
            </label>
        `;
        document.getElementById('report-form-modal__files').value = '';
        document.querySelector('.report-form-modal__files-area label').style.display = 'block';
        document.querySelector('.report-form-modal__files-area button').style.display = 'none';
    }
    window.ClearUploadFile = ClearUploadFile;


    // Close modal handler
    function CloseReportFormModal() {
        document.querySelector('.report-form-modal-root').classList.add('hide');
    }
    window.CloseReportFormModal = CloseReportFormModal;

    function PreventCloseReportFormModal(e) {
        e.stopPropagation();
    }
    window.PreventCloseReportFormModal = PreventCloseReportFormModal;


    return `
        <div class="report-form-modal-container" onclick="CloseReportFormModal()">
            <div class="report-form-modal" onclick="PreventCloseReportFormModal(event)">

                <div class="report-form-modal__title">
                    <h1>Đơn phản hồi thông tin</h1>
                    <button type="button" onclick="CloseReportFormModal()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>


                <form
                    action=""
                    onsubmit="ShowCaptchaBox(event)"
                    novalidate
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
                        <label for="report-form-modal__content">Nội dung báo cáo <span class="text-danger">*</span></label>
                        <textarea
                            id="report-form-modal__content"
                            class="report-form-modal__content"
                            name="report-form-modal__content"
                            placeholder="Nhập nội dung báo cáo"
                            required
                        ></textarea>
                    </div>


                    <div class="report-form-modal__fluid">
                        <label for="report-form-modal__files">Hình ảnh đính kèm (Tối đa 2 hình)</label>
                        
                        <div class="report-form-modal__file-list">
                            <label for="report-form-modal__files">
                                <img src='/assets/dan/illustration/uploadfile.png' alt='upload file'>
                            </label>
                        </div>
                    
                        <div class="report-form-modal__files-area">
                            <label for="report-form-modal__files">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                Tải ảnh lên
                            </label>

                            <button type="button" onclick="ClearUploadFile()" class="btn btn-outline-danger custom-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                Gỡ tất cả file
                            </button>

                            <input
                                type="file"
                                id="report-form-modal__files"
                                name="FileInput"
                                multiple
                                onchange="InputUploadFile(event)"
                            >
                        </div>
                    </div>

                    <div class="report-form-modal__submit">
                        <button type="submit" class="btn btn-outline-primary custom-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            Phản hồi
                        </button>
                    </div>

                </form>

            </div>


        </div>
    
    `
}