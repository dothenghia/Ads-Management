
import {
    renderBigTSBCChart,
    renderMiniTGSPChart,
    renderMiniDKNDChart,
    renderMiniDGYKChart,
    renderMiniGDTMChart,

    renderBarChart,
    renderPhuongChart
} from "./renderChart.js";

const thongke = {
    // ====== Hàm Khởi tạo các State
    init: function () {
        this.reportData = [];
        this.tsbcOption = { type: 'all', year: null, month: null, date: null };

        this.tsbcChart = null;
        this.tgspChart = null;
        this.dkndChart = null;
        this.dgykChart = null;
        this.gdtmChart = null;

        this.tsbcData = { tgsp: 0, dknd: 0, dgyk: 0, gdtm: 0 }
        this.tgspData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
        this.dkndData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
        this.dgykData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
        this.gdtmData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
    },

    // ====== Fetch dữ liệu các BC
    fetchData: async function () {
        const response = await fetch('https://adsmap-group07.onrender.com/dan/dsbc');
        thongke.reportData = await response.json();
    },

    // ====== calculateData
    calculateData: function () {
        // * ==================== Tổng số Báo cáo theo THỜI GIAN ====================
        thongke.tsbcData = { tgsp: 0, dknd: 0, dgyk: 0, gdtm: 0 }
        thongke.reportData.forEach(item => {
            switch (thongke.tsbcOption.type) {
                case 'all':
                    if (item.reportForm === "Tố giác sai phạm") thongke.tsbcData.tgsp++;
                    if (item.reportForm === "Đăng ký nội dung") thongke.tsbcData.dknd++;
                    if (item.reportForm === "Đóng góp ý kiến") thongke.tsbcData.dgyk++;
                    if (item.reportForm === "Giải đáp thắc mắc") thongke.tsbcData.gdtm++;
                    break;
                case 'year':
                    if (item.reportForm === "Tố giác sai phạm" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.tgsp++;
                    if (item.reportForm === "Đăng ký nội dung" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.dknd++;
                    if (item.reportForm === "Đóng góp ý kiến" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.dgyk++;
                    if (item.reportForm === "Giải đáp thắc mắc" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.gdtm++;
                    break;
                case 'month':
                    if (item.reportForm === "Tố giác sai phạm" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.tgsp++;
                    if (item.reportForm === "Đăng ký nội dung" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.dknd++;
                    if (item.reportForm === "Đóng góp ý kiến" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.dgyk++;
                    if (item.reportForm === "Giải đáp thắc mắc" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.gdtm++;
                    break;
                case 'date':
                    if (item.reportForm === "Tố giác sai phạm" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.tgsp++;
                    if (item.reportForm === "Đăng ký nội dung" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.dknd++;
                    if (item.reportForm === "Đóng góp ý kiến" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.dgyk++;
                    if (item.reportForm === "Giải đáp thắc mắc" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tsbcData.gdtm++;
                    break;
            }
        });

        // * ==================== Tố giác sai phạm ====================
        thongke.tgspData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
        this.reportData.forEach(item => {
            if (item.reportForm === "Tố giác sai phạm") {
                switch (thongke.tsbcOption.type) {
                    case 'all':
                        if (item.status === "Đang xử lý") thongke.tgspData.dangxuly++;
                        if (item.status === "Đã xử lý") thongke.tgspData.daxuly++;
                        if (item.status === "Từ chối") thongke.tgspData.tuchoi++;
                        break;
                    case 'year':
                        if (item.status === "Đang xử lý" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.tgspData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.tgspData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.tgspData.tuchoi++;
                        break;
                    case 'month':
                        if (item.status === "Đang xử lý" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tgspData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tgspData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tgspData.tuchoi++;
                        break;
                    case 'date':
                        if (item.status === "Đang xử lý" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tgspData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tgspData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.tgspData.tuchoi++;
                        break;
                }
            }
        });

        // * ==================== Đăng ký nội dung ====================
        thongke.dkndData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
        this.reportData.forEach(item => {
            if (item.reportForm === "Đăng ký nội dung") {
                switch (thongke.tsbcOption.type) {
                    case 'all':
                        if (item.status === "Đang xử lý") thongke.dkndData.dangxuly++;
                        if (item.status === "Đã xử lý") thongke.dkndData.daxuly++;
                        if (item.status === "Từ chối") thongke.dkndData.tuchoi++;
                        break;
                    case 'year':
                        if (item.status === "Đang xử lý" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.dkndData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.dkndData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.dkndData.tuchoi++;
                        break;
                    case 'month':
                        if (item.status === "Đang xử lý" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dkndData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dkndData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dkndData.tuchoi++;
                        break;
                    case 'date':
                        if (item.status === "Đang xử lý" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dkndData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dkndData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dkndData.tuchoi++;
                        break;
                }
            }
        });

        // * ==================== Đóng góp ý kiến ====================
        thongke.dgykData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
        this.reportData.forEach(item => {
            if (item.reportForm === "Đóng góp ý kiến") {
                switch (thongke.tsbcOption.type) {
                    case 'all':
                        if (item.status === "Đang xử lý") thongke.dgykData.dangxuly++;
                        if (item.status === "Đã xử lý") thongke.dgykData.daxuly++;
                        if (item.status === "Từ chối") thongke.dgykData.tuchoi++;
                        break;
                    case 'year':
                        if (item.status === "Đang xử lý" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.dgykData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.dgykData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.dgykData.tuchoi++;
                        break;
                    case 'month':
                        if (item.status === "Đang xử lý" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dgykData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dgykData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dgykData.tuchoi++;
                        break;
                    case 'date':
                        if (item.status === "Đang xử lý" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dgykData.dangx
                        if (item.status === "Đã xử lý" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dgykData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.dgykData.tuchoi++;
                        break;
                }
            }
        });

        // * ==================== Giải đáp thắc mắc ====================
        thongke.gdtmData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
        this.reportData.forEach(item => {
            if (item.reportForm === "Giải đáp thắc mắc") {
                switch (thongke.tsbcOption.type) {
                    case 'all':
                        if (item.status === "Đang xử lý") thongke.gdtmData.dangxuly++;
                        if (item.status === "Đã xử lý") thongke.gdtmData.daxuly++;
                        if (item.status === "Từ chối") thongke.gdtmData.tuchoi++;
                        break;
                    case 'year':
                        if (item.status === "Đang xử lý" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.tuchoi++;
                        break;
                    case 'month':
                        if (item.status === "Đang xử lý" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.dangxuly++;
                        if (item.status === "Đã xử lý" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.tuchoi++;
                        break;
                    case 'date':
                        if (item.status === "Đang xử lý" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.dang
                        if (item.status === "Đã xử lý" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.daxuly++;
                        if (item.status === "Từ chối" && item.time.includes(`Ngày ${thongke.tsbcOption.date} tháng ${thongke.tsbcOption.month} năm ${thongke.tsbcOption.year}`)) thongke.gdtmData.tuchoi++;
                        break;
                }
            }
        });
    },

    // ====== Render UI
    renderUI: function () {
        thongke.tsbcChart = renderBigTSBCChart(thongke.tsbcData);
        thongke.tgspChart = renderMiniTGSPChart(thongke.tgspData);
        thongke.dkndChart = renderMiniDKNDChart(thongke.dkndData);
        thongke.dgykChart = renderMiniDGYKChart(thongke.dgykData);
        thongke.gdtmChart = renderMiniGDTMChart(thongke.gdtmData);
    },

    // ====== Update Chart
    updateChart: function () {
        thongke.tsbcChart.config.data.datasets[0].data = [thongke.tsbcData.tgsp, thongke.tsbcData.dknd, thongke.tsbcData.dgyk, thongke.tsbcData.gdtm]
        thongke.tsbcChart.update();
        document.querySelector('.tsbc-text').innerHTML = thongke.tsbcData.tgsp + thongke.tsbcData.dknd + thongke.tsbcData.dgyk + thongke.tsbcData.gdtm;

        thongke.tgspChart.config.data.datasets[0].data = [thongke.tgspData.dangxuly, thongke.tgspData.daxuly, thongke.tgspData.tuchoi]
        thongke.tgspChart.update();
        document.querySelector('#tsbc-canvas-tgsp + .tsbc-mini-text').innerHTML = thongke.tgspData.dangxuly + thongke.tgspData.daxuly + thongke.tgspData.tuchoi;
        document.querySelector('.tgsp-text.dangxuly1 span').innerHTML = thongke.tgspData.dangxuly;
        document.querySelector('.tgsp-text.daxuly1 span').innerHTML = thongke.tgspData.daxuly;
        document.querySelector('.tgsp-text.tuchoi1 span').innerHTML = thongke.tgspData.tuchoi;

        thongke.dkndChart.config.data.datasets[0].data = [thongke.dkndData.dangxuly, thongke.dkndData.daxuly, thongke.dkndData.tuchoi]
        thongke.dkndChart.update();
        document.querySelector('#tsbc-canvas-dknd + .tsbc-mini-text').innerHTML = thongke.dkndData.dangxuly + thongke.dkndData.daxuly + thongke.dkndData.tuchoi;
        document.querySelector('.dknd-text.dangxuly1 span').innerHTML = thongke.dkndData.dangxuly;
        document.querySelector('.dknd-text.daxuly1 span').innerHTML = thongke.dkndData.daxuly;
        document.querySelector('.dknd-text.tuchoi1 span').innerHTML = thongke.dkndData.tuchoi;

        thongke.dgykChart.config.data.datasets[0].data = [thongke.dgykData.dangxuly, thongke.dgykData.daxuly, thongke.dgykData.tuchoi]
        thongke.dgykChart.update();
        document.querySelector('#tsbc-canvas-dgyk + .tsbc-mini-text').innerHTML = thongke.dgykData.dangxuly + thongke.dgykData.daxuly + thongke.dgykData.tuchoi;
        document.querySelector('.dgyk-text.dangxuly1 span').innerHTML = thongke.dgykData.dangxuly;
        document.querySelector('.dgyk-text.daxuly1 span').innerHTML = thongke.dgykData.daxuly;
        document.querySelector('.dgyk-text.tuchoi1 span').innerHTML = thongke.dgykData.tuchoi;

        thongke.gdtmChart.config.data.datasets[0].data = [thongke.gdtmData.dangxuly, thongke.gdtmData.daxuly, thongke.gdtmData.tuchoi]
        thongke.gdtmChart.update();
        document.querySelector('#tsbc-canvas-gdtm + .tsbc-mini-text').innerHTML = thongke.gdtmData.dangxuly + thongke.gdtmData.daxuly + thongke.gdtmData.tuchoi;
        document.querySelector('.gdtm-text.dangxuly1 span').innerHTML = thongke.gdtmData.dangxuly;
        document.querySelector('.gdtm-text.daxuly1 span').innerHTML = thongke.gdtmData.daxuly;
        document.querySelector('.gdtm-text.tuchoi1 span').innerHTML = thongke.gdtmData.tuchoi;
    },

    // ====== Select Option Handler
    selectOptionHandler: function () {
        let tsbcSelect = document.getElementById("tsbc-select");
        let tsbcInputRoot = document.querySelector('.tsbc-input-root');

        tsbcSelect.addEventListener("change", function () {
            const selectedValue = tsbcSelect.value;

            while (tsbcInputRoot.firstChild) { tsbcInputRoot.removeChild(tsbcInputRoot.firstChild); }

            if (selectedValue === 'year') {
                const label = document.createElement('label');
                label.setAttribute('for', 'tsbc-year');
                label.textContent = 'Chọn Năm';
                const input = document.createElement('input');
                input.setAttribute('type', 'number'); input.setAttribute('id', 'tsbc-year'); input.setAttribute('min', '2023'); input.setAttribute('max', '2024');
                input.setAttribute('value', new Date().getFullYear()); // Năm hiện tại
                tsbcInputRoot.appendChild(label); tsbcInputRoot.appendChild(input);
            }
            if (selectedValue === 'month') {
                const label = document.createElement('label');
                label.setAttribute('for', 'tsbc-month');
                label.textContent = 'Chọn Tháng';
                const input = document.createElement('input'); input.setAttribute('type', 'month'); input.setAttribute('id', 'tsbc-month');
                const currentMonth = new Date().toISOString().split('-').slice(0, 2).join('-');
                input.setAttribute('value', currentMonth); // Tháng hiện tại
                tsbcInputRoot.appendChild(label); tsbcInputRoot.appendChild(input);
            }
            if (selectedValue === 'date') {
                const label = document.createElement('label');
                label.setAttribute('for', 'tsbc-date');
                label.textContent = 'Chọn Ngày';
                const input = document.createElement('input'); input.setAttribute('type', 'date'); input.setAttribute('id', 'tsbc-date');
                const currentDate = new Date().toISOString().split('T')[0];
                input.setAttribute('value', currentDate);
                tsbcInputRoot.appendChild(label); tsbcInputRoot.appendChild(input);
            }
        });

        document.getElementById("tsbc-btn").onclick = function () {
            const selectedValue = tsbcSelect.value;
            if (selectedValue === 'all') {
                thongke.tsbcOption = { type: 'all', year: null, month: null, date: null };
            }
            if (selectedValue === 'year') {
                const year = document.getElementById('tsbc-year').value;
                thongke.tsbcOption = { type: 'year', year: year, month: null, date: null };
            }
            if (selectedValue === 'month') {
                const monthValue = document.getElementById('tsbc-month').value;
                let year = monthValue.split('-')[0];
                let month = monthValue.split('-')[1];
                thongke.tsbcOption = { type: 'month', year: year, month: month, date: null };
            }
            if (selectedValue === 'date') {
                const dateValue = document.getElementById('tsbc-date').value;
                let year = dateValue.split('-')[0];
                let month = dateValue.split('-')[1];
                let date = dateValue.split('-')[2];
                thongke.tsbcOption = { type: 'date', year: year, month: month, date: date };
            }

            thongke.calculateData();
            thongke.updateChart();
        }
    },

    // ====== Start
    start: async function () {
        this.init();
        await this.fetchData(); // Once

        this.calculateData();
        this.renderUI(); // Once

        this.selectOptionHandler();
    }
}

thongke.start();

const khuvuc = {
    // ====== Hàm Khởi tạo các State
    init: function () {
        this.reportData = [];
        this.bckvOption = { time: 'all', year: null, month: null, date: null };

        this.bckvChart = null;

        this.quanData = null;
        this.quanList = null;
        this.quanChartData = null;
    },

    // ====== Fetch dữ liệu các BC
    fetchData: async function () {
        const response = await fetch('https://adsmap-group07.onrender.com/dan/dsbc');
        khuvuc.reportData = await response.json();
        // console.log(khuvuc.reportData);
    },

    // ====== calculateData
    calculateData: async function () {
        khuvuc.quanData = {
            'Quận 1': { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, },
            'Quận 5': { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, },
        };

        khuvuc.reportData.forEach(report => {
            switch (khuvuc.bckvOption.time) {
                case 'all':
                    if (!khuvuc.quanData[report.quan]) { khuvuc.quanData[report.quan] = { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, }; }
                    khuvuc.quanData[report.quan][report.status]++;
                    break;
                case 'year':
                    if (report.time.includes(`năm ${khuvuc.bckvOption.year}`)) {
                        if (!khuvuc.quanData[report.quan]) { khuvuc.quanData[report.quan] = { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, }; }
                        khuvuc.quanData[report.quan][report.status]++;
                    }
                    break;
                case 'month':
                    if (report.time.includes(`tháng ${khuvuc.bckvOption.month} năm ${khuvuc.bckvOption.year}`)) {
                        if (!khuvuc.quanData[report.quan]) { khuvuc.quanData[report.quan] = { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, }; }
                        khuvuc.quanData[report.quan][report.status]++;
                    }
                    break;
                case 'date':
                    if (report.time.includes(`Ngày ${khuvuc.bckvOption.date} tháng ${khuvuc.bckvOption.month} năm ${khuvuc.bckvOption.year}`)) {
                        if (!khuvuc.quanData[report.quan]) { khuvuc.quanData[report.quan] = { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, }; }
                        khuvuc.quanData[report.quan][report.status]++;
                    }
                    break;
            }
        });

        khuvuc.quanList = Object.keys(khuvuc.quanData);
        khuvuc.quanChartData = { 'Đã xử lý': [], 'Đang xử lý': [], 'Từ chối': [], };

        khuvuc.quanList.forEach(quan => {
            const reportCounts = khuvuc.quanData[quan];
            khuvuc.quanChartData['Đã xử lý'].push(reportCounts['Đã xử lý'] || 0);
            khuvuc.quanChartData['Đang xử lý'].push(reportCounts['Đang xử lý'] || 0);
            khuvuc.quanChartData['Từ chối'].push(reportCounts['Từ chối'] || 0);
        });

        // console.log(khuvuc.quanData, khuvuc.quanList, khuvuc.quanChartData)
    },

    // ====== Render UI
    renderUI: function () {
        khuvuc.bckvChart = renderBarChart(khuvuc.quanList, khuvuc.quanChartData);
    },

    // ====== Update Chart
    updateChart: function () {
        khuvuc.bckvChart.config.data.datasets[0].data = khuvuc.quanChartData['Đã xử lý'];
        khuvuc.bckvChart.config.data.datasets[1].data = khuvuc.quanChartData['Đang xử lý'];
        khuvuc.bckvChart.config.data.datasets[2].data = khuvuc.quanChartData['Từ chối'];
        khuvuc.bckvChart.config.data.labels = khuvuc.quanList;
        khuvuc.bckvChart.update();
    },


    // ====== Select Option Handler
    selectOptionHandler: function () {
        let bckvSelect = document.getElementById("bckv-time");
        let bckvInputRoot = document.querySelector('.bckv-input-root');

        bckvSelect.addEventListener("change", function () {
            const selectedValue = bckvSelect.value;

            while (bckvInputRoot.firstChild) { bckvInputRoot.removeChild(bckvInputRoot.firstChild); }

            if (selectedValue === 'year') {
                const label = document.createElement('label');
                label.setAttribute('for', 'bckv-year');
                label.textContent = 'Chọn Năm';
                const input = document.createElement('input');
                input.setAttribute('type', 'number'); input.setAttribute('id', 'bckv-year'); input.setAttribute('min', '2023'); input.setAttribute('max', '2024');
                input.setAttribute('value', new Date().getFullYear()); // Năm hiện tại
                bckvInputRoot.appendChild(label); bckvInputRoot.appendChild(input);
            }
            if (selectedValue === 'month') {
                const label = document.createElement('label');
                label.setAttribute('for', 'bckv-month');
                label.textContent = 'Chọn Tháng';
                const input = document.createElement('input'); input.setAttribute('type', 'month'); input.setAttribute('id', 'bckv-month');
                const currentMonth = new Date().toISOString().split('-').slice(0, 2).join('-');
                input.setAttribute('value', currentMonth); // Tháng hiện tại
                bckvInputRoot.appendChild(label); bckvInputRoot.appendChild(input);
            }
            if (selectedValue === 'date') {
                const label = document.createElement('label');
                label.setAttribute('for', 'bckv-date');
                label.textContent = 'Chọn Ngày';
                const input = document.createElement('input'); input.setAttribute('type', 'date'); input.setAttribute('id', 'bckv-date');
                const currentDate = new Date().toISOString().split('T')[0];
                input.setAttribute('value', currentDate);
                bckvInputRoot.appendChild(label); bckvInputRoot.appendChild(input);
            }
        });

        document.getElementById("bckv-btn").onclick = function () {
            const selectedValue = bckvSelect.value;
            if (selectedValue === 'all') {
                khuvuc.bckvOption = { time: 'all', year: null, month: null, date: null };
            }
            if (selectedValue === 'year') {
                const year = document.getElementById('bckv-year').value;
                khuvuc.bckvOption = { time: 'year', year: year, month: null, date: null };
            }
            if (selectedValue === 'month') {
                const monthValue = document.getElementById('bckv-month').value;
                let year = monthValue.split('-')[0];
                let month = monthValue.split('-')[1];
                khuvuc.bckvOption = { time: 'month', year: year, month: month, date: null };
            }
            if (selectedValue === 'date') {
                const dateValue = document.getElementById('bckv-date').value;
                let year = dateValue.split('-')[0];
                let month = dateValue.split('-')[1];
                let date = dateValue.split('-')[2];
                khuvuc.bckvOption = { time: 'date', year: year, month: month, date: date };
            }


            console.log(khuvuc.bckvOption)
            khuvuc.calculateData();
            khuvuc.updateChart();
        }
    },



    // ====== Start
    start: async function () {
        this.init();
        await this.fetchData(); // Once

        await this.calculateData();
        this.renderUI(); // Once

        this.selectOptionHandler();
    }
}

khuvuc.start();



const kvphuong = {
    // ====== Hàm Khởi tạo các State
    init: function () {
        this.reportData = [];
        this.bcphuongOption = { quan: null, time: 'all', year: null, month: null, date: null };

        this.phuongChart = null;

        this.quanData = null
        this.quanList = null;
        this.phuongData = null
        this.phuongList = null;
        this.chartData = null;
    },

    // ====== Fetch dữ liệu các BC
    fetchData: async function () {
        const response = await fetch('https://adsmap-group07.onrender.com/dan/dsbc');
        kvphuong.reportData = await response.json();
        // console.log(kvphuong.reportData);
    },

    // ====== Render Quận Select
    renderQuanSelect: function () {
        let optionHtml = '';
        kvphuong.quanList.map((quan, index) => {
            optionHtml += `<option value="${quan}" ${kvphuong.bcphuongOption.quan === quan ? 'selected' : ''}>${quan}</option>`;
        })
        document.getElementById('bcphuong-district').innerHTML = optionHtml;
    },

    // ====== calculateData
    calculateData: async function () {
        kvphuong.quanData = {
            'Quận 1': {},
            'Quận 5': {},
        };

        kvphuong.reportData.forEach(report => {
            switch (kvphuong.bcphuongOption.time) {
                case 'all':
                    if (!kvphuong.quanData[report.quan]) { kvphuong.quanData[report.quan] = {}; }
                    if (!kvphuong.quanData[report.quan][getActualPhuong(report.phuong)]) { kvphuong.quanData[report.quan][getActualPhuong(report.phuong)] = { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, }; }
                    kvphuong.quanData[report.quan][getActualPhuong(report.phuong)][report.status]++;
                    break;
                case 'year':
                    if (report.time.includes(`năm ${kvphuong.bcphuongOption.year}`)) {
                        if (!kvphuong.quanData[report.quan]) { kvphuong.quanData[report.quan] = {}; }
                        if (!kvphuong.quanData[report.quan][getActualPhuong(report.phuong)]) { kvphuong.quanData[report.quan][getActualPhuong(report.phuong)] = { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, }; }
                        kvphuong.quanData[report.quan][getActualPhuong(report.phuong)][report.status]++;
                    }
                    break;
                case 'month':
                    if (report.time.includes(`tháng ${kvphuong.bcphuongOption.month} năm ${kvphuong.bcphuongOption.year}`)) {
                        if (!kvphuong.quanData[report.quan]) { kvphuong.quanData[report.quan] = {}; }
                        if (!kvphuong.quanData[report.quan][getActualPhuong(report.phuong)]) { kvphuong.quanData[report.quan][getActualPhuong(report.phuong)] = { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, }; }
                        kvphuong.quanData[report.quan][getActualPhuong(report.phuong)][report.status]++;
                    }
                    break;
                case 'date':
                    if (report.time.includes(`Ngày ${kvphuong.bcphuongOption.date} tháng ${kvphuong.bcphuongOption.month} năm ${kvphuong.bcphuongOption.year}`)) {
                        if (!kvphuong.quanData[report.quan]) { kvphuong.quanData[report.quan] = {}; }
                        if (!kvphuong.quanData[report.quan][getActualPhuong(report.phuong)]) { kvphuong.quanData[report.quan][getActualPhuong(report.phuong)] = { 'Đã xử lý': 0, 'Đang xử lý': 0, 'Từ chối': 0, }; }
                        kvphuong.quanData[report.quan][getActualPhuong(report.phuong)][report.status]++;
                    }
                    break;
            }
        });

        kvphuong.quanList = Object.keys(kvphuong.quanData);
        kvphuong.renderQuanSelect();

        kvphuong.phuongData = kvphuong.quanData[kvphuong.bcphuongOption.quan || kvphuong.quanList[0]];
        kvphuong.phuongList = Object.keys(kvphuong.phuongData);
        kvphuong.chartData = { 'Đã xử lý': [], 'Đang xử lý': [], 'Từ chối': [], };

        kvphuong.phuongList.forEach(phuong => {
            const reportCounts = kvphuong.phuongData[phuong];
            kvphuong.chartData['Đã xử lý'].push(reportCounts['Đã xử lý'] || 0);
            kvphuong.chartData['Đang xử lý'].push(reportCounts['Đang xử lý'] || 0);
            kvphuong.chartData['Từ chối'].push(reportCounts['Từ chối'] || 0);
        });

        console.log(kvphuong.phuongData, kvphuong.phuongList, kvphuong.chartData)
    },

    // ====== Render UI
    renderUI: function () {
        let newPhuongListLabel = kvphuong.phuongList.map(phuong => {
            return `Phường ${phuong}`
        });
        kvphuong.phuongChart = renderPhuongChart(newPhuongListLabel, kvphuong.chartData);
    },


    // ====== Update Chart
    updateChart: function () {
        kvphuong.phuongChart.config.data.datasets[0].data = kvphuong.chartData['Đã xử lý'];
        kvphuong.phuongChart.config.data.datasets[1].data = kvphuong.chartData['Đang xử lý'];
        kvphuong.phuongChart.config.data.datasets[2].data = kvphuong.chartData['Từ chối'];
        kvphuong.phuongChart.config.data.labels = kvphuong.phuongList.map(phuong => {
            return `Phường ${phuong}`
        });
        kvphuong.phuongChart.update();
    },

    // ====== Select Option Handler
    selectOptionHandler: function () {
        let quanSelect = document.getElementById("bcphuong-district");
        let bcphuongSelect = document.getElementById("bcphuong-time");
        let bcphuongInputRoot = document.querySelector('.bcphuong-input-root');

        bcphuongSelect.addEventListener("change", function () {
            const selectedValue = bcphuongSelect.value;

            while (bcphuongInputRoot.firstChild) { bcphuongInputRoot.removeChild(bcphuongInputRoot.firstChild); }

            if (selectedValue === 'year') {
                const label = document.createElement('label');
                label.setAttribute('for', 'bcphuong-year');
                label.textContent = 'Chọn Năm';
                const input = document.createElement('input');
                input.setAttribute('type', 'number'); input.setAttribute('id', 'bcphuong-year'); input.setAttribute('min', '2023'); input.setAttribute('max', '2024');
                input.setAttribute('value', new Date().getFullYear()); // Năm hiện tại
                bcphuongInputRoot.appendChild(label); bcphuongInputRoot.appendChild(input);
            }
            if (selectedValue === 'month') {
                const label = document.createElement('label');
                label.setAttribute('for', 'bcphuong-month');
                label.textContent = 'Chọn Tháng';
                const input = document.createElement('input'); input.setAttribute('type', 'month'); input.setAttribute('id', 'bcphuong-month');
                const currentMonth = new Date().toISOString().split('-').slice(0, 2).join('-');
                input.setAttribute('value', currentMonth); // Tháng hiện tại
                bcphuongInputRoot.appendChild(label); bcphuongInputRoot.appendChild(input);
            }
            if (selectedValue === 'date') {
                const label = document.createElement('label');
                label.setAttribute('for', 'bcphuong-date');
                label.textContent = 'Chọn Ngày';
                const input = document.createElement('input'); input.setAttribute('type', 'date'); input.setAttribute('id', 'bcphuong-date');
                const currentDate = new Date().toISOString().split('T')[0];
                input.setAttribute('value', currentDate);
                bcphuongInputRoot.appendChild(label); bcphuongInputRoot.appendChild(input);
            }
        });


        document.getElementById("bcphuong-btn").onclick = function () {
            const selectedValue = bcphuongSelect.value;
            let quan = quanSelect.value;
            if (selectedValue === 'all') {
                kvphuong.bcphuongOption = { quan: quan, time: 'all', year: null, month: null, date: null };
            }
            if (selectedValue === 'year') {
                const year = document.getElementById('bcphuong-year').value;
                kvphuong.bcphuongOption = { quan: quan, time: 'year', year: year, month: null, date: null };
            }
            if (selectedValue === 'month') {
                const monthValue = document.getElementById('bcphuong-month').value;
                let year = monthValue.split('-')[0];
                let month = monthValue.split('-')[1];
                kvphuong.bcphuongOption = { quan: quan, time: 'month', year: year, month: month, date: null };
            }
            if (selectedValue === 'date') {
                const dateValue = document.getElementById('bcphuong-date').value;
                let year = dateValue.split('-')[0];
                let month = dateValue.split('-')[1];
                let date = dateValue.split('-')[2];
                kvphuong.bcphuongOption = { quan: quan, time: 'date', year: year, month: month, date: date };
            }

            console.log(kvphuong.bcphuongOption)
            kvphuong.calculateData();
            kvphuong.updateChart();
        }
    },



    // ====== Start
    start: async function () {
        this.init();
        await this.fetchData(); // Once

        await this.calculateData();
        this.renderUI(); // Once

        this.selectOptionHandler();
    }
}

kvphuong.start();

function getActualPhuong(phuong) {
    if (phuong.startsWith('Phường ')) {
        return phuong.substring(7);
    }
    return phuong;
}

