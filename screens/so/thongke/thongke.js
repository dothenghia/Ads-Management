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

const trangchu = {
    
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["../quanly/quanly.html", "../nhansu/nhansu.html","#", "../kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["quanly_ic_normal.svg", "nhansu_ic_normal.svg", "thongke_ic_active.svg","kiemduyet_ic_normal.svg"];
        this.sidebarLabels = ["Quản lý", "Nhân Sự", "Thống Kê", "Kiểm duyệt"]
        this.reportStat = {};
    },

    fetchData : async function() {
        

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
                            
                            <div class="container-fluid d-flex flex-row-1">
                                <canvas id="myChart" class="p-1"></canvas>
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
                                SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 0)
                            }
                        </div>
                        <div id="content" class="container-fluid text-start rounded-3" style="border: 2px solid rgb(43, 119, 208); width: 400px">
                            <div>
                                <p class="fs-5 fw-semibold">Thống Kê Cách Thức Xử Lý</p>
                            </div>
                            
                            <div class="container-fluid d-flex flex-row-1">
                                <canvas id="myChart" class="p-1"></canvas>
                                <img src="/assets/chung/icon/trangke.svg" alt="Next" id="btn-next">
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        root.appendChild(main);
        this.renderChart();
        // Khi nhấn next đổi sang statistic khác
        sessionStorage.setItem('selectedRenderID', ID);
    },

    renderChart : function() {
        //let ctx =  document.querySelector("#root>main").firstElementChild.getElementById("myChart").getContext("2d");
        let ctx =  document.querySelector("#root>main").firstElementChild.querySelector("canvas#myChart").getContext("2d");
        let myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Quý 1",
                "Quý 2",
                "Quý 3",
            ],
            datasets: [
                {
                    label: "Quận 1",
                    data: [4, 9, 3],
                    backgroundColor: "rgb(91, 155, 213)",
                },
                {
                    label: "Quận 11",
                    data: [3, 2, 5],
                    backgroundColor: "rgb(114, 225, 209)",
                },
            ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    let btn_next = document.querySelector("img#btn-next");
    btn_next.addEventListener("click", () => {
        console.log("click");
    });
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
            this.render(0); // Default render ID
        } 
    }
}

trangchu.start();
