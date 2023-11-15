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
        this.ads = []
    },

    fetchData : async function() {
        const ads = await getAdsInfo();
        this.ads = ads;

        this.render();
    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `

        const prevPageData = JSON.parse(localStorage.getItem("previousPage"));
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
        
        const adData = JSON.parse(localStorage.getItem("adPageData"));
        let contentOverlay = document.getElementById('contentOverlay');
        contentOverlay.querySelector('img').src = '/assets/chung/img/adverts/' + adData.adTypeId + '.jpeg'
        contentOverlay.querySelector('#name').innerHTML = "<span style='color: #2B77D0'>" + adData.adTypeName + "</span>" ;
        contentOverlay.querySelector('#name').style.textAlign = 'center'
        contentOverlay.querySelector('#cnt').innerHTML = '<span style="color: #2B77D0">SL trụ: </span>' + adData.adInfo.cnt;
        contentOverlay.querySelector('#size').innerHTML = '<span style="color: #2B77D0">Kích thước: </span>' + adData.adInfo.size;
        contentOverlay.querySelector('#purpose').innerHTML = '<span style="color: #2B77D0">Hình thức: </span>' + adData.adInfo.purpose;
        contentOverlay.querySelector('#co').innerHTML = '<span style="color: #2B77D0">Công ty: </span>' + adData.adInfo.co;
        contentOverlay.querySelector('#type').innerHTML = '<span style="color: #2B77D0">Phân loại: </span>' + adData.adInfo.type;
        contentOverlay.querySelector('#addr').innerHTML =
            '<span style="color: #2B77D0">Địa chỉ: </span>' + adData.adInfo.sonha + ',  Đ. ' + adData.adAddr.duong + ', P. ' + adData.adAddr.phuong + ', Quận ' + adData.adAddr.quan;
        
        let status = contentOverlay.querySelector('#status');
        status.innerHTML = '<span style="color: #2B77D0">Tình trạng: </span>';
        if (adData.adInfo.status) {
            status.innerHTML += "<span style='color: green'>Đã xử lý</span>";
        }
        else {
            status.innerHTML += "<span style='color: red'>Đã xử lý</span>";
        }
        contentOverlay.querySelector('#ad-content').innerHTML = '<span style="color: #2B77D0">Nội dung QC: </span>' + adData.adInfo.content;
        contentOverlay.style.removeProperty('display')
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();