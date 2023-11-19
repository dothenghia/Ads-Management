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
                        <div id="add-button">
                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#addMenu" aria-controls="addMenu">
                            <img src="/assets/chung/icon/plus-circle.svg" alt="Add">
                        </button>
                        </div>
                        <div class="offcanvas offcanvas-bottom" tabindex="51" id="addMenu">
                                <div class="offcanvas-header p-0">
                                </div>
                                <div class="offcanvas-body small position-relative">
                                    <form id="addForm" class="">
                                      <div class="container d-flex justify-justify-content-between align-items-center">
                                          <div class="col text-center px-3">
                                            <h5>Họ tên</h5>
                                            <div> 
                                              <input type="text" class="form-control border-1 rounded-3 border-primary" name="" id="hoTenInput"
                                                aria-describedby="helpId" placeholder="Enter" required> 
                                            </div>
                                          </div>
                                          <div class="col text-center px-3">
                                            <h5>Tài Khoản</h5>
                                            <div>
                                              <input type="text" class="form-control border-1 rounded-3 border-primary" name="" id="taiKhoanInput"
                                                aria-describedby="helpId" placeholder="Enter" required>
                                            </div>
                                          </div>
                                          <div class="col text-center px-3">
                                            <h5>Mật khẩu</h5>
                                            <div>
                                              <input type="text" class="form-control border-1 rounded-3 border-primary" name="" id="matKhauInput"
                                                aria-describedby="helpId" placeholder="Enter" required>
                                            </div>
                                          </div>
                                      </div>
                                      <div class="container position-absolute d-flex bottom-0 end-0 justify-content-center" id="addnav">
                                        <div class=""><button type="button" data-bs-dismiss="offcanvas" aria-label="Close">Đóng</button></div>
                                        <div class=""><button type="submit" data-bs-dismiss="offcanvas" id="addSubmit">Xác nhận</div
                                      </div>
                                    </form>

                                </div>

                </div>
                
            </div>
            
        </div>
    `;
    root.appendChild(main);
    // Listen to filter button click
    const adminRole = this.profileInfo.role;
    document.getElementById("addForm").addEventListener("submit", (e) => {
      //prevent for demos, remove this after import backend
      e.preventDefault();
       // Get values from input fields
      const hoTenValue = document.getElementById("hoTenInput").value;
      const taiKhoanValue = document.getElementById("taiKhoanInput").value; //!checking same username
      const matKhauValue = document.getElementById("matKhauInput").value;

      // Add to database 
      console.log("Họ tên:", hoTenValue);
      console.log("Tài Khoản:", taiKhoanValue);
      console.log("Mật khẩu:", matKhauValue);
    });
  },


  start: async function () {
    this.init(); // Dô thì sẽ khởi tạo các state trước
    await this.fetchData(); // Xong sẽ fetch mấy cái data
    await this.render();
  },
};

trangchu.start();
