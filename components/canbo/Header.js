export default function Header(profileInfo) {
    return `
    <header id="top-bar" class="container-fluid px-4">
        <nav class="navbar navbar-expand navbar-light py-0">
            <div class="container-fluid">
                <a class="navbar-brand" href="/screens/phuong/index.html"><img src="/assets/chung/logo_text.svg"></a>
                <button class="d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div id="profile" class="d-none d-sm-none d-md-flex flex-row justify-content-center align-items-center">
                    <div class="col-md-1 mx-3">
                        <img id="notification" src="/assets/chung/icon/thongbao_icon.svg">
                    </div>
                    <div class="col-md-1 mx-2">
                        <img id="avatar" src="/assets/chung/img/generic_avt.svg">
                    </div>
                    <div class="col-md-10 text-center">
                        <div style="font-size: 17px; margin-bottom: 3px">${profileInfo["name"]}</div>
                        <div style="font-size: 10px">Cán bộ ${profileInfo["subsystem"]} ${profileInfo["subsystem_area"]}</div>
                    </div>
                </div>
            </div>
            
        </nav>
        <div class="collapse" id="collapsibleNavId">
            <div id="collapsibleProfile" class="d-flex flex-row justify-content-between align-items-center p-4">
                <div class="col-md-1">
                    <img id="avatar" src="/assets/chung/img/generic_avt.svg">
                </div>
                <div class="col-md-10 text-center">
                    <div style="font-size: 17px; margin-bottom: 3px">${profileInfo["name"]}</div>
                    <div style="font-size: 10px">Cán bộ ${profileInfo["subsystem"]} ${profileInfo["subsystem_area"]}</div>
                </div>
                <div class="col-md-1">
                    <img id="notification" src="/assets/chung/icon/thongbao_icon.svg">
                </div>
            </div>
            <div id="collapsibleSidebar">

            </div>
        </div>
    </header>
    `
}