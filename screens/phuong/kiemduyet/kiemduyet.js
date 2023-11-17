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
        let i = 1;
        let j = 1;
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
                                    Object.keys(this.reqInfo).map(function (streetId) {
                                        return Object.values(streetInfo.baocao).map((req) => {
                                            // let adInfo = req.loc.split("_");
                                            // let reqAdOldInfo = adTypeInfo[adInfo[0]].qc[adInfo[1]]

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