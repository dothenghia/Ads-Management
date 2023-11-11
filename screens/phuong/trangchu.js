// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/canbo/Header.js';
import SideBar from '/components/canbo/SideBar.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "subsystem": "Quận", "subsystem_area": "Bình Thạnh"}
        this.sidebarHrefs = ["#", "#", "#"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
    },

    fetchData : function() {

    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `

        let main = document.createElement("main");
        main.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <div class="row flex-grow-1">
                    <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                        ${
                            SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 0)
                        }
                    </div>
                    <div id="content" class="col-md-11 col-12 bg-light">
                        
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);
        
        const bounds = [
            [106.67515433595786, 10.78114502381695],     // Southwest coords
            [106.7597736135235, 10.845061592802505]    // Northest coords
        ]
        let map = new mapboxgl.Map({
            container: 'content',
            zoom: 10,
            style:
            'mapbox://styles/mapbox/streets-v11',
            accessToken: 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ',
            maxBounds: bounds
        });
        map.addControl(
            new mapboxgl.NavigationControl({showCompass: false}),
            'bottom-left'
        );
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();