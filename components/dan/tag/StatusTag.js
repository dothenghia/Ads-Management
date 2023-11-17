

export default function StatusTag(status) {

    switch (status) {
        case 'Đang xử lý':
            return `
            <div class="status-tag status-tag-dangxuly">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <h4 class='status-tag__title'>${status}</h4>
            </div>
            `
        case 'Đã xử lý':
            return `
            <div class="status-tag status-tag-daxuly">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h4 class='status-tag__title'>${status}</h4>
            </div>
            `
        case 'Từ chối':
            return `
            <div class="status-tag status-tag-tuchoi">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                <h4 class='status-tag__title'>${status}</h4>
            </div>
            `

        default:
            break;
    }
    return ``
}
