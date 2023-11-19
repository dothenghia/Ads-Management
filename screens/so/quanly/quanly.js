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
import getDistrictInfo from '/functions/canbo/getDistrictInfo.js';
import getAdsInfo from '/functions/canbo/getAdsInfo.js';
import getAreaInfo from '/functions/canbo/getAreaInfo.js';
import getRepInfo from '/functions/canbo/getRepInfoForSo.js';

const trangchu = {
    
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "", "role": "quan", "role_area": "Bình Thạnh"}
        this.sidebarHrefs = ["#", "../nhansu/nhansu.html","../thongke/thongke.html", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["quanly_icon.svg", "nhansu_icon.svg", "thongke_icon.svg","kiemduyet_icon.svg"];
        this.sidebarLabels = ["Quản lý", "Nhân Sự", "Thống Kê", "Kiểm duyệt"]
        this.dInfo = {}; // district
        this.dDetail = {};
        this.adInfo = {};
        this.adDetail = {};
        this.areaInfo = {};
        this.repInfo = {};
    },

    fetchData : async function() {

        // Fetch District Info
        const ds = await getDistrictInfo();
        this.dInfo = ds[0];

        // Fetch Ads Info
        const ads = await getAdsInfo();
        let districts = ads[0][this.profileInfo.quan].phuong;

        // Re-organize data from database to fit for table display
        let adInfo = {}
        Object.values(districts).map(function (districtInfo) {
            adInfo[districtInfo.id] = {}
            adInfo[districtInfo.id]["id"] = districtInfo.id;
            adInfo[districtInfo.id]["name"] = districtInfo.name;
            adInfo[districtInfo.id].duong = {};
            Object.values(districtInfo.duong).map(function (streetInfo) {
                adInfo[districtInfo.id].duong[streetInfo.id] = {}
                adInfo[districtInfo.id].duong[streetInfo.id]["id"] = streetInfo.id;
                adInfo[districtInfo.id].duong[streetInfo.id]["name"] = streetInfo.name;
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
                adInfo[districtInfo.id].duong[streetInfo.id]["diemqc"] = diemqc;
            })
        })

        this.adInfo = adInfo;

        this.adDetail = ads[1];

        // Fetch Area Info
        const areas = await getAreaInfo();
        this.areaInfo["quan"] = areas[this.profileInfo.quan].name;
        
        // Fetch Rep Info
        const reps = await getRepInfo();
        this.repInfo = reps;
    },

    render : function(ID) {
        // Root
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `

        // Modal
        const modal = root.querySelector("#for-modal");

        // Check exists
        if (document.querySelector("#root>main") != undefined) { 
            //console.log(document.querySelector("#root>main"));
            document.querySelector("#root>main").remove() 
        }
        
        // Create main element
        let main = document.createElement("main");

        let i = 1;
        let j = 1;
        const adDetail = this.adDetail;
        const areaInfo = this.areaInfo;
        const profileInfo = this.profileInfo;

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
                                <li class="cate" id="cate-2">Báo cáo người dân</li>
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
                            <li class="cate" id="cate-2">Báo cáo người dân</li>
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
                                    Object.values(this.adInfo).map(function (districtInfo) {
                                        return Object.values(districtInfo.duong).map(function (streetInfo) {
                                            return Object.keys(streetInfo.diemqc).map(function (adTypeId) {
                                                let adSpotDetail = adDetail[adTypeId];
                                                let row = `
                                                    <tr class="ad-general">
                                                        <td>${i}</td>
                                                        <td>${streetInfo.name}, P. ${districtInfo.name}</td>
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
                                                                            "phuong": districtInfo.name
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
                                    }).join('')
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
        }
        else {
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
                                <li class="cate" id="cate-1">Thông tin quảng cáo </li>
                                <li class="tb-active cate" id="cate-2">Báo cáo người dân</li>
                            </ul>
                            <table class="table table-sm">
                                <thead>
                                    <tr class="ad-general-header">
                                        <th scope="col">STT</th>
                                        <th scope="col">Thời Điểm Gửi</th>
                                        <th scope="col">Địa Điểm</th>
                                        <th scope="col">Hình Thức Báo Cáo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${
                                        Object.values(this.repInfo).map(function (repInfo){
                                            return Object.values(repInfo.duong).map(function (repDetail) {
                                                    let row =` 
                                                    <tr class="ad-general">
                                                        <td>${i}</td>
                                                        <td>${repDetail.date}</td>
                                                        <td>${repDetail.name}, ${repInfo.name}</td>
                                                        <td>${repDetail.type}</td>
                                                        <td>
                                                            <button id="btn-chitiet">
                                                                <p  style="display: none">${repDetail.type}</p>
                                                                <p  style="display: none">${repDetail.user_name}</p>
                                                                <p  style="display: none">${repDetail.email}</p>
                                                                <p  style="display: none">${repDetail.phone}</p>
                                                                <p  style="display: none">${repDetail.url}</p>
                                                                <p  style="display: none">${repDetail.street_num}, Đ. ${repDetail.name}, ${repInfo.name}</p>
                                                                <p  style="display: none">${repDetail.content}</p>
                                                                Chi Tiet
                                                            </button>
                                                        </td>
                                                    `;
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
        }
        root.appendChild(main);
        this.event();
        this.redirectToAdInfoPage(ID);
        this.showModal();
    },

    showModal: function () {

        function renderModal(type, senderName, email, phone, url, addr, content){
            return `
            <div class="modal fade" id="ReportForCitizens" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl" role="document" style="width: 70%;">
                    <div class="modal-content">
                        
                        <div class="modal-body">
                            <div class="container-fluid d-flex flex-column">
                                <div class="container-fluid mb-1">
                                    <img src="/assets/chung/icon/CloseBtn.svg" alt="Close" style="float: right;" data-bs-dismiss="modal">
                                    <span class="text-primary fw-semibold fs-2" style="float: right; margin-right: 1em;">
                                        ${type}                                  
                                    </span>
                                </div>

                                <div class="container-fluid px-1 py-0">
                                    <div class="d-flex flex-row justify-content-between " style="margin-bottom: 8px;">
                                        <img src="${url}" alt="Anh Vi Pham" class="object-fit-cover w-50">
                                        <div class="w-50 d-flex flex-column mx-2" style="min-width: 50%;">
                                            <p class="fs-3 fw-bold lh-base m-0 text-primary mb-1">Người Gửi:</p>
                                            <div class="container d-flex flex-column">
                                                <p class="fs-4 lh-base m-0 my-3"><span class="text-primary mx-3">Họ Tên:</span> ${senderName}</p>
                                                <p class="fs-4 lh-base m-0 my-3"><span class="text-primary mx-3">Email:</span> ${email}</p>
                                                <p class="fs-4 lh-base m-0 my-3"><span class="text-primary mx-3">SĐT liên lạc :</span> ${phone}</p>
                                                <p class="fs-4 lh-base m-0 my-3"><span class="text-primary mx-3">Địa Chỉ:</span> ${addr}</p>
                                                <p class="fs-4 lh-base m-0 my-3"><span class="text-primary mx-3">Nội Dung: </span> ${content}</p>
                                            </div>
                                            
                                        </div>                         
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        var x = document.querySelector("#root>main").firstElementChild.querySelectorAll("#btn-chitiet");

        const fetchData = function (type, senderName, email, phone, url, addr, content) {
            var y = document.querySelector("#root");
            
            if (document.getElementById("ReportForCitizens") != null) {
                document.getElementById("ReportForCitizens").remove();
            }

            var forModal = document.createElement("div");
            forModal.innerHTML = renderModal(type, senderName, email, phone, url, addr, content);
            y.appendChild(forModal);
        }

        for (let i = 0; i < x.length; i++) {
            x.item(i).addEventListener("click", function () {
                let type= this.children[0].innerText;
                let senderName = this.children[1].innerText;
                let email = this.children[2].innerText;
                let phone = this.children[3].innerText;
                let url= this.children[4].innerText;
                let addr = this.children[5].innerText;
                let content = this.children[6].innerText;

                //console.log(adSpotDetalID, adSpotDetalName, adAddr, adInfo);
                fetchData(type, senderName, email, phone, url, addr, content);
                var myModal = new bootstrap.Modal(document.getElementById('ReportForCitizens'), {
                    backdrop: 'static',
                    keyboard: false,
                
                });
                myModal.show();
            });
        }

    },
    redirectToAdInfoPage : (ID) => {
        function redirectToAdInfoPage(adTypeId, adTypeName, adAddr, adInfo, profileInfo) {
            let adData = {
                "adTypeId": adTypeId,
                "adTypeName": adTypeName,
                "adAddr": adAddr,
                "adInfo": adInfo,
                "profileInfo": profileInfo,
            }
            sessionStorage.setItem('adPageData', JSON.stringify(adData));
            sessionStorage.setItem('selectedRenderID', ID); // Store the current render ID
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

                //console.log(adSpotDetalID, adSpotDetalName, adAddr, adInfo);
                redirectToAdInfoPage(adSpotDetalID, adSpotDetalName, adAddr, adInfo, profileInfo);
            });
        }
    
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

    start : async function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        await this.fetchData(); // Xong sẽ fetch mấy cái data      
        const storedRenderID = sessionStorage.getItem('selectedRenderID');
        if (storedRenderID !== null) {
            this.render(parseInt(storedRenderID));
        } else {
            this.render(3); // Default render ID
        } 
    }
}

trangchu.start();
