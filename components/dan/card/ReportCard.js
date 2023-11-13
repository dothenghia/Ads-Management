

export default function ReportCard() {
    return `
    <div class='report-card'>
        <div class='report-card__title'>
            <h1>Bảng quảng cáo 1</h1>
        </div>

        <div class="report-card__info">
            <h1>Nguyễn Văn Cừ - An Dương Vương</h1>
            <h3>Phường 4, Quận 5</h3>

            <h2>Hình thức báo cáo</h2>
            <p>Tố giác sai phạm</p>

            <h2>Tình trạng xử lý</h2>
            <p>Đang xử lý</p>

            <h2>Thời gian gửi</h2>
            <p>18/10/2023 - 9:49:25</p>

        </div>



        <div class="report-card__button">
            <button class="btn btn-outline-primary custom-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Chi tiết QC
            </button>

            <button class="custom-btn custom-btn-fade">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Chi tiết phản hồi
            </button>
        </div>

    </div>
    `
}
