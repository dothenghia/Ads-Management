const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);


/*
Thay vì bình thường phải viết như này:
    var header = document.getElementById("header");
    hoặc
    var header = document.querySelector("#header");

Thì có thể viết ngắn gọn như này:
    var header = $i("header");
    hoặc
    var header = $("#header");
*/