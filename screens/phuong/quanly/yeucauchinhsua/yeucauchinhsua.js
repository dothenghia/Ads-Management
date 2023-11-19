// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/canbo/Header.js';
import SideBar from '/components/canbo/SideBar.js';
import AdInfoDropdownButton from '/components/phuong/AdInfoDropdownButton.js';

// Import Functions
import {getChangeReqInfo} from '/functions/canbo/getReqInfo.js';
import getAdsInfo from '/functions/canbo/getAdsInfo.js';
import getAreaInfo from '/functions/canbo/getAreaInfo.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["/screens/phuong/bando/bando.html", "#", "/screens/phuong/kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_ic_active.svg", "kiemduyet_ic_normal.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"];
        this.areaInfo = {};
        this.reqInfo = {}
        this.adTypeInfo = {};

        // Transfer existing filter data to code storage
        let filter = sessionStorage.getItem("changeReqListFilter");
        if (filter) {
            filter = JSON.parse(filter);
            if (filter["role"] == this.profileInfo.role) {
                this.filter = filter;
                sessionStorage.removeItem("changeReqListFilter");
            }
        }
    },

    fetchData : async function() {
        const ads = await getAdsInfo();

        const reqs = await getChangeReqInfo();
        this.reqInfo = reqs[this.profileInfo.quan].phuong[this.profileInfo.phuong].duong;

        this.adTypeInfo = ads[1];

        const areas = await getAreaInfo();
        this.areaInfo["quan"] = areas[this.profileInfo.quan].name;
        this.areaInfo["phuong"] = areas[this.profileInfo.quan].phuong[this.profileInfo.phuong].name;

        this.render();
    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `

        let main = document.createElement("main");
        const adTypeInfo = this.adTypeInfo;
        const adStreetInfo = this.adStreetInfo;
        const profileInfo = this.profileInfo;
        const areaInfo = this.areaInfo;
        const filter = this.filter;

        // Simulate getting updates from database
        const updates = JSON.parse(localStorage.getItem("changeReqListUpdate"));

        let i = 1;
        main.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <div class="row flex-grow-1">
                    <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                        ${
                            SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 1)
                        }
                    </div>
                    <div id="content" class="tb col-md-11 col-12">
                        <ul id="category">
                            <li><a href="../danhsachquangcao/danhsachquangcao.html">Thông tin quảng cáo</a></li>
                            <li class="tb-active">Yêu cầu chỉnh sửa</li>
                            <li><a href="../baocaovipham/baocaovipham.html">Báo cáo</a></li>
                        </ul>
                        <table class="table table-sm">
                            <thead>
                                <tr class="ad-general-header">
                                    <th scope="col">STT</th>
                                    <th scope="col">Địa điểm</th>
                                    <th scope="col">Thời điểm gửi yêu cầu</th>
                                    <th scope="col">Lý do chỉnh sửa</th>
                                    <th scope="col">Tình trạng xử lý</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    Object.values(this.reqInfo).map(function (streetInfo) {
                                        return Object.values(streetInfo.yeucau).map((req) => {
                                            let adInfo = req.loc.split("_");
                                            let reqAdOldInfo = adTypeInfo[adInfo[0]].qc[adInfo[1]]
                                            let adAddr = JSON.stringify({
                                                "duong": streetInfo.name,
                                                "quan": areaInfo.quan,
                                                "phuong": areaInfo.phuong
                                            });
                                            
                                            // Check for updates on request status
                                            if (updates && updates[req.id]) req.status = updates[req.id];
                                            
                                            // Check for filters
                                            if (filter) {
                                                console.log(filter)
                                                if (filter["date"] > Date.parse(req.date)) return ``;
                                                if (!filter["reason"].includes(req.reason)) return ``;
                                                if (!filter["status"].includes(req.status)) return ``;
                                            }

                                            let statusText;
                                            switch (req.status) {
                                                case 0:
                                                    statusText = `<div class="req-status-0">Chưa xử lý</div>`;
                                                    break;
                                                case 1:
                                                    statusText = `<div class="req-status-1">Đang xử lý</div>`;
                                                    break;
                                                case 2:
                                                    statusText = `<div class="req-status-2">Đã xử lý</div>`;
                                                    break;
                                                case 3:
                                                    statusText = `<div class="req-status-3">Bị từ chối</div>`;
                                                    break;
                                            }

                                            let row = `
                                            <tr class="ad-general">
                                                <td>${i}</td>
                                                <td>${reqAdOldInfo.sonha} ${streetInfo.name}</td>
                                                <td>${req.date}</td>
                                                <td>${req.reason}</td>
                                                <td>${statusText}</td>
                                                <td>
                                                    <button onclick='redirectToChangeReqPage("${req.id}", ${adAddr}, ${JSON.stringify(reqAdOldInfo)}, ${JSON.stringify(req.new)}, ${JSON.stringify(profileInfo)})'>
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                            `
                                            i++;
                                            return row
                                        }).join('');
                                    }).join('')
                                }
                            </tbody>
                        </table>

                        <div id="filter-button">
                            <button type="button" data-bs-toggle="offcanvas" data-bs-target="#filterMenu" aria-controls="filterMenu">
                                <img src="/assets/chung/icon/boloc_icon.svg" alt="Filter">
                            </button>
                        </div>
                        <div class="offcanvas offcanvas-bottom" tabindex="51" id="filterMenu" aria-labelledby="offcanvasBottomLabel">   
                            <div class="offcanvas-body small">
                                <form id="changeReqFilterForm" class="row">
                                    <div class="col">
                                        <h5>Thời điểm gửi yêu cầu (đến nay)</h5>
                                        <div id="dateFilterCard">
                                            <input type="date" id="date" name="date" value="2000-01-01" min="2000-01-01" max="2024-01-01">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h5>Lý do chỉnh sửa</h5>
                                        <div id="reasonFilterCard">
                                            <input type="checkbox" id="reason1">
                                            <label for="reason1">Không phù hợp</label>
                                        </div>
                                        <div id="reasonFilterCard">
                                            <input type="checkbox" id="reason2">
                                            <label for="reason2">Không tác dụng</label>
                                        </div>
                                        <div id="reasonFilterCard">
                                            <input type="checkbox" id="reason3">
                                            <label for="reason3">Đổi mới</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h5>Tình trạng</h5>
                                        <div id="statusFilterCard">
                                            <input type="checkbox" id="status0">
                                            <label for="status0">Chưa xử lí</label>
                                        </div>
                                        <div id="statusFilterCard">
                                            <input type="checkbox" id="status1">
                                            <label for="status1">Đang xử lí</label>
                                        </div>
                                        <div id="statusFilterCard">
                                            <input type="checkbox" id="status2">
                                            <label for="status2">Đã xử lí</label>
                                        </div>
                                        <div id="statusFilterCard">
                                            <input type="checkbox" id="status3">
                                            <label for="status3">Bị từ chối</label>
                                        </div>
                                    </div>
                                    <input type="submit" id="filterSubmit" value="" class="hidden">
                                </form>
                            </div>
                            
                            <div id="filterNav" class="row justify-content-center">
                                <div class="col-6 text-end"><button type="button" data-bs-dismiss="offcanvas" aria-label="Close">Đóng</button></div>
                                <div class="col-6 text-start"><label class="col-6" for="filterSubmit">Lọc</label></div
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);
        
        // Adjust filter menu to fit with current filter data
        if (filter) {
            document.querySelector('#filterMenu #dateFilterCard input').value = (new Date(filter["date"])).toISOString().substring(0, 10);

            let reasonNo = {"Không phù hợp": "1", "Không tác dụng": "2", "Đổi mới": "3"};
            filter["reason"].forEach((reason) => {
                document.querySelector('#filterMenu #reasonFilterCard input[type="checkbox"][id="reason' + reasonNo[reason] + '"]').checked = true;
            })

            filter["status"].forEach((status) => {
                document.querySelector('#filterMenu #statusFilterCard input[type="checkbox"][id="status' + status + '"]').checked = true;
            })
        }
        else {
            let reasonCheckboxes = document.querySelectorAll('#filterMenu #reasonFilterCard input[type="checkbox"][id^="reason"]');
            reasonCheckboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });

            let statusCheckboxes = document.querySelectorAll('#filterMenu #statusFilterCard input[type="checkbox"][id^="status"]');
            statusCheckboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });
        }

        // Listen to filter button click
        const adminRole = this.profileInfo.role;
        document.getElementById("changeReqFilterForm").addEventListener("submit", (e) => {
            e.preventDefault();
            let totalFilter = {};

            totalFilter["role"] = adminRole;

            let filterDate = new Date(document.querySelector("#filterMenu #dateFilterCard input").value);
            totalFilter["date"] = Date.parse(filterDate);

            let reasonCheckboxes = document.querySelectorAll('#filterMenu #reasonFilterCard input[type="checkbox"][id^="reason"]:checked');
            let reasonFilter = [];
            reasonCheckboxes.forEach((checkbox) => {
                let reason = parseInt(checkbox.id.substring(6));
                switch (reason) {
                    case 1:
                        reasonFilter.push("Không phù hợp");
                        break;
                    case 2:
                        reasonFilter.push("Không tác dụng");
                        break;
                    case 3:
                        reasonFilter.push("Đổi mới");
                        break;
                }
            });
            totalFilter["reason"] = reasonFilter;

            let statusCheckboxes = document.querySelectorAll('#filterMenu #statusFilterCard input[type="checkbox"][id^="status"]:checked');
            let statusFilter = [];
            statusCheckboxes.forEach((checkbox) => {
                let status = parseInt(checkbox.id.substring(6));
                statusFilter.push(status);
            });
            totalFilter["status"] = statusFilter;

            sessionStorage.setItem("changeReqListFilter", JSON.stringify(totalFilter));
            location.reload();
        });
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();