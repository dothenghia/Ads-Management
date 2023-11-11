const iconDir = "/assets/chung/icon/"

export default function SideBar(...items) {
    return `
    <div id="side-bar" class="d-flex flex-column justify-content-between">
        <ul>
            <li class="active"><button href="#home"><img src="${iconDir}bando_icon.png"><br>Bản đồ</button></li>
            <li><button href="#news"><img src="${iconDir}quanly_icon.svg"><br>Quản lý</button></li>
            <li><button href="#contact"><img src="${iconDir}kiemduyet_icon.svg"><br>Kiểm duyệt</button></li>
            <li><button href="#about"><img src="${iconDir}caidat_icon.svg"><br>Cài đặt</button></li>
        </ul>
        <ul>
            <li><button href="#home"><img src="${iconDir}dangxuat_icon.svg"><br>Bản đồ</button></li>
        </ul>
    </div>
    `
}

