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
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"];
        this.areaInfo = {};
        this.reqInfo = {}
        this.adTypeInfo = {};
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
                            <li><a href="../danhsachquangcao/danhsachquangcao.html">Thông tin quảng cáo</a></li>
                            <li class="tb-active">Yêu cầu chỉnh sửa</li>
                            <li><a href="../baocaovipham/baocaovipham.html">Báo cáo vi phạm</a></li>
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
                                                    <button onclick='redirectToChangeReqPage(${adAddr}, ${JSON.stringify(reqAdOldInfo)}, ${JSON.stringify(req.new)})'>
                                                        Chi tiết
                                                    </button>
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