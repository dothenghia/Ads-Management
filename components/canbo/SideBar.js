const iconDir = "/assets/chung/icon/";
const $i = document.getElementById.bind(document);

export default function SideBar(categoryIcons, categoryLabels, categoryHrefs, currentLabelIndex) {
    let i = 0;
    let curRole = window.location.href;
    let splitStr = curRole.split('/')
    if (splitStr.includes('so')){
        var settingURL = "/screens/canbo/caidat/caidat.html?key=" + "so";
    }
    else if (splitStr.includes('quan')){
        var settingURL = "/screens/canbo/caidat/caidat.html?key=" + "quan";
    }
    else{
        var settingURL = "/screens/canbo/caidat/caidat.html?key=" + "phuong";
    }
    $i("collapsibleSidebar").innerHTML = `
        <ul class="navbar-nav me-auto mt-2 mt-lg-none">
            ${
                categoryIcons.map(icon => {
                    let element;
                    if (i == currentLabelIndex) {
                        element = `<li class="sidebar-active"><div>${categoryLabels[i]}</div></li>`
                        i++;
                    }
                    else {
                        element = `
                            <li>
                                <button onclick='window.location.href="${categoryHrefs[i]}"'>
                                    ${categoryLabels[i]}
                                </button>
                            </li>`
                        i++;
                    }
                    return element;
                }).join('')
            }
            <li><button href="#" onclick="window.location.href=${settingURL}">Cài đặt</button></li>
            <li><button href="#" onclick="window.location.href='/screens/canbo/dangnhap/dangnhap.html'">Đăng xuất</button></li>
        </ul>
    `
    i = 0;
    return `
    <div id="side-bar" class="d-flex flex-column justify-content-between">
        <ul>
            ${
                categoryIcons.map(icon => {
                    let element;
                    if (i == currentLabelIndex) {
                        element = `<li class="sidebar-active"><div><img src="${iconDir}${icon}"><br>${categoryLabels[i]}</div></li>`
                        i++;
                    }
                    else {
                        element = `
                            <li>
                                <button onclick='window.location.href="${categoryHrefs[i]}"'>
                                    <img src="${iconDir}${icon}"><br>${categoryLabels[i]}
                                </button>
                            </li>
                        `
                        i++;
                    }
                    return element;
                }).join('')
            }
            <li id="setting" class=""><button href="#" onclick="window.location.href='${settingURL}'" ><img src="${iconDir}caidat_icon.svg" id="iconSetting"><br>Cài đặt</button></li>
        </ul>
        <ul>
            <li><button href="#" onclick="window.location.href='/screens/canbo/dangnhap/dangnhap.html'"><img src="${iconDir}dangxuat_icon.svg"><br>Đăng xuất</button></li>
        </ul>
    </div>
    `
}

