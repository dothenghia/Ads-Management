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
        this.sidebarHrefs = ["#", "../quanly/quanly.html", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
    },

    fetchData : async function() {
        
    },

    render : function() {
        const adData = JSON.parse(sessionStorage.getItem("adPageData"));

        const root = $i('root');
        root.innerHTML = `
            ${Header(adData.profileInfo)}
        `

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
                                    <h5 id="name"></h5>
                                    <p id="cnt"></p>
                                    <p id="size"></p>
                                    <p id="purpose"></p>
                                    <p id="co"></p>
                                    <p id="type"></p>
                                    <p id="addr"></p>
                                    <p id="status"></p>
                                    <p id="ad-content"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);
        
        let adAddr = JSON.parse(adData.adAddr);

        let adInfo = JSON.parse(adData.adInfo);
        let contentOverlay = document.getElementById('contentOverlay');
        contentOverlay.querySelector('img').src = '/assets/chung/img/adverts/' + adData.adTypeId + '.jpeg'
        contentOverlay.querySelector('#name').innerHTML = "<span style='color: #2B77D0'>" + adData.adTypeName + "</span>" ;
        contentOverlay.querySelector('#name').style.textAlign = 'center'
        contentOverlay.querySelector('#cnt').innerHTML = '<span style="color: #2B77D0">SL trụ: </span>' + adInfo.cnt;
        contentOverlay.querySelector('#size').innerHTML = '<span style="color: #2B77D0">Kích thước: </span>' + adInfo.size;
        contentOverlay.querySelector('#purpose').innerHTML = '<span style="color: #2B77D0">Hình thức: </span>' + adInfo.purpose;
        contentOverlay.querySelector('#co').innerHTML = '<span style="color: #2B77D0">Công ty: </span>' + adInfo.co;
        contentOverlay.querySelector('#type').innerHTML = '<span style="color: #2B77D0">Phân loại: </span>' + adInfo.type;
        contentOverlay.querySelector('#addr').innerHTML =
            '<span style="color: #2B77D0">Địa chỉ: </span>' + adInfo.sonha + ' ' + adAddr.duong + ', P. ' + adAddr.phuong + ', Quận ' + adAddr.quan;
        
        let status = contentOverlay.querySelector('#status');
        status.innerHTML = '<span style="color: #2B77D0">Tình trạng: </span>';
        if (adInfo.status) {
            status.innerHTML += "<span style='color: green'>Đã xử lý</span>";
        }
        else {
            status.innerHTML += "<span style='color: red'>Chưa xử lý</span>";
        }
        contentOverlay.querySelector('#ad-content').innerHTML = '<span style="color: #2B77D0">Nội dung QC: </span>' + adInfo.content;
        contentOverlay.style.removeProperty('display')
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();