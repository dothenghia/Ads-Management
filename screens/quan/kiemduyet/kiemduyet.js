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
import getAreaInfo from '/functions/canbo/getAreaInfo.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "", "role": "quan", "role_area": "Bình Thạnh"}
        this.sidebarHrefs = ["/screens/quan/bando/bando.html", "/screens/quan/quanly/danhsachquangcao/danhsachquangcao.html", "#"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_ic_normal.svg", "kiemduyet_ic_active.svg"];
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
        this.reqInfo = reqs[this.profileInfo.quan].phuong;

        const areas = await getAreaInfo();
        this.areaInfo["quan"] = areas[this.profileInfo.quan].name;
        this.areaInfo["dsPhuong"] = areas[this.profileInfo.quan].phuong
        // this.areaInfo["phuong"] = areas[this.profileInfo.quan].phuong[this.profileInfo.phuong].name;
        // this.areaInfo["dsDuong"] = areas[this.profileInfo.quan].phuong[this.profileInfo.phuong].duong;

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
        const profileInfo = this.profileInfo;
        let profileInfoString = JSON.stringify(profileInfo);
        const areaInfo = this.areaInfo;
        const reqInfo = this.reqInfo;
        const permissionReqListUpdate = JSON.parse(localStorage.getItem("permissionReqListUpdate"));
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
                                    <th scope="col">
                                        <button onclick='
                                            sessionStorage.setItem("createPermissionReqPageData", ${JSON.stringify(profileInfoString)});
                                            window.location.href="/screens/canbo/taoyeucaucapphep/taoyeucaucapphep.html";
                                        '>
                                            +
                                        </button>
                                    </th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    Object.values(reqInfo).map(function (districtInfo) {
                                        return Object.values(districtInfo.yeucau).map(function (req) {
                                            // Check for filters
                                            if (filter) {
                                                if (!filter["co"].includes(req.co.id)) return ``;
                                            }
    
                                            // Check for elements that have been removed
                                            let permissionReqListRemove = JSON.parse(localStorage.getItem("permissionReqListRemove"));
                                            if (permissionReqListRemove) {
                                                if (permissionReqListRemove.includes(req.id)) return ``;
                                            }
                                            
                                            let dsDuong = areaInfo.dsPhuong[districtInfo.id].duong;
                                            let reqAddr = {
                                                "quan": areaInfo.quan,
                                                "phuong": districtInfo.name,
                                                "duong": dsDuong[req.loc.duong].name
                                            }

                                            let row = `
                                            <tr class="ad-general">
                                                <td>${i}</td>
                                                <td>${req.co.name}</td>
                                                <td>${req.co.email}</td>
                                                <td>${req.co.phone}</td>
                                                <td>${req.loc.sonha} ${dsDuong[req.loc.duong].name}, P. ${districtInfo.name}</td>
                                                <td>
                                                    <button onclick='
                                                        let permissionReqListRemove = JSON.parse(localStorage.getItem("permissionReqListRemove"));
                                                        if (!permissionReqListRemove)
                                                            permissionReqListRemove = [];
                                                        permissionReqListRemove.push("${req.id}");
                                                        localStorage.setItem("permissionReqListRemove", JSON.stringify(permissionReqListRemove));
                                                        location.reload();
                                                    '>
                                                        Xóa
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onclick='redirectToPermissionReqPage(${JSON.stringify(reqAddr)}, ${JSON.stringify(req)}, ${JSON.stringify(profileInfo)})'>
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                            `
                                            i++;
                                            return row
                                        }).join('')
                                    }).join('')
                                }
                                ${
                                    (() => {
                                        if (permissionReqListUpdate) {
                                            return Object.values(JSON.parse(localStorage.getItem("permissionReqListUpdate")).yeucau).map(function (req) {
                                                let reqAddr = {
                                                    "quan": areaInfo.quan,
                                                    "phuong": areaInfo.dsPhuong[req.loc.phuong].name,
                                                    "duong": areaInfo.dsPhuong[req.loc.phuong].duong[req.loc.duong].name
                                                }

                                                let row = `
                                                <tr class="ad-general">
                                                    <td>${i}</td>
                                                    <td>${req.co.name}</td>
                                                    <td>${req.co.email}</td>
                                                    <td>${req.co.phone}</td>
                                                    <td>${req.loc.sonha} ${reqAddr.duong}, P. ${reqAddr.phuong}</td>
                                                    <td>
                                                        <button onclick='
                                                            let permissionReqListUpdate = JSON.parse(localStorage.getItem("permissionReqListUpdate"));
                                                            if (permissionReqListUpdate && permissionReqListUpdate.yeucau["${req.id}"])
                                                                delete permissionReqListUpdate.yeucau["${req.id}"];
                                                            console.log(permissionReqListUpdate);
                                                            localStorage.setItem("permissionReqListUpdate", JSON.stringify(permissionReqListUpdate));
                                                            location.reload();
                                                        '>
                                                            Xóa
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button onclick='redirectToPermissionReqPage(${JSON.stringify(reqAddr)}, ${JSON.stringify(req)}, ${JSON.stringify(profileInfo)})'>
                                                            Chi tiết
                                                        </button>
                                                    </td>
                                                </tr>
                                                `
                                                i++;
                                                return row
                                            }).join('')
                                        }
                                        else return ``;
                                    })()
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
                            </div>
                            
                            <div id="filterNav" class="row justify-content-center">
                                <div class="col-6"><button type="button" data-bs-dismiss="offcanvas" aria-label="Close">Đóng</button></div>
                                <div class="col-6"><label class="col-6" for="filterSubmit">Lọc</label></div
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