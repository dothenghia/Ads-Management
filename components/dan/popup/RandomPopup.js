
import ReportFormModal from "../modal/ReportFormModal.js";

export default function RandomPopup() {


    function openReportFormModal_RandomPopup() {
        document.querySelector('.modal-root').innerHTML = ReportFormModal();
    }
    window.openReportFormModal_RandomPopup = openReportFormModal_RandomPopup;


    return `
    <div class="random-popup">
        <div class="random-popup__image">
            <img src="/assets/dan/city.png" alt="city"/>
        </div>

        <div class="random-popup__info">
            <div class="random-popup__header">
                <h1>Hẻm 341 Nguyễn Trãi</h1>
                <button type="button" onclick="document.querySelector('.random-popup-root').innerHTML = ''">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <h2>Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh</h2>
            <div class="random-popup__split">
                <span>106.686030 - 10.761564</span>
                <button class="btn btn-outline-primary custom-btn" onclick="openReportFormModal_RandomPopup()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Phản hồi
                </button>
            </div>
        </div>
    </div>
    `
}