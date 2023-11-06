// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/chung/Header.js';
import MarkerQH from '/components/dan/MarkerQH.js';



const trangchu = {
    init: function () {

    },

    fetchData: async function () {

    },

    render: function () {
        $i('main').innerHTML = `
            ${Header()}

            
        `
    },


    start: function () {
        this.init();
        this.fetchData();
        this.render();
    }
}

trangchu.start();
