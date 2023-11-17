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
import getDistrictInfo from '/functions/canbo/getDistrictInfo.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["#", "../nhansu/nhansu.html","../thongke/thongke.html", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["quanly_icon.svg", "nhansu_icon.svg", "thongke_icon.svg","kiemduyet_icon.svg"];
        this.sidebarLabels = ["Quản lý", "Nhân Sự", "Thống Kế", "Kiểm duyệt"]
        this.dInfo = {} // district
        this.dDetail = {}
        this.adInfo = {}
        this.adDetail = {}
    },

    fetchData : async function() {
        const ds = await getDistrictInfo();
        this.dInfo = ds[0];

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

        this.render(0);


    },

    render : function(ID) {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `

        if (document.querySelector("#root>main") != null) { 
            console.log(document.querySelector("#root > main"));
            document.querySelector("#root>main").remove() 
        }
        let main = document.createElement("main");
        let i = 1;
        let j = 1;
        const adDetail = this.adDetail;
        if (ID == 0) {
            main.innerHTML = `
                <div class="container-fluid d-flex flex-column">
                    <div class="row flex-grow-1">
                        <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                            ${
                                SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 0)
                            }
                        </div>
                        <div id="content" class="tb col-md-11 col-12">
                            <div id="contentOverlay" style="display: none"></div>
                            <ul id="category">
                                <li class="tb-active cate" id="cate-0">Thông tin chung</li>
                                <li class="cate" id="cate-1">Thông tin quảng cáo </li>
                                <li class="cate" id="cate-2">Báo cáo vi phạm</li>
                            </ul>
                            <table class="table table-sm">
                                <thead>
                                    <tr class="ad-general-header">
                                        <th scope="col">STT</th>
                                        <th scope="col">Địa điểm</th>
                                        <th scope="col">Số Lượng Quảng Cáo</th>
                                        <th scope="col">Số lượng Vi Phạm</th>
                                        <th scope="col">Người Đảm Nhiệm</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${
                                        Object.values(this.dInfo).map(function (districtInfo){
                                            let row =` 
                                                <tr class="ad-general">
                                                    <td>${i}</td>
                                                    <td>${districtInfo.name}</td>
                                                    <td>${districtInfo.qc_num}</td>
                                                    <td>${districtInfo.illegal_qc_num}</td>
                                                    <td>${districtInfo.incharge}</td>
                                                    <td>
                                                        ${AdInfoDropdownButton("ad" + i + "Specific")}
                                                    </td>
                                                </tr>
                                                    <tr id="ad${i}Specific" style="display: none; border-top: 2px dashed lightgrey;">
                                                    </tr>
                                                                
                                                    ${
                                                        Object.values(districtInfo.phuong).map(function (wardInfo) {
                                                            let rowSpecific = `
                                                            <tr class="ad-specific" id="ad${i}Specific" style="display: none; padding: 5px;">
                                                                <td> ${j} </td>
                                                                <td> ${wardInfo.name} </td>
                                                                <td> ${wardInfo.qc_num} </td>
                                                                <td> ${wardInfo.illegal_qc_num} </td>
                                                                <td> ${wardInfo.incharge} </td>
                                                            </tr>
                                                            `;
                                                            j++;
                                                            return rowSpecific;
                                                        }).join('')
                                                    }
                                                    
                                                </tr>
                                            `;
                                            i++;
                                            j = 1;
                                            return row;
                                        }).join('')
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `
        }
        else if (ID == 1) {
            main.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <div class="row flex-grow-1">
                    <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                        ${
                            SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 0)
                        }
                    </div>
                    <div id="content" class="tb col-md-11 col-12">
                        <div id="contentOverlay" style="display: none"></div>
                        <ul id="category">
                            <li class="cate" id="cate-0">Thông tin chung</li>
                            <li class="tb-active cate" id="cate-1">Thông tin quảng cáo </li>
                            <li class="cate" id="cate-2">Báo cáo vi phạm</li>
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
                                                                    let rowSpecific = `
                                                                    <tr class="ad-specific" id="ad${i}Specific" style="display: none">
                                                                    <td>${j}</td>
                                                                    <td>${adDetail.sonha} ${streetInfo.name}</td>
                                                                    <td>${adDetail.size}</td>
                                                                    <td>${adDetail.cnt}</td>
                                                                    <td>${adDetail.purpose}</td>
                                                                    <td>${adDetail.type}</td>
                                                                    
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
        }
        root.appendChild(main);
        this.event();
    },

    event: function () {
        var x = document.querySelector("#root>main").firstElementChild.querySelectorAll("li.cate");
    
        for (let i = 0; i < x.length; i++) {
            x.item(i).addEventListener("click", function () {
    
                // Determine which category was clicked based on its ID
                const categoryId = this.id.split('-')[1];
                
                // Call the render function with the clicked category ID
                trangchu.render(parseInt(categoryId));
            });
        }
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(0); // Xong sẽ render mấy cái data đó
        
    }
}

trangchu.start();
