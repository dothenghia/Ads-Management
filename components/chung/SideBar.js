
export default function SideBar(...items) {
    return `
    <aside>
        <div class="list-group">
            
            ${
                items.map(item => {
                    return `<a href="#" class="list-group-item list-group-item-action">${item}</a>`
                }).join('')
            }

            <a href="#" class="list-group-item list-group-item-action">Cài đặt</a>
            <a href="#" class="list-group-item list-group-item-action">Cài đặt</a>
            <a href="#" class="list-group-item list-group-item-action">Cài đặt</a>
            <a href="#" class="list-group-item list-group-item-action">Cài đặt</a>
        </div>
    </aside>
    `
}

