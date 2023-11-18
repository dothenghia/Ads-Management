// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/canbo/Header.js';
import SideBar from '/components/canbo/SideBar.js';

// Import Functions
import getDistrictInfo from '/functions/canbo/getDistrictInfo.js';
import getReportStatInfo from '/functions/canbo/getReportStats.js';

const trangchu = {
    
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["../quanly/quanly.html", "../nhansu/nhansu.html","#", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["quanly_ic_normal.svg", "nhansu_ic_normal.svg", "thongke_ic_active.svg","kiemduyet_ic_normal.svg"];
        this.sidebarLabels = ["Quản lý", "Nhân Sự", "Thống Kê", "Kiểm duyệt"]
        this.reportStat = {};
    },

    fetchData : async function() {
        
        var reportStat= await getReportStatInfo();
        this.reportStat = reportStat[0];

        this.render(0);
    },

    render : function(ID) {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `
        if (document.querySelector("#root>main") != undefined) { 
            //console.log(document.querySelector("#root>main"));
            document.querySelector("#root>main").remove() 
        }
        let main = document.createElement("main");
        if (ID == 0) {
            main.innerHTML = `
                <div class="container-fluid d-flex flex-column">
                    <div class="row flex-grow-1">
                        <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                            ${
                                SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 2)
                            }
                        </div>
                        <div id="content" class="container text-start rounded-3">
                            <div>
                                <p class="fs-5 fw-semibold" style="color: rgb(0, 101, 255);">Thống Kê Báo Cáo</p>
                            </div>
                            
                            <div class="container-fluid d-flex flex-row p-2">
                                <div class="container-fluid px-3">
                                    <canvas id="myChart"></canvas>
                                </div>
                                <img src="/assets/chung/icon/trangke.svg" alt="Next" id="btn-next">
                            </div>
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
                                SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, )
                            }
                        </div>
                        <div id="content" class="container-fluid text-start rounded-3">
                            <div>
                                <p class="fs-5 fw-semibold"  style="color: rgb(0, 101, 255);">Thống Kê Cách Thức Xử Lý</p>
                            </div>
                            
                            <div class="container-fluid d-flex flex-row p-2">
                                <img src="/assets/chung/icon/trangcu.svg" alt="Back" id="btn-back">
                                <div class="container-fluid px-3">
                                    <canvas id="myChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        root.appendChild(main);
        this.event();
        this.renderChart(ID);
        // Khi nhấn next đổi sang statistic khác
        sessionStorage.setItem('selectedRenderID', ID);
    },

    renderChart : function(ID) {
        
        // Query chart
        let ctx =  document.querySelector("#root>main").firstElementChild.querySelector("canvas#myChart").getContext("2d");

        var i = 0; // Count for colorSet
        var colorSet = ["rgb(91, 155, 213)", "rgb(114, 225, 209)", "rgb(42, 96, 65)", "rgb(254, 127, 45)", "rgb(31, 1, 185)"]

        // Label and dataset for chart - Thống kê báo cáo
        var labelID0 = ["Quý 1", "Quý 2", "Quý 3"]; 
        var dataSetsID0 = Object.values(this.reportStat).map(function(values) {
            i++;
            return {
                label: values.name,
                data: [values.quy1, values.quy2, values.quy3],
                backgroundColor: colorSet[i - 1],
            }
        });
        // Label and dataset for chart - Thống kê cách thức xử lý
        var labelID1 = ["Gò Vấp", "Quận 1"];
        var dataSetsID1 = [
            {
                label: "Từ Chối Yêu Cầu",
                data: [10, 50],
                backgroundColor: colorSet[3],
            },
            {
                label: "Cảnh báo Vi Phạm",
                data: [5, 15],
                backgroundColor: colorSet[0],
            },
            {
                label: "Xử Lý Vi Phạm",
                data: [6, 30],
                backgroundColor: colorSet[4],
            }
        ];
        // Generate Chart
        let myChart = new Chart(ctx, {
        type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ID == 0 ? labelID0 : labelID1,
            datasets: ID == 0 ? dataSetsID0 : dataSetsID1,
        },
        options: { // Set yAxis begin at 0
            animation: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });

    },

    event: function () {
        var x = document.querySelector("#root>main").firstElementChild
        let btn_next = x.querySelector("img#btn-next");
        if (btn_next != null) {
            btn_next.addEventListener("click", () => {
                trangchu.render(1);
            });
        }
        let btn_back = x.querySelector("img#btn-back");
        if (btn_back != null) {
            btn_back.addEventListener("click", () => {
                trangchu.render(0);
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
            this.render(0); // Default render ID
        } 
    }
}

trangchu.start();
