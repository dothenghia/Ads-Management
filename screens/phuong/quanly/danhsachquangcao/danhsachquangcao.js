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

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["/screens/phuong/bando/bando.html", "#", "/screens/phuong/kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"];
        this.areaInfo = {};
        this.adInfo = {};
        this.adDetail = {};
    },

    fetchData : async function() {
        const ads = await getAdsInfo();
        this.areaInfo["quan"] = ads[0][this.profileInfo.quan].name;
        this.areaInfo["phuong"] = ads[0][this.profileInfo.quan].phuong[this.profileInfo.phuong];

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
                            <li>Báo cáo vi phạm</li>
                        </ul>
                        <table class="table table-sm">
                            <thead>
                                <tr class="ad-general-header">
                                    <th scope="col">STT</th>
                                    <th scope="col">Địa điểm</th>
                                    <th scope="col">Loại</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    Object.values(this.adInfo).map(function (streetInfo) {
                                        return Object.keys(streetInfo.diemqc).map(function (adTypeId) {
                                            let adSpotDetail = adDetail[adTypeId];
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
                                                                        "phuong": areaInfo.phuong.name
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
                                                                    <button onclick='redirectToAdInfoPage("${adSpotDetail.id}","${adSpotDetail.name}",${adAddr}, ${adDetailJson})'>
                                                                        ...
                                                                    </button>
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
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();