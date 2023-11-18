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
import {getPermissionReqInfo} from '/functions/canbo/getReqInfo.js';
import getAdsInfo from '/functions/canbo/getAdsInfo.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["/screens/phuong/bando/bando.html", "/screens/phuong/quanly/danhsachquangcao/danhsachquangcao.html", "#"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"];
        this.areaInfo = {};
        this.repInfo = {}
        this.adTypeInfo = {};

        // Transfer existing filter data to code storage
        let filter = sessionStorage.getItem("permissionReqListFilter");
        if (filter) {
            filter = JSON.parse(filter);
            if (filter["role"] == this.profileInfo.role) {
                console.log(filter);
                this.filter = filter;
                sessionStorage.removeItem("permissionReqListFilter");
            }
        }
    },

    fetchData : async function() {
        const ads = await getAdsInfo();

        const reqs = await getPermissionReqInfo();
        this.areaInfo["quan"] = ads[0][this.profileInfo.quan].name;
        this.areaInfo["phuong"] = ads[0][this.profileInfo.quan].phuong[this.profileInfo.phuong];
        this.reqInfo = reqs[this.profileInfo.quan].phuong[this.profileInfo.phuong].duong;

        this.adTypeInfo = ads[1];

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
        const areaInfo = this.areaInfo;
        const reqInfo = this.reqInfo;
        if (!this.reqInfo) return;
        const filter = this.filter;
        let i = 1;
        main.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <div class="row flex-grow-1">
                    <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                        ${
                            SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 2)
                        }
                    </div>
                    <div id="content" class="tb col-md-11 col-12">
                        <ul id="category">
                            <li class="tb-active">Yêu cầu cấp phép</li>
                        </ul>
                        <table class="table table-sm">
                            <thead>
                                <tr class="ad-general-header">
                                    <th scope="col">STT</th>
                                    <th scope="col">Công ty</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">SĐT</th>
                                    <th scope="col">Địa điểm</th>
                                    <th scope="col" style="font-weight: bold; color: #2B77D0">+</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    Object.keys(reqInfo).map(function (streetId) {
                                        return Object.values(reqInfo[streetId].yeucau).map((req) => {
                                            // let adInfo = req.loc.split("_");
                                            // let reqAdOldInfo = adTypeInfo[adInfo[0]].qc[adInfo[1]]

                                            // Check for filters
                                            if (filter) {
                                                if (!filter["co"].includes(req.co.id)) return ``;
                                            }

                                            let row = `
                                            <tr class="ad-general">
                                                <td>${i}</td>
                                                <td>${req.co.name}</td>
                                                <td>${req.co.email}</td>
                                                <td>${req.co.phone}</td>
                                                <td>${req.loc.sonha} ${req.loc.duong}</td>
                                                <td>
                                                    ${AdInfoDropdownButton("ad" + i + "Specific")}
                                                </td>
                                                <td>
                                                    ${AdInfoDropdownButton("ad" + i + "Specific")}
                                                </td>
                                            </tr>
                                            `
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
                            <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body small">
                                <form id="reqFilterForm" class="row">
                                    <div class="col">
                                        <h5>Công ty</h5>
                                        <div id="coFilterCard">
                                            <input type="checkbox" id="co_vincom">
                                            <label for="co_vincom">Vincom</label>
                                        </div>
                                        <div id="coFilterCard">
                                            <input type="checkbox" id="co_coopmart">
                                            <label for="co_coopmart">Cốp Mắc</label>
                                        </div>
                                        <div id="coFilterCard">
                                            <input type="checkbox" id="co_aeon">
                                            <label for="co_aeon">Aeon Mô</label>
                                        </div>
                                        <div id="coFilterCard">
                                            <input type="checkbox" id="co_bigc">
                                            <label for="co_bigc">Beeg See</label>
                                        </div>
                                    </div>
                                    <input type="submit" id="filterSubmit" value="" class="hidden">
                                </form>
                                <label for="filterSubmit">Lọc</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);

        // Adjust filter menu to fit with current filter data
        if (filter) {
            filter["co"].forEach((type) => {
                document.querySelector('#filterMenu #coFilterCard input[type="checkbox"][id="co_' + type + '"]').checked = true;
            })
        }
        else {
            let coCheckboxes = document.querySelectorAll('#filterMenu #coFilterCard input[type="checkbox"][id^="co_"]');
            coCheckboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });
        }

        // Listen to filter button click
        const adminRole = this.profileInfo.role;
        document.getElementById("reqFilterForm").addEventListener("submit", (e) => {
            e.preventDefault();
            let totalFilter = {};

            totalFilter["role"] = adminRole;

            let coCheckboxes = document.querySelectorAll('#filterMenu #coFilterCard input[type="checkbox"][id^="co_"]:checked');
            let coFilter = [];
            coCheckboxes.forEach((checkbox) => {
                let co = checkbox.id.substring(3);
                coFilter.push(co);
            });
            totalFilter["co"] = coFilter;

            sessionStorage.setItem("permissionReqListFilter", JSON.stringify(totalFilter));
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