
export default function List(list) {
    // console.log(list);
    
    return `
        <ul class="list-group">
            ${
                list.map((item) => {
                    return `<li class="list-group-item">${item.title}</li>`
                }).join('')
            }
        </ul>
    `
}
