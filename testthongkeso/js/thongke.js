
import {
    renderBigTSBCChart,
    renderMiniTGSPChart,
    renderMiniDKNDChart,
    renderMiniDGYKChart,
    renderMiniGDTMChart
} from "./renderChart.js";

function fetchReportData() {
    fetch('http://localhost:3000/dan/dsbc')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // @ ========== Tổng số Báo cáo theo THỜI GIAN
            let tsbcData = { tgsp: 0, dknd: 0, dgyk: 0, gdtm: 0 }
            data.forEach(item => {
                if (item.reportForm === "Tố giác sai phạm") tsbcData.tgsp++;
                if (item.reportForm === "Đăng ký nội dung") tsbcData.dknd++;
                if (item.reportForm === "Đóng góp ý kiến") tsbcData.dgyk++;
                if (item.reportForm === "Giải đáp thắc mắc") tsbcData.gdtm++;
            });
            renderBigTSBCChart(tsbcData);

            // @ ========== Tố giác sai phạm
            let tgspData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
            data.forEach(item => {
                if (item.reportForm === "Tố giác sai phạm") {
                    if (item.status === "Đang xử lý") tgspData.dangxuly++;
                    if (item.status === "Đã xử lý") tgspData.daxuly++;
                    if (item.status === "Từ chối") tgspData.tuchoi++;
                }
            });
            renderMiniTGSPChart(tgspData);

            // @ ========== Đăng ký nội dung
            let dkndData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
            data.forEach(item => {
                if (item.reportForm === "Đăng ký nội dung") {
                    if (item.status === "Đang xử lý") dkndData.dangxuly++;
                    if (item.status === "Đã xử lý") dkndData.daxuly++;
                    if (item.status === "Từ chối") dkndData.tuchoi++;
                }
            });
            renderMiniDKNDChart(dkndData);

            // @ ========== Đóng góp ý kiến
            let dgykData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
            data.forEach(item => {
                if (item.reportForm === "Đóng góp ý kiến") {
                    if (item.status === "Đang xử lý") dgykData.dangxuly++;
                    if (item.status === "Đã xử lý") dgykData.daxuly++;
                    if (item.status === "Từ chối") dgykData.tuchoi++;
                }
            });
            renderMiniDGYKChart(dgykData);

            // @ ========== Giải đáp thắc mắc
            let gdtmData = { dangxuly: 0, daxuly: 0, tuchoi: 0 }
            data.forEach(item => {
                if (item.reportForm === "Giải đáp thắc mắc") {
                    if (item.status === "Đang xử lý") gdtmData.dangxuly++;
                    if (item.status === "Đã xử lý") gdtmData.daxuly++;
                    if (item.status === "Từ chối") gdtmData.tuchoi++;
                }
            });
            renderMiniGDTMChart(gdtmData);

        })
}

fetchReportData();


