const iconDir = "/assets/chung/icon/";
const $i = document.getElementById.bind(document);

export default function SideBar(categoryIcons, categoryLabels, categoryHrefs, currentLabelIndex) {
    let i = 0;

    $i("collapsibleSidebar").innerHTML = `
        <ul class="navbar-nav me-auto mt-2 mt-lg-none">
            ${
                categoryIcons.map(icon => {
                    let element;
                    if (i == currentLabelIndex) {
                        element = `<li class="active"><button href="${categoryHrefs[i]}">${categoryLabels[i]}</button></li>`
                        i++;
                    }
                    else {
                        element = `<li><button href="${categoryHrefs[i]}">${categoryLabels[i]}</button></li>`
                        i++;
                    }
                    return element;
                }).join('')
            }
            <li><button href="#">Cài đặt</button></li>
            <li><button href="#">Đăng xuất</button></li>
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
                        element = `<li class="active"><button href="${categoryHrefs[i]}"><img src="${iconDir}${icon}"><br>${categoryLabels[i]}</button></li>`
                        i++;
                    }
                    else {
                        element = `<li><button href="${categoryHrefs[i]}"><img src="${iconDir}${icon}"><br>${categoryLabels[i]}</button></li>`
                        i++;
                    }
                    return element;
                }).join('')
            }
            <li><button href="#"><img src="${iconDir}caidat_icon.svg"><br>Cài đặt</button></li>
        </ul>
        <ul>
            <li><button href="#"><img src="${iconDir}dangxuat_icon.svg"><br>Đăng xuất</button></li>
        </ul>
    </div>
    `
}

