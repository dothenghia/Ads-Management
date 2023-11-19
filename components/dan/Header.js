
export default function Header() {
    return `
    <header class="container-fluid bg-light z-2 position-absolute header">
        <nav class="navbar navbar-expand-sm navbar-dark container">
            <div class="container">
                <h1 class="header__name">
                    AdsMap
                </h1>
                
                <div>
                    <input class="header__search" type="search" placeholder="Nhập địa chỉ..." aria-label="Search">
                </div>
            </div>
        </nav>

    </header>
    `
}
