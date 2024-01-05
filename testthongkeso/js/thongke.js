// ========== Colors
let tgspColor = '#DC3545';
let dkndColor = '#F6BA45';
let dgykColor = '#F448CE';
let gdtmColor = '#9747FF';

let dangxulyColor = '#FF6400';
let daxulyColor = '#41AF79';
let tuchoiColor = '#DC3545';

// ========== Tổng số Báo cáo theo THỜI GIAN
let tsbcData = {
    labels: ['TGSP', 'ĐKND', 'ĐGYK', 'GĐTM'],
    datasets: [{
        label: 'Số lượng báo cáo',
        data: [400, 200, 300, 100],
        backgroundColor: [tgspColor, dkndColor, dgykColor, gdtmColor],
        hoverOffset: 20
    }]
};

var tsbcCanvas = document.getElementById('tsbc-canvas');

var myPieChart = new Chart(tsbcCanvas, {
    type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
    data: tsbcData, // Data
    options: {
        responsive: true,
        borderWidth: 14,
        borderColor: 'transparent',
        borderRadius: 12,
        spacing: 8,
        cutout: 110,
    }
});

// @ ========== Tố giác sai phạm
let tgspData = {
    datasets: [{
        data: [100, 200, 50],
        backgroundColor: [dangxulyColor, daxulyColor, tuchoiColor],
        hoverOffset: 10
    }]
};
var tgspCanvas = document.getElementById('tsbc-canvas-tgsp');
var myPieChart = new Chart(tgspCanvas, {
    type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
    data: tgspData, // Data
    options: {
        responsive: true,
        borderWidth: 10,
        borderColor: 'transparent',
        borderRadius: 6,
        spacing: 4,
        cutout: 45,
    }
});
// @ ========== Đăng ký nội dung
let dkndData = {
    datasets: [{
        data: [100, 200, 50],
        backgroundColor: [dangxulyColor, daxulyColor, tuchoiColor],
        hoverOffset: 10
    }]
};
var dkndCanvas = document.getElementById('tsbc-canvas-dknd');
var myPieChart = new Chart(dkndCanvas, {
    type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
    data: dkndData, // Data
    options: {
        responsive: true,
        borderWidth: 10,
        borderColor: 'transparent',
        borderRadius: 6,
        spacing: 4,
        cutout: 45,
    }
});
// @ ========== Đóng góp ý kiến
let dgykData = {
    datasets: [{
        data: [100, 200, 50],
        backgroundColor: [dangxulyColor, daxulyColor, tuchoiColor],
        hoverOffset: 10
    }]
};
var dgykCanvas = document.getElementById('tsbc-canvas-dgyk');
var myPieChart = new Chart(dgykCanvas, {
    type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
    data: dgykData, // Data
    options: {
        responsive: true,
        borderWidth: 10,
        borderColor: 'transparent',
        borderRadius: 6,
        spacing: 4,
        cutout: 45,
    }
});
// @ ========== Giải đáp thắc mắc
let gdtmData = {
    datasets: [{
        data: [100, 200, 50],
        backgroundColor: [dangxulyColor, daxulyColor, tuchoiColor],
        hoverOffset: 10
    }]
};
var gdtmCanvas = document.getElementById('tsbc-canvas-gdtm');
var myPieChart = new Chart(gdtmCanvas, {
    type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
    data: gdtmData, // Data
    options: {
        responsive: true,
        borderWidth: 10,
        borderColor: 'transparent',
        borderRadius: 6,
        spacing: 4,
        cutout: 45,
    }
});


