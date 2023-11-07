
export default function Header() {
    return `
    <header class="container-fluid bg-dark z-2 position-absolute">
        <nav class="navbar navbar-expand-sm navbar-dark container">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center " href="#">
                    AdsMap
                </a>
                
                <div>
                    <button class='btn btn-primary btn-modal-detail-ad'>Modal Chi tiết QC</button>
                    <button class='btn btn-success btn-modal-send-rp'>Modal Phản hồi Báo cáo</button>
                    <button class='btn btn-danger btn-modal-detail-rp'>Modal Chi tiết Báo cáo</button>
                </div>
            </div>
        </nav>

    </header>
    `
}
