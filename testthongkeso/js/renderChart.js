
// ========== Colors
let tgspColor = '#DC3545';
let dkndColor = '#F6BA45';
let dgykColor = '#F448CE';
let gdtmColor = '#9747FF';

let dangxulyColor = '#FF6400';
let daxulyColor = '#41AF79';
let tuchoiColor = '#DC3545';

// @ ========== Tổng số Báo cáo theo THỜI GIAN
function renderBigTSBCChart(chartData) {
    let tsbcData = {
        labels: ['TGSP', 'ĐKND', 'ĐGYK', 'GĐTM'],
        datasets: [{
            label: 'Số lượng báo cáo',
            data: [chartData.tgsp, chartData.dknd, chartData.dgyk, chartData.gdtm],
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
    document.querySelector('.tsbc-text').innerHTML = chartData.tgsp + chartData.dknd + chartData.dgyk + chartData.gdtm;
}

// @ ========== Tố giác sai phạm
function renderMiniTGSPChart(chartData) {
    let tgspData = {
        datasets: [{
            data: [chartData.dangxuly, chartData.daxuly, chartData.tuchoi],
            backgroundColor: [dangxulyColor, daxulyColor, tuchoiColor],
            hoverOffset: 10
        }]
    };
    var tgspCanvas = document.getElementById('tsbc-canvas-tgsp');
    const spacingValue = (chartData.dangxuly === 0 && chartData.daxuly === 0) || (chartData.dangxuly === 0 && chartData.tuchoi === 0) || (chartData.daxuly === 0 && chartData.tuchoi === 0) ? 0 : 2;

    var myPieChart = new Chart(tgspCanvas, {
        type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
        data: tgspData, // Data
        options: {
            responsive: true,
            borderWidth: 10,
            borderColor: 'transparent',
            borderRadius: 4,
            spacing: spacingValue,
            cutout: 45,
        }
    });
    document.querySelector('#tsbc-canvas-tgsp + .tsbc-mini-text').innerHTML = chartData.dangxuly + chartData.daxuly + chartData.tuchoi;
    document.querySelector('.tgsp-text.dangxuly1 span').innerHTML = chartData.dangxuly;
    document.querySelector('.tgsp-text.daxuly1 span').innerHTML = chartData.daxuly;
    document.querySelector('.tgsp-text.tuchoi1 span').innerHTML = chartData.tuchoi;
}

// @ ========== Đăng ký nội dung
function renderMiniDKNDChart(chartData) {
    let dkndData = {
        datasets: [{
            data: [chartData.dangxuly, chartData.daxuly, chartData.tuchoi],
            backgroundColor: [dangxulyColor, daxulyColor, tuchoiColor],
            hoverOffset: 10
        }]
    };
    var dkndCanvas = document.getElementById('tsbc-canvas-dknd');
    const spacingValue = (chartData.dangxuly === 0 && chartData.daxuly === 0) || (chartData.dangxuly === 0 && chartData.tuchoi === 0) || (chartData.daxuly === 0 && chartData.tuchoi === 0) ? 0 : 2;
    var myPieChart = new Chart(dkndCanvas, {
        type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
        data: dkndData, // Data
        options: {
            responsive: true,
            borderWidth: 10,
            borderColor: 'transparent',
            borderRadius: 4,
            spacing: spacingValue,
            cutout: 45,
        }
    });
    document.querySelector('#tsbc-canvas-dknd + .tsbc-mini-text').innerHTML = chartData.dangxuly + chartData.daxuly + chartData.tuchoi;
    document.querySelector('.dknd-text.dangxuly1 span').innerHTML = chartData.dangxuly;
    document.querySelector('.dknd-text.daxuly1 span').innerHTML = chartData.daxuly;
    document.querySelector('.dknd-text.tuchoi1 span').innerHTML = chartData.tuchoi;
}

// @ ========== Đóng góp ý kiến
function renderMiniDGYKChart(chartData) {
    let dgykData = {
        datasets: [{
            data: [chartData.dangxuly, chartData.daxuly, chartData.tuchoi],
            backgroundColor: [dangxulyColor, daxulyColor, tuchoiColor],
            hoverOffset: 10
        }]
    };
    var dgykCanvas = document.getElementById('tsbc-canvas-dgyk');
    const spacingValue = (chartData.dangxuly === 0 && chartData.daxuly === 0) || (chartData.dangxuly === 0 && chartData.tuchoi === 0) || (chartData.daxuly === 0 && chartData.tuchoi === 0) ? 0 : 2;
    var myPieChart = new Chart(dgykCanvas, {
        type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
        data: dgykData, // Data
        options: {
            responsive: true,
            borderWidth: 10,
            borderColor: 'transparent',
            borderRadius: 4,
            spacing: spacingValue,
            cutout: 45,
        }
    });
    document.querySelector('#tsbc-canvas-dgyk + .tsbc-mini-text').innerHTML = chartData.dangxuly + chartData.daxuly + chartData.tuchoi;
    document.querySelector('.dgyk-text.dangxuly1 span').innerHTML = chartData.dangxuly;
    document.querySelector('.dgyk-text.daxuly1 span').innerHTML = chartData.daxuly;
    document.querySelector('.dgyk-text.tuchoi1 span').innerHTML = chartData.tuchoi;
}

// @ ========== Giải đáp thắc mắc
function renderMiniGDTMChart(chartData) {
    let gdtmData = {
        datasets: [{
            data: [chartData.dangxuly, chartData.daxuly, chartData.tuchoi],
            backgroundColor: [dangxulyColor, daxulyColor, tuchoiColor],
            hoverOffset: 10
        }]
    };
    var gdtmCanvas = document.getElementById('tsbc-canvas-gdtm');
    const spacingValue = (chartData.dangxuly === 0 && chartData.daxuly === 0) || (chartData.dangxuly === 0 && chartData.tuchoi === 0) || (chartData.daxuly === 0 && chartData.tuchoi === 0) ? 0 : 2;
    var myPieChart = new Chart(gdtmCanvas, {
        type: 'doughnut', // Type : 'doughnut', 'pie', 'bar', 'line', 'radar', 'polarArea', 'bubble', 'scatter'
        data: gdtmData, // Data
        options: {
            responsive: true,
            borderWidth: 10,
            borderColor: 'transparent',
            borderRadius: 4,
            spacing: spacingValue,
            cutout: 45,
        }
    });
    document.querySelector('#tsbc-canvas-gdtm + .tsbc-mini-text').innerHTML = chartData.dangxuly + chartData.daxuly + chartData.tuchoi;
    document.querySelector('.gdtm-text.dangxuly1 span').innerHTML = chartData.dangxuly;
    document.querySelector('.gdtm-text.daxuly1 span').innerHTML = chartData.daxuly;
    document.querySelector('.gdtm-text.tuchoi1 span').innerHTML = chartData.tuchoi;
}

export {
    renderBigTSBCChart,
    renderMiniTGSPChart,
    renderMiniDKNDChart,
    renderMiniDGYKChart,
    renderMiniGDTMChart
}