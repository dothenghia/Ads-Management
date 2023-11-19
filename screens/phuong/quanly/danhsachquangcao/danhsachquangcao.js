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
import getAdsInfo from '/functions/canbo/getAdsInfo.js';
import getAreaInfo from '/functions/canbo/getAreaInfo.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["/screens/phuong/bando/bando.html", "#", "/screens/phuong/kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_ic_active.svg", "kiemduyet_ic_normal.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"];
        this.areaInfo = {};
        this.adInfo = {};
        this.adDetail = {};

        // Transfer existing filter data to code storage
        let filter = sessionStorage.getItem("adListFilter");
        if (filter) {
            filter = JSON.parse(filter);
            if (filter["role"] == this.profileInfo.role) {
                this.filter = filter;
                sessionStorage.removeItem("adListFilter");
            }
        }
    },

    fetchData : async function() {
        const ads = await getAdsInfo();
        let streets = ads[0][this.profileInfo.quan].phuong[this.profileInfo.phuong].duong;

        // Re-organize data from database to fit for table display
        let adInfo = {}
        Object.values(streets).map(function (streetInfo) {
            adInfo[streetInfo.id] = {}
            adInfo[streetInfo.id]["id"] = streetInfo.id;
            adInfo[streetInfo.id]["name"] = streetInfo.name;
            let diemqc = {};
            Object.values(streetInfo.diemqc).map(function (adSpots) {
                Object.keys(adSpots).map(function (adSpot) {
                    if (diemqc[adSpot] == undefined) {
                        diemqc[adSpot] = [];
                    }
                    
                    diemqc[adSpot] = diemqc[adSpot].concat(adSpots[adSpot]);
                    diemqc[adSpot] = [...new Set(diemqc[adSpot])];
                })
            })
            adInfo[streetInfo.id]["diemqc"] = diemqc;
        })
        this.adInfo = adInfo;

        this.adDetail = ads[1];

        const areas = await getAreaInfo();
        this.areaInfo["quan"] = areas[this.profileInfo.quan].name;
        this.areaInfo["phuong"] = areas[this.profileInfo.quan].phuong[this.profileInfo.phuong].name

        this.render();
    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `

        let main = document.createElement("main");
        const adDetail = this.adDetail;
        const areaInfo = this.areaInfo;
        const profileInfo = this.profileInfo;
        const filter = this.filter;
        let i = 1;
        let j = 1;
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
                            <li class="tb-active">Thông tin quảng cáo</li>
                            <li><a href="../yeucauchinhsua/yeucauchinhsua.html">Yêu cầu chỉnh sửa</a></li>
                            <li><a href="../baocaovipham/baocaovipham.html">Báo cáo</a></li>
                        </ul>
                        <table class="table table-sm">
                            <thead>
                                <tr class="ad-general-header">
                                    <th scope="col">STT</th>
                                    <th scope="col">Địa điểm</th>
                                    <th scope="col">Loại</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    Object.values(this.adInfo).map(function (streetInfo) {
                                        return Object.keys(streetInfo.diemqc).map(function (adTypeId) {
                                            let adSpotDetail = adDetail[adTypeId];
                                            
                                            // Check for filters
                                            if (filter && filter["cnt"] != -1 && Object.keys(adSpotDetail.qc).length > filter["cnt"]) { 
                                                return ``;
                                            }

                                            let row = `
                                                <tr class="ad-general">
                                                    <td>${i}</td>
                                                    <td>${streetInfo.name}</td>
                                                    <td>${adSpotDetail.name}</td>
                                                    <td>${Object.keys(adSpotDetail.qc).length}</td>
                                                    <td>
                                                        ${AdInfoDropdownButton("ad" + i + "Specific")}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5">
                                                    <table class="table table-sm">
                                                        <thead>
                                                            <tr class="ad-specific-header" id="ad${i}Specific" style="display: none">
                                                                <th scope="col">#</th>
                                                                <th scope="col">Địa chỉ</th>
                                                                <th scope="col">Kích thước</th>
                                                                <th scope="col">SL trụ</th>
                                                                <th scope="col">Hình thức</th>
                                                                <th scope="col">Phân loại</th>
                                                                <th scope="col"> </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            ${
                                                                Object.values(adSpotDetail.qc).map(function (adDetail) {
                                                                    let adAddr = JSON.stringify({
                                                                        "duong": streetInfo.name,
                                                                        "quan": areaInfo.quan,
                                                                        "phuong": areaInfo.phuong
                                                                    });
                                                                    let adDetailJson = JSON.stringify(adDetail);
                                                                    let rowSpecific = `
                                                                    <tr class="ad-specific" id="ad${i}Specific" style="display: none">
                                                                    <td>${j}</td>
                                                                    <td>${adDetail.sonha} ${streetInfo.name}</td>
                                                                    <td>${adDetail.size}</td>
                                                                    <td>${adDetail.cnt}</td>
                                                                    <td>${adDetail.purpose}</td>
                                                                    <td>${adDetail.type}</td>
                                                                    <td> 
                                                                    <button id="btn-more">
                                                                        <p  style="display: none">${adSpotDetail.id}</p>
                                                                        <p  style="display: none">${adSpotDetail.name}</p>
                                                                        <p  style="display: none">${adAddr}</p>
                                                                        <p  style="display: none">${adDetailJson}</p>
                                                                        <p  style="display: none">${profileInfo}</p>
                                                                    ...
                                                                    </td>
                                                                    </tr>
                                                                    `;
                                                                    j++;
                                                                    return rowSpecific;
                                                                }).join('')
                                                            }
                                                        </tbody>
                                                    </table>
                                                    </td>
                                                </tr>
                                            `;
                                            i++;
                                            j = 1;
                                            return row;
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
                                <form id="adFilterForm" class="row">
                                    <div class="col">
                                        <h5>Số lượng</h5>
                                        <div id="cntFilterCard">
                                            <input type="radio" id="cntAll" name="cnt">
                                            <label for="cntAll">Tất cả</label>
                                        </div>
                                        <div id="cntFilterCard">
                                            <input type="radio" id="cnt5" name="cnt">
                                            <label for="cnt5"><= 5</label>
                                        </div>
                                        <div id="cntFilterCard">
                                            <input type="radio" id="cnt10" name="cnt">
                                            <label for="cnt10"><= 10</label>
                                        </div>
                                        <div id="cntFilterCard">
                                            <input type="radio" id="cnt15" name="cnt">
                                            <label for="cnt15"><= 15</label>
                                        </div>
                                    </div>
                                    <input type="submit" id="filterSubmit" value="">
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
        this.redirectToAdInfoPage();

        // Adjust filter menu to fit with current filter data
        if (filter && filter["cnt"] != -1) {
            document.querySelector("#adFilterForm input[id='cnt" + filter.cnt + "']").checked = true;
        }
        else if (!filter || filter["cnt"] == -1) {
            document.querySelector("#adFilterForm input[id='cntAll']").checked = true;
        }

        // Listen to filter button click
        const adminRole = this.profileInfo.role;
        document.getElementById("adFilterForm").addEventListener("submit", (e) => {
            let totalFilter = {};
            e.preventDefault();
            let cntFilter = document.querySelector('#filterMenu #cntFilterCard input[type="radio"][name="cnt"]:checked').id.substring(3);
            let storedFilter = filter;
            if (cntFilter == "All") {
                if (!storedFilter || storedFilter["cnt"] != -1) {
                    totalFilter["role"] = adminRole;
                    totalFilter["cnt"] = -1;
                }
            }
            else {
                if (!storedFilter || storedFilter["cnt"] != parseInt(cntFilter)) {
                    totalFilter["role"] = adminRole;
                    totalFilter["cnt"] = parseInt(cntFilter);
                }
            }
            sessionStorage.setItem("adListFilter", JSON.stringify(totalFilter));
            location.reload();
        });
    },
    redirectToAdInfoPage : () => {
        function redirectToAdInfoPage(adTypeId, adTypeName, adAddr, adInfo, profileInfo) {
            let adData = {
                "adTypeId": adTypeId,
                "adTypeName": adTypeName,
                "adAddr": adAddr,
                "adInfo": adInfo,
                "profileInfo": profileInfo
            }
            sessionStorage.setItem('adPageData', JSON.stringify(adData));
            window.location.href = '/screens/canbo/thongtinquangcao/thongtinquangcao.html';
        }

        var x = document.querySelector("#root>main").firstElementChild.querySelectorAll("#btn-more");

        for (let i = 0; i < x.length; i++) {
            x.item(i).addEventListener("click", function () {
                let adSpotDetalID= this.children[0].innerText;
                let adSpotDetalName = this.children[1].innerText;
                let adAddr = this.children[2].innerText;
                let adInfo = this.children[3].innerText;
                let profileInfo = this.children[4].innerText;

                redirectToAdInfoPage(adSpotDetalID, adSpotDetalName, adAddr, adInfo, profileInfo);
            });
        }
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();