const $i = document.getElementById.bind(document);

export default function AdInfoDropdownButton(dropdownId) {
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