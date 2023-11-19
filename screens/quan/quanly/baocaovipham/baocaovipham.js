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
import getRepInfo from '/functions/canbo/getRepInfo.js';
import getAdsInfo from '/functions/canbo/getAdsInfo.js';
import getAreaInfo from '/functions/canbo/getAreaInfo.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "", "role": "quan", "role_area": "Bình Thạnh"}
        this.sidebarHrefs = ["/screens/quan/bando/bando.html", "#", "/screens/quan/kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"];
        this.areaInfo = {};
        this.repInfo = {}
        this.adTypeInfo = {};

        // Transfer existing filter data to code storage
        let filter = sessionStorage.getItem("repListFilter");
        if (filter) {
            filter = JSON.parse(filter);
            if (filter["role"] == this.profileInfo.role) {
                console.log(filter);
                this.filter = filter;
                sessionStorage.removeItem("repListFilter");
            }
        }
    },

    fetchData : async function() {
        const ads = await getAdsInfo();

        const reps = await getRepInfo();
        this.repInfo = reps[this.profileInfo.quan].phuong;

        this.adTypeInfo = ads[1];

        const areas = await getAreaInfo();
        this.areaInfo["quan"] = areas[this.profileInfo.quan].name;

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
        const updates = JSON.parse(localStorage.getItem("repListUpdate"));

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
                            <li><a href="../yeucauchinhsua/yeucauchinhsua.html">Yêu cầu chỉnh sửa</a></li>
                            <li class="tb-active">Báo cáo</li>
                        </ul>
                        <table class="table table-sm">
                            <thead>
                                <tr class="ad-general-header">
                                    <th scope="col">STT</th>
                                    <th scope="col">Thời điểm gửi</th>
                                    <th scope="col">Địa điểm vi phạm</th>
                                    <th scope="col">Loại hình báo cáo</th>
                                    <th scope="col">Tình trạng xử lý</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    Object.values(this.repInfo).map(function (districtInfo) {
                                        return Object.values(districtInfo.duong).map(function (streetInfo) {
                                            return Object.values(streetInfo.baocao).map((rep) => {
                                                let adInfo = rep.loc.split("_");
                                                let repAdInfo = adTypeInfo[adInfo[0]].qc[adInfo[1]]
                                                let adAddr = JSON.stringify({
                                                    "duong": streetInfo.name,
                                                    "quan": areaInfo.quan,
                                                    "phuong": districtInfo.name
                                                });
    
                                                // Check for updates on report state
                                                if (updates && updates[rep.id]) {
                                                    rep.status = true;
                                                    rep.solution = updates[rep.id];
                                                }
    
                                                // Check for filters
                                                if (filter) {
                                                    if (!filter["ph"].includes(districtInfo.id)) return ``;
                                                    if (filter["date"] > Date.parse(rep.date)) return ``;
                                                    if (!filter["type"].includes(rep.type.id)) return ``;
                                                    if (!filter["status"].includes(parseInt(+ rep.status))) return ``;
                                                }
                                                
                                                let statusText;
                                                if (!rep.status) {
                                                    statusText = `<div class="rep-status-0">Đang xử lý</div>`;
                                                }
                                                else {
                                                    statusText = `<div class="rep-status-1">Đã xử lý</div>`;
                                                }
    
                                                let row = `
                                                <tr class="ad-general">
                                                    <td>${i}</td>
                                                    <td>${rep.date}</td>
                                                    <td>${repAdInfo.sonha} ${streetInfo.name}, P. ${districtInfo.name}</td>
                                                    <td>${rep.type.name}</td>
                                                    <td>${statusText}</td>
                                                    <td>
                                                        <button onclick='redirectToRepPage("${rep.id}", ${adAddr}, ${JSON.stringify(repAdInfo)}, ${JSON.stringify(rep)}, ${JSON.stringify(profileInfo)})'>
                                                            Chi tiết
                                                        </button>
                                                    </td>
                                                </tr>
                                                `
                                                i++;
                                                return row
                                            }).join('');
                                        }).join('')
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
                                <form id="repFilterForm" class="row">
                                    <div class="col">
                                        <h5>Phường</h5>
                                        <div id="phFilterCard">
                                            <input type="checkbox" id="ph_3">
                                            <label for="ph_3">Phường 3</label>
                                        </div>
                                        <div id="phFilterCard">
                                            <input type="checkbox" id="ph_17">
                                            <label for="ph_17">Phường 17</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h5>Thời điểm gửi báo cáo (đến nay)</h5>
                                        <div id="dateFilterCard">
                                            <input type="date" id="date" name="date" value="2000-01-01" min="2000-01-01" max="2024-01-01">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h5>Loại hình báo cáo</h5>
                                        <div id="typeFilterCard">
                                            <input type="checkbox" id="type_tgsp">
                                            <label for="type_tgsp">Tố giác sai phạm</label>
                                        </div>
                                        <div id="typeFilterCard">
                                            <input type="checkbox" id="type_dknd">
                                            <label for="type_dknd">Đăng ký nội dung</label>
                                        </div>
                                        <div id="typeFilterCard">
                                            <input type="checkbox" id="type_dgyk">
                                            <label for="type_dgyk">Đóng góp ý kiến</label>
                                        </div>
                                        <div id="typeFilterCard">
                                            <input type="checkbox" id="type_gdtm">
                                            <label for="type_gdtm">Giải đáp thắc mắc</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h5>Tình trạng xử lí</h5>
                                        <div id="statusFilterCard">
                                            <input type="checkbox" id="status0">
                                            <label for="status0">Đang xử lí</label>
                                        </div>
                                        <div id="statusFilterCard">
                                            <input type="checkbox" id="status1">
                                            <label for="status1">Đã xử lí</label>
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
            filter["ph"].forEach((ph) => {
                document.querySelector('#filterMenu #phFilterCard input[type="checkbox"][id="ph_' + ph + '"]').checked = true;
            })

            document.querySelector('#filterMenu #dateFilterCard input').value = (new Date(filter["date"])).toISOString().substring(0, 10);

            filter["type"].forEach((type) => {
                document.querySelector('#filterMenu #typeFilterCard input[type="checkbox"][id="type_' + type + '"]').checked = true;
            })

            filter["status"].forEach((status) => {
                document.querySelector('#filterMenu #statusFilterCard input[type="checkbox"][id="status' + status + '"]').checked = true;
            })
        }
        else {
            let phCheckboxes = document.querySelectorAll('#filterMenu #phFilterCard input[type="checkbox"][id^="ph_"]');
            phCheckboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });

            let typeCheckboxes = document.querySelectorAll('#filterMenu #typeFilterCard input[type="checkbox"][id^="type_"]');
            typeCheckboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });

            let statusCheckboxes = document.querySelectorAll('#filterMenu #statusFilterCard input[type="checkbox"][id^="status"]');
            statusCheckboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });
        }

        // Listen to filter button click
        const adminRole = this.profileInfo.role;
        document.getElementById("repFilterForm").addEventListener("submit", (e) => {
            e.preventDefault();
            let totalFilter = {};

            totalFilter["role"] = adminRole;

            let phCheckboxes = document.querySelectorAll('#filterMenu #phFilterCard input[type="checkbox"][id^="ph_"]:checked');
            let phFilter = [];
            phCheckboxes.forEach((checkbox) => {
                let ph = checkbox.id.substring(3);
                phFilter.push(ph);
            });
            totalFilter["ph"] = phFilter;

            let filterDate = new Date(document.querySelector("#filterMenu #dateFilterCard input").value);
            totalFilter["date"] = Date.parse(filterDate);

            let typeCheckboxes = document.querySelectorAll('#filterMenu #typeFilterCard input[type="checkbox"][id^="type_"]:checked');
            let typeFilter = [];
            typeCheckboxes.forEach((checkbox) => {
                let type = checkbox.id.substring(5);
                typeFilter.push(type);
            });
            totalFilter["type"] = typeFilter;

            let statusCheckboxes = document.querySelectorAll('#filterMenu #statusFilterCard input[type="checkbox"][id^="status"]:checked');
            let statusFilter = [];
            statusCheckboxes.forEach((checkbox) => {
                let status = parseInt(checkbox.id.substring(6));
                statusFilter.push(status);
            });
            totalFilter["status"] = statusFilter;

            sessionStorage.setItem("repListFilter", JSON.stringify(totalFilter));
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