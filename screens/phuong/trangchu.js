// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/phuong/Header.js';
import SideBar from '/components/phuong/SideBar.js';

const trangchu = {
    init : function() {

    },

    fetchData : function() {

    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header()}
        `

        let main = document.createElement("main");
        main.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <div class="row flex-grow-1">
                    <div class="col-lg-1 col-sm-0 p-0 shadow-sm">
                        ${SideBar()}
                    </div>
                    <div class="col-lg-11 col-sm-12 bg-light">
                        
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