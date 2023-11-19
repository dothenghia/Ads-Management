// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/canbo/Header.js';
import SideBar from '/components/canbo/SideBar.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["#", "../quanly/quanly.html", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
    },

    fetchData : async function() {
        
    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `
        
        const adData = JSON.parse(sessionStorage.getItem("permissionReqPageData"));
        const id = adData.id;

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
                            <div class="row align-items-center">
                                <div class="col-5">
                                    <img src="" alt="Ad">
                                </div>
                                <div class="col-7">
                                    <h5 id="name" style="text-align: center;"></h5>
                                    <p id="addr"></p>
                                    <p id="coName"></p>
                                    <p id="coEmail"></p>
                                    <p id="coPhone"></p>
                                    <p id="time"></p>
                                    <p id="req-content"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);

        let contentOverlay = document.getElementById('contentOverlay');
        contentOverlay.querySelector('img').src = '/assets/chung/img/adverts/pending/' + adData.reqInfo.id + '.jpeg';
        contentOverlay.querySelector('#name').innerHTML = '<span style="color: #2B77D0">' + adData.reqInfo.name + '</span>';
        contentOverlay.querySelector('#addr').innerHTML =
            '<span style="color: #2B77D0">Địa điểm:</span><br>' + adData.reqInfo.loc.sonha + ' ' 
            + adData.adArea.dsDuong[adData.reqInfo.loc.duong].name + ', P. ' + adData.adArea.phuong + ', Quận ' + adData.adArea.quan;
        contentOverlay.querySelector('#coName').innerHTML = '<span style="color: #2B77D0">Công ty: </span>' + adData.reqInfo.co.name;
        contentOverlay.querySelector('#coEmail').innerHTML = '<span style="color: #2B77D0">Email: </span>' + adData.reqInfo.co.email;
        contentOverlay.querySelector('#coPhone').innerHTML = '<span style="color: #2B77D0">Số ĐT: </span>' + adData.reqInfo.co.phone;
        contentOverlay.querySelector('#time').innerHTML =
            '<span style="color: #2B77D0">Thời hạn hợp đồng: </span><br>' + adData.reqInfo.startdate + " - " + adData.reqInfo.enddate;
        contentOverlay.querySelector('#req-content').innerHTML = '<span style="color: #2B77D0">Nội dung:</span><br>' + adData.reqInfo.content;
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();