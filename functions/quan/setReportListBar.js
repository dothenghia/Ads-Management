const $i = document.getElementById.bind(document);

export default async function setReportListBar(repInfo, areaInfo, adTypeInfo, profileInfo) {
    let repInfoBar = $i("repInfo");
    let repInfoCards = `
        <h3><button type="button" id="close" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button></h3>
    `;
    Object.values(repInfo).map(function (districtInfo) {
        Object.values(districtInfo.duong).map(function (streetInfo) {
            Object.values(streetInfo.baocao).map((rep) => {
                let adInfo = rep.loc.split("_");
                let repAdInfo = adTypeInfo[adInfo[0]].qc[adInfo[1]];
                let adAddr = JSON.stringify({
                    "duong": streetInfo.name,
                    "quan": areaInfo.quan,
                    "phuong": districtInfo.name
                });
                let repInfoCard = `
                    <div>
                        <h5>${rep.type.name}</h5>
                        <hr>
                        <p>Họ tên: ${rep.sender.name}</p>
                        <p>Email: ${rep.sender.email}</p>
                        <p>Điện thoại: ${rep.sender.phone}</p>
                        <button onclick='redirectToRepPage("${rep.id}", ${adAddr}, ${JSON.stringify(repAdInfo)}, ${JSON.stringify(rep)}, ${JSON.stringify(profileInfo)})'>
                            Chi tiết
                        </button>
                    </div>
                `
                repInfoCards += repInfoCard;
            })
        });
    })

    
    repInfoBar.innerHTML = repInfoCards;
}