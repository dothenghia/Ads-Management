const $i = document.getElementById.bind(document);

export function AdInfoDropdownButton(dropdownId) {
    return `
        <button onclick="
            document.querySelectorAll('#${dropdownId}').forEach((dropdown) => {
                if (!dropdown.style.display || dropdown.style.display == '') {
                    dropdown.style.display = 'none';
                }
                else if (dropdown.style.display == 'none') {
                    dropdown.style.removeProperty('display');
                }
            })
        ">
            Chi tiết
        </button>
    `
}

export function AdInfoPageOpenButton(adInfo) {
    return `
        <button onclick="
            document.getElementById('contentOverlay').style.removeProperty('display')
        ">
            ...
        </button>
    `
}

export function AdInfoPageCloseButton() {
    return `
        <button onclick="
            document.getElementById('contentOverlay').style.display = 'none'
        ">
            ...
        </button>
    `
}