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
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "", "role": "quan", "role_area": "Bình Thạnh"}
        this.sidebarHrefs = ["#", "../quanly/quanly.html", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
    },

    fetchData : async function() {
        
    },

    render : function() {
        const data = JSON.parse(sessionStorage.getItem("createPermissionReqPageData"));

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
                                    <img src="/assets/chung/img/adverts/pending/YCCP00001.jpeg" alt="Ad">
                                </div>
                                <div class="col-7">
                                    <h5 style="text-align: center;">
                                        <span style="color: #2B77D0">Tên:</span>
                                        <input id="name" type="text">
                                    </h5>
                                    <p>
                                        <span style="color: #2B77D0">Địa điểm:</span>
                                        <input id="sonha" type="text">
                                        <select id="duong" name="duong">
                                            <option value="vht">Vũ Huy Tấn</option>
                                            <option value="vk">Vạn Kiếp</option>
                                        </select>
                                        <select id="phuong" name="phuong" value="3">
                                            <option value="3">3</option>
                                        </select>
                                    </p>
                                    <p>
                                        <span style="color: #2B77D0">Công ty:</span>
                                        <input id="coName" type="text">
                                    </p>
                                    <p>
                                        <span style="color: #2B77D0">Email: </span>
                                        <input id="coEmail" type="email">
                                    </p>
                                    <p>
                                        <span style="color: #2B77D0">Số ĐT: </span>
                                        <input id="coPhone" type="text">
                                    </p>
                                    <p>
                                        <span style="color: #2B77D0">Thời hạn hợp đồng:</span><br>
                                        <input id="startDate" type="date" min="2000-01-01" max="2024-01-01" value="2023-01-01"> - 
                                        <input id="endDate" type="date" min="2000-01-01" max="2024-01-01" value="2024-01-01">
                                    </p>
                                    <p>
                                        <span style="color: #2B77D0">Nội dung:</span><br>
                                        <textarea id="req-content" type="text"></textarea>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-end inline" id="update">
                            <button class="col-2">
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);

        // Block changing district if role is "phuong"
        if (this.profileInfo.role == "phuong")
            document.querySelector("#contentOverlay #phuong").disabled = true;
        
        // "Update" button
        let button = document.querySelector("#content #update button");
        let permissionReqListUpdate = JSON.parse(localStorage.getItem('permissionReqListUpdate'));
        button.addEventListener('click', () => {
            if (!permissionReqListUpdate) {
                permissionReqListUpdate = {};
                permissionReqListUpdate["cnt"] = 2;
                permissionReqListUpdate["yeucau"] = {}
            }

            let name = document.querySelector("#contentOverlay input#name").value;
            let sonha = document.querySelector("#contentOverlay input#sonha").value;
            let duong = document.querySelector("#contentOverlay select#duong").value;
            let phuong = document.querySelector("#contentOverlay select#phuong").value;
            let coName = document.querySelector("#contentOverlay input#coName").value;
            let coEmail = document.querySelector("#contentOverlay input#coEmail").value;
            let coPhone = document.querySelector("#contentOverlay input#coPhone").value;
            let startDate = document.querySelector("#contentOverlay input#startDate").value;
            let endDate = document.querySelector("#contentOverlay input#endDate").value;
            let reqContent = document.querySelector("#contentOverlay textarea#req-content").value;
            
            if (!name || !sonha || !duong || !phuong || !coName || !coEmail || !coPhone || !startDate || !endDate || !reqContent) {
                alert("Cần nhập đầy đủ dữ liệu của 1 yêu cầu!");
                return;
            }
            if (Date.parse(endDate) <= Date.parse(startDate)) {
                alert("Thời điểm bắt đầu của hợp đồng phải nhỏ hơn thời điểm kết thúc!");
                return;
            }

            let index = permissionReqListUpdate["cnt"];
            let data = {
                "id": "YCCP" + String(index + 1).padStart(5, '0'),
                "name": name,
                "co": {
                    "id": coName,
                    "name": coName,
                    "email": coEmail,
                    "phone": coPhone
                },
                "loc": {
                    "sonha": sonha,
                    "duong": duong,
                    "phuong": phuong
                },
                "startdate": startDate,
                "enddate": endDate,
                "content": reqContent
            };
            permissionReqListUpdate["yeucau"][data.id] = data;
            permissionReqListUpdate["cnt"]++;

            localStorage.setItem('permissionReqListUpdate', JSON.stringify(permissionReqListUpdate));
            history.back();
        })
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();