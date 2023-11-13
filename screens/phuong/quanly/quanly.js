// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/canbo/Header.js';
import SideBar from '/components/canbo/SideBar.js';

// Import Functions
import getAdsInfo from '/functions/canbo/getAdsInfo.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["../bando/bando.html", "#", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
        this.adInfo = {}
        this.adDetail = {}
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

        this.render();
    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `

        let main = document.createElement("main");
        const adDetail = this.adDetail;
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
                            <li class="tb-active">Thông tin quảng cáo</li>
                            <li>Yêu cầu chỉnh sửa</li>
                            <li>Báo cáo vi phạm</li>
                        </ul>
                        <table class="table table-sm">
                            <thead>
                                <tr>
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
                                                <tr class="dropdown">
                                                    <td>${i}</td>
                                                    <td>${streetInfo.name}</td>
                                                    <td>${adSpotDetail.name}</td>
                                                    <td>${Object.keys(adSpotDetail.qc).length}</td>
                                                    <td>
                                                        <button class="btn btn-secondary dropdown-toggle" 
                                                        data-boundary="window" type="button" id="ad${i}Dropdown" 
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Dropdown button
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="ad${i}Dropdown">
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <a class="dropdown-item" href="#">Something else here</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            `;
                                            console.log(row)
                                            i++;
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