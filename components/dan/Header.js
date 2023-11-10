
export default function Header() {
    return `
    <header class="container-fluid bg-light z-2 position-absolute header">
        <nav class="navbar navbar-expand-sm navbar-dark container">
            <div class="container">
                <h1 class="header-name">
                    AdsMap
                </h1>
                
                <div>
                <button type="button" class="btn btn-primary btn-modal-detail-ad" data-bs-toggle="modal" data-bs-target="#modalId" style="margin: 10px;">
                    Modal Chi tiết QC
                </button>
                    
                    <button class='btn btn-success btn-modal-send-rp'>Modal Phản hồi Báo cáo</button>
                    <button class='btn btn-danger btn-modal-detail-rp'>Modal Chi tiết Báo cáo</button>
                </div>
            </div>
        </nav>

    </header>
    `
}
