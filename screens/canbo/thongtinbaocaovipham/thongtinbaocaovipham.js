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
                                    <h5 id="name" style="text-align: center;"><span style='color: #2B77D0;'>Báo cáo</span></h5>
                                    <p id="senderName"></p>
                                    <p id="senderEmail"></p>
                                    <p id="senderPhone"></p>
                                    <p id="addr"></p>
                                    <p id="type"></p>
                                    <p id="rep-content"></p>
                                    <p id="status"></p>
                                    <div id="solution"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);
        
        const adData = JSON.parse(sessionStorage.getItem("repPageData"));
        let contentOverlay = document.getElementById('contentOverlay');
        contentOverlay.querySelector('img').src = '/assets/chung/img/adverts/' + adData.adTypeId + '.jpeg';
        contentOverlay.querySelector('#senderName').innerHTML = '<span style="color: #2B77D0">Họ tên người gửi: </span>' + adData.repInfo.sender.name;
        contentOverlay.querySelector('#senderEmail').innerHTML = '<span style="color: #2B77D0">Email người gửi: </span>' + adData.repInfo.sender.email;
        contentOverlay.querySelector('#senderPhone').innerHTML = '<span style="color: #2B77D0">Số ĐT người gửi: </span>' + adData.repInfo.sender.phone;
        contentOverlay.querySelector('#addr').innerHTML =
            '<span style="color: #2B77D0">Địa điểm cần báo cáo:</span><br>' + adData.adInfo.sonha + ' ' + adData.adAddr.duong + ', P. ' + adData.adAddr.phuong + ', Quận ' + adData.adAddr.quan;
        
        contentOverlay.querySelector('#type').innerHTML = '<span style="color: #2B77D0">Hình thức báo cáo: </span>' + adData.repInfo.type.name;
        contentOverlay.querySelector('#rep-content').innerHTML = '<span style="color: #2B77D0">Nội dung:</span><br>' + adData.repInfo.content;
        let solution = contentOverlay.querySelector('#solution');
        solution.innerHTML = '<span style="color: #2B77D0">Cách thức xử lý:</span><br>'
        if (adData.repInfo.status) {
            solution.innerHTML += adData.repInfo.solution;
        }
        else {
            solution.innerHTML += '<input type="text" style="width: 100%">';
        }
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();