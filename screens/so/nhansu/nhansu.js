// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from "/components/canbo/Header.js";
import SideBar from "/components/canbo/SideBar.js";

// Import Functions
import getPersonnel from "/functions/canbo/getPersonnel.js";

const trangchu = {
  init: function () {
    this.profileInfo = {
      name: "Nguyễn Văn A",
      quan: "binhthanh",
      phuong: "3",
      role: "phuong",
      role_area: "3",
    };
    this.sidebarHrefs = [
      "/screens/so/quanly/quanly.html",
      "#",
      "/screens/so/thongke/thongke.html",
      "../kiemduyet/kiemduyet.html",
    ];
    this.sidebarIcons = [
      "quanly_icon.svg",
      "nhansu_icon.svg",
      "thongke_icon.svg",
      "kiemduyet_icon.svg",
    ];
    this.sidebarLabels = ["Quản lý", "Nhân Sự", "Thống Kê", "Kiểm duyệt"];
    this.personnel = {};
  },

  fetchData: async function () {
    // Fetch persoonel info
    const personnel = await getPersonnel();
    this.personnel = personnel;
  },

  render: function () {
    const root = $i("root");
    root.innerHTML = `
            ${Header(this.profileInfo)}
        `;
    if (document.querySelector("#root>main") != undefined) {
      //console.log(document.querySelector("#root>main"));
      document.querySelector("#root>main").remove();
    }
    let main = document.createElement("main");
    let i = 1;
    main.innerHTML = `
        <div class="container-fluid d-flex flex-column">
            <div class="row flex-grow-1">
                <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                    ${SideBar(
                      this.sidebarIcons,
                      this.sidebarLabels,
                      this.sidebarHrefs,
                      1
                    )}
                </div>
                <div id="content" class="tb col-md-11 col-12">
                    <div id="contentOverlay" style="display: none"></div>
                    <ul id="category">
                        <li class="tb-active cate" id="cate-0">Thông tin nhân viên</li>
                    </ul>
                    <table class="table ">
                        <thead>
                            <tr class="personnel-info-header t  r">
                                <th scope="col" class="col-1">STT</th>
                                <th scope="col" class="col-1">Họ tên</th>
                                <th scope="col" class="col-2">Chức vụ</th>
                                <th scope="col" class="col-2">Khu vực</th>
                                <th scope="col" class="col-1">Tài Khoản</th>
                                <th scope="col" class="col-1">Mật khẩu <button onclick="edit()" class="align-self-end border-0 bg-transparent" ><i class="bi bi-pencil-square"></i></button></th>
                            </tr>
                        </thead>
                        <form action ="" class="">
                            <tbody class="">
                                    ${Object.values(this.personnel)
                                      .map(function (personnelInfo, i) {
                                        let hier = {
                                          value: personnelInfo.roleHierarchy,
                                        };
                                        let row = `
                                            <tr class="personnel-info text-center" id="personal-info-table">
                                                
                                                <td>${i}</td>
                                                <td>${personnelInfo.name}</td>
                                                <td>
                                                    <select id = "role_${i}" name="role" class="w-auto p-2 border rounded" onchange="resetArea(this, ${i})" required>
                                                        <option value="" selected disabled hidden>${
                                                          personnelInfo.role
                                                        }</option>
                                                        <option value="1">Cán bộ phường</option>
                                                        <option value="2">Cán bộ quận</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select id = "area_${i}" name="area" class="w-auto p-2 border rounded" required>
                                                    ${
                                                      hier.value == "1" //Cán bộ phường
                                                        ? `<option value="" selected disabled hidden>${personnelInfo.area}</option>
                                                        <option value="1">Phường 1</option>
                                                        <option value="2">Phường 2</option>`
                                                        : hier.value == "2" // Cán bộ quận
                                                        ? `<option value="" selected disabled hidden>${personnelInfo.area}</option>
                                                            <option value="1">Quận 1</option>
                                                            <option value="2">Quận 2</option>`
                                                        : "" // Phòng trường hợp thêm vào
                                                    }
                                                    </select>
                                                </td>
                                                <td>${personnelInfo.email}</td>
                                                <td>${
                                                  personnelInfo.password
                                                }</td>
                                            </tr>
                                        `;
                                        i++;
                                        return row;
                                      })
                                      .join("")}
                              
                            </tbody>
                            
                        </form>
                        
                    </table>
                      <div class= "buttons" >
                        <div id="add-button">
                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#addMenu" aria-controls="addMenu">
                            <img src="/assets/chung/icon/plus-circle.svg" alt="Add">
                        </button>
                        </div>
                      <div id="filter-button">
                              <button type="button" data-bs-toggle="offcanvas" data-bs-target="#filterMenu" aria-controls="filterMenu">
                                  <img src="/assets/chung/icon/boloc_icon.svg" alt="Filter">
                              </button>
                      </div>
                      
                    </div>
                    <div class="offcanvas offcanvas-bottom" tabindex="51" id="addMenu" aria-labelledby="offcanvasBottomLabel">
                    <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
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
                            <input type="submit" id="filterSubmit" value="" class="hidden">
                        </form>
                        <label for="filterSubmit">Lọc</label>
                    </div>
                    <div class="offcanvas offcanvas-bottom" tabindex="51" id="filterMenu" aria-labelledby="offcanvasBottomLabel">
                    <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
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
                            <input type="submit" id="filterSubmit" value="" class="hidden">
                        </form>
                        <label for="filterSubmit">Lọc</label>
                    </div>
                </div>
                
            </div>
            
        </div>
    `;
    root.appendChild(main);
  },


  start: async function () {
    this.init(); // Dô thì sẽ khởi tạo các state trước
    await this.fetchData(); // Xong sẽ fetch mấy cái data
    await this.render();
  },
};

trangchu.start();
