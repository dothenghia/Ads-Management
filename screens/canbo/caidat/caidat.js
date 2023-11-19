// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/canbo/Header.js';
import SideBar from '/components/canbo/SideBar.js';

// Import Functions
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
var keyDirect = urlParams.get('key'); 
const trangchu = {
    init : function() {
        //!change this when import backend
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        if (keyDirect == "phuong"){
            this.sidebarHrefs = ["/screens/phuong/bando/bando.html", "/screens/phuong/quanly/quanly.html", "/screens/phuong/kiemduyet/kiemduyet.html"];
            this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
            this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
        }
            
        else if (keyDirect == "quan"){
            this.sidebarHrefs = ["/screens/quan/bando/bando.html", "/screens/quan/quanly/quanly.html", "/screens/quan/kiemduyet/kiemduyet.html"];
            this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
            this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
        }
        else{
            this.sidebarHrefs = [
                "/screens/so/quanly/quanly.html",
                "/screens/so/nhansu/nhansu.html",
                "/screens/so/thongke/thongke.html",
                "../kiemduyet/kiemduyet.html",
            ];
            this.sidebarIcons = [
                "quanly_icon.svg",
                "nhansu_icon.svg",
                "thongke_icon.svg",
                "kiemduyet_icon.svg",
              ];
            this.sidebarLabels = ["Quản lý", "Nhân Sự", "Thống Kê", "Kiểm duyệt"];
        }
            
    },


    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `
        let main = document.createElement("main");

        main.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <div class="row flex-grow-1">
                    <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                        ${
                            SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, -1)
                        
                        }
                    </div>
                    <div id="content" class="col-md-11 col-12 text-center d-flex justify-content-center align-items-center">
                        <div class="container-fluid justify-content-center d-flex align-items-center flex-column gap-5">
                            <button class="btn btn-primary" onclick="window.location.href ='/screens/canbo/doimatkhau/doimatkhau.html'">Đổi mật khẩu</button>
                            <button class="btn btn-primary" onclick="window.location.href ='/screens/canbo/doithongtincanhan/doithongtincanhan.html'">Đổi thông tin cá nhân</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);
        
    },
    highlight: function(){
        const setting = $i('setting').classList;
        setting.add('sidebar-active')
    },
    start : async function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        await this.render(); // Xong sẽ render ra màn hình
        await this.highlight();
    }
}

trangchu.start();