
export default function SendReportModal() {
    var fetchData = async () => {

        document.querySelector('.modal-root').innerHTML = render();

        var fileStorage = [];
        var dropA = document.getElementById('drop-area');

        // JavaScript for handling drag-and-drop functionality
        dropA.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.classList.add('hover');
        });
    
        dropA.addEventListener('dragleave', function (e) {
            e.preventDefault();
            this.classList.remove('hover');
        });
    
        dropA.addEventListener('drop', function (e) {
            e.preventDefault();
            this.classList.remove('hover');
    
            var files = e.dataTransfer.files;
            handleFiles(files);
        });
    
        // Handling file input change
        document.getElementById('fileInput').addEventListener('change', function () {
            var files = this.files;
            handleFiles(files);
        });

        // Additional handling for clicking the drop area to trigger file input
        document.getElementById('click-span').addEventListener('click', function () {
            document.getElementById('fileInput').click();
        });
    
        function handleFiles(files) {
            var fileList = document.getElementById('file-list');
            fileList.classList.remove('d-none');
    
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var listItem = document.createElement('li');
                listItem.className = 'file-item';
                listItem.textContent = file.name;
                fileList.appendChild(listItem);

                fileStorage.push(file);
            }
            console.log(fileStorage);
        }
        
    }

    fetchData();

    function render () {
        return `
        <div class="modal fade" id="SendReportModal" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <form id="ReportForm">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="width: 70%;">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-column">
                        <div class="w-100 d-flex flex-row">
                            <h5 class="modal-title w-100 fw-bold" id="modalTitleId">Đơn Phản hồi thông tin</h5>
                            <button type="button" class="btn-close w-5" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                    <div class="modal-body">

                        <div class="container-fluid">
                            <div class="d-flex flex-row justify-content-between" style="margin-bottom: 8px;">
                                <div class="w-33 d-flex flex-column" style="min-width: 50%;">
                                    <p class="fs-6 fw-semibold lh-base m-0" style="padding-bottom: 5px;">Hình thức báo cáo <span class="text-danger">*</span></p>
                                    <div class="input-group mb-3" style="padding-right: 12%;">
                                        <select class="form-select" id="inputGroupSelect01" name="HinhThuc">
                                            <option selected>Hình thức báo cáo</option>
                                            <option value="1">Tố giác sai phạm</option>
                                            <option value="2">Đăng ký nội dung</option>
                                            <option value="3">Đóng góp ý kiến</option>
                                            <option value="4">Giải đáp thắc mắc</option>
                                        </select>
                                    </div>

                                </div>

                                <div class="w-33 d-flex flex-column " style="min-width: 50%;"> 
                                    <p class="fs-6 fw-semibold lh-base m-0" style="padding-bottom: 5px;">Họ và Tên <span class="text-danger">*</span></p>
                                    <div class="input-group mb-3" style="padding-right: 10%;">
                                        <input type="text" class="form-control" placeholder="Nhập Họ và Tên" aria-label="Username" name="UserName">
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex flex-row justify-content-between" style="margin-bottom: 8px;">
                                <div class="w-33 d-flex flex-column" style="min-width: 50%;">
                                    <p class="fs-6 fw-semibold lh-base m-0" style="padding-bottom: 5px;">Email <span class="text-danger">*</span></p>
                                    <div class="input-group mb-3" style="padding-right: 15%;">
                                        <input type="text" class="form-control" placeholder="Nhập Địa Chỉ Email" aria-label="Email" name="Email">
                                    </div>
                                </div>

                                <div class="w-33 d-flex flex-column " style="min-width: 50%;"> 
                                    <p class="fs-6 fw-semibold lh-base m-0" style="padding-bottom: 5px;">Số điện thoại <span class="text-danger">*</span></p>
                                    <div class="input-group mb-3" style="padding-right: 10%;">
                                        <input type="text" class="form-control" placeholder="Nhập Số Điện Thoại" aria-label="PhoneNum" name="PhoneNum">
                                    </div>
                                </div>
                            </div>

                            <div class="w-33 d-flex flex-column w-100">
                                <p class="fs-6 fw-semibold lh-base m-0" style="padding-bottom: 5px;">Nội dung báo cáo <span class="text-danger">*</span></p>
                                <div class="input-group mb-3">
                                    <textarea class="form-control" placeholder="Nhập Nội Dung Báo Cáo" aria-label="ReportContent" style="min-height: 100px;" name="ReportContent"></textarea>
                                </div>
                            </div>

                            <div class="mb-3 d-flex flex-column justify-content-center align-items-center" id="drop-area">
                                <p class=" fs-6 fw-semibold m-0">
                                    Drag & Drop files here or 
                                    <span class="text-primary text-decoration-underline" 
                                        id="click-span" style="cursor: pointer;">
                                        click
                                    </span> 
                                    to select
                                </p>
                                <input type="file" id="fileInput" class="d-none" name="FileInput" multiple >
                                <div class="w-100">
                                    <ul id="file-list" class="d-none"></ul>
                                </div>
                            </div>
                            
                            <button class="btn btn-outline-primary text-start" type="submit" autocomplete="off" style="border: 2px solid; max-width: 60%; float:right;"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                                </svg>    
                                Gửi phản hồi
                            </button>
                        </div>



                    </div>

                </div>
            </div>
        </form>
    </div>
    `
    }
}


