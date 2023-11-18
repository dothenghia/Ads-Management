// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/canbo/Header.js';
import SideBar from '/components/canbo/SideBar.js';

// Import Functions
import getAreaInfo from '/functions/canbo/getAreaInfo.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["#", "../quanly/quanly.html", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
        this.areas = {}
    },

    fetchData : async function() {
        const areas = await getAreaInfo();
        this.areas = areas;

        this.render();
    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `
        
        const areas = this.areas;
        if (areas == undefined) return;

        let main = document.createElement("main");
        main.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <div class="row flex-grow-1">
                    <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                        ${
                            SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 1)
                        }
                    </div>
                    <div id="content" class="col-md-11 col-12">
                        <div id="return">
                            <button onclick="history.back()"><img src="/assets/chung/icon/trove_icon.svg" alt="Return"></button>
                        </div>
                        <div id="contentOverlay" class="container">
                            <div class="row">Địa điểm & Bảng QC</div>
                            <div class="row">
                                <div class="col-4 justify-content-center"><h5> </h5></div>
                                <div class="col-4 justify-content-center"><h5>Thông tin cũ</h5></div>
                                <div class="col-4 justify-content-center"><h5>Thông tin mới</h5></div>
                            </div>
                            <div class="row">
                                <div class="col-4 justify-content-center"><h5>Địa chỉ</h5></div>
                                <div class="col-4 justify-content-center"><p id="addr-old"></p></div>
                                <div class="col-4 justify-content-center"><p id="addr-new"></p></div>
                            </div>
                            <div class="row">
                                <div class="col-4 justify-content-center"><h5>Kích thước</h5></div>
                                <div class="col-4 justify-content-center"><p id="size-old"></p></div>
                                <div class="col-4 justify-content-center"><p id="size-new"></p></div>
                            </div>
                            <div class="row">
                                <div class="col-4 justify-content-center"><h5>SL trụ</h5></div>
                                <div class="col-4 justify-content-center"><p id="cnt-old"></p></div>
                                <div class="col-4 justify-content-center"><p id="cnt-new"></p></div>
                            </div>
                            <div class="row">
                                <div class="col-4 justify-content-center"><h5>Hình thức</h5></div>
                                <div class="col-4 justify-content-center"><p id="purpose-old"></p></div>
                                <div class="col-4 justify-content-center"><p id="purpose-new"></p></div>
                            </div>
                            <div class="row">
                                <div class="col-4 justify-content-center"><h5>Phân loại</h5></div>
                                <div class="col-4 justify-content-center"><p id="type-old"></p></div>
                                <div class="col-4 justify-content-center"><p id="type-new"></p></div>
                            </div>
                            <div class="row justify-content-end">Địa điểm & Bảng QC</div>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);
        
        const adData = JSON.parse(sessionStorage.getItem('reqPageData'));
        const oldAddr = adData.oldAddr;
        const oldInfo = adData.oldInfo;
        const newInfo = adData.newInfo;
        let contentOverlay = document.getElementById('contentOverlay');
        contentOverlay.querySelector('#addr-old').textContent =  oldInfo.sonha + " " + oldAddr.duong + ", P. " + oldAddr.phuong + ", Quận " + oldAddr.quan;
        contentOverlay.querySelector('#size-old').textContent = oldInfo.size;
        contentOverlay.querySelector('#cnt-old').textContent = oldInfo.cnt;
        contentOverlay.querySelector('#purpose-old').textContent = oldInfo.purpose;
        contentOverlay.querySelector('#type-old').textContent = oldInfo.type;
        let newQuan = areas[newInfo.quan].name;
        let newPhuong = areas[newInfo.quan].phuong[newInfo.phuong].name;
        let newDuong = areas[newInfo.quan].phuong[newInfo.phuong].duong[newInfo.duong].name;
        contentOverlay.querySelector('#addr-new').textContent =  newInfo.sonha + " " + newDuong + ", P. " + newPhuong + ", Quận " + newQuan;
        contentOverlay.querySelector('#size-new').textContent = newInfo.size;
        contentOverlay.querySelector('#cnt-new').textContent = newInfo.cnt;
        contentOverlay.querySelector('#purpose-new').textContent = newInfo.purpose;
        contentOverlay.querySelector('#type-new').textContent = newInfo.type;
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();