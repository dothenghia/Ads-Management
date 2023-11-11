export default function Header() {
    return `
    <header id="top-bar" class="container-fluid px-4">
        <nav class="navbar navbar-expand navbar-light py-0">
            <div class="container-fluid">
                <a class="navbar-brand" href="/screens/phuong/index.html"><img src="/assets/chung/logo_text.svg"></a>
                <button class="d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div id="profile">
                    <div class="col-md-3">
                        <img src="/assets/chung/img/generic_avt.svg">
                    </div>
                    <div class="col-md-9 text-center">
                        <div>Nguyễn Văn A</div>
                        <div>Cán bộ Quận Bình Thạnh</div>
                    </div>
                </div>
            </div>
            
        </nav>
        <div class="collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-none">
                <li><button class="active" href="#home">Bản đồ</button></li>
                <li><button href="#news">Quản lý</button></li>
                <li><button href="#contact">Kiểm duyệt</button></li>
                <li><button href="#about">Cài đặt</button></li>
            </ul>
        </div>
    </header>
    `
}