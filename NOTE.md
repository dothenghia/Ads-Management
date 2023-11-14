API Key : AIzaSyDorTHtdzjlwow2eDY0l3hsLQa-GjDgAns


AdMarker
    --> AdSidebar :
        + AdSidebar_Thumbnail
        + AdSidebar_Info --> Report Form Modal
        + AdCard --> Detail Ad Modal & Report Form Modal

ReportMarker
    --> Detail Report Modal

ReportListButton
    --> ReportSidebar :
        + ReportCard --> (Detail Ad Modal || AdSidebar) & Detail Report Modal



<details>
    <summary>Phân công</summary>
    
    Người dân :
    (Nghĩa)
    - Thanh tìm kiếm
    - Nút Danh sách /
    - Nút thu phóng
    - Các nút ẩn hiện
    - 9 cái điểm đánh dấu (8/9)
        + Click
    - SideBar Thông tin địa điểm đặt QC + Thông tin chung của các QC đặt tại đó /
    - Sidebar Danh sách báo cáo /

    (Bảo)
    - Popup Thông tin địa điểm bất kì
    - Modal Thông tin chi tiết QC
    - Modal Đơn phản hồi báo cáo
    - Modal Thông tin chi tiết Báo cáo

    Cán bộ :
    (Khoa)
    - Làm Phường
    - Làm Quận

    (Bảo + Ai xong thì qua phụ ní Bảo)
    - Làm Sở

    (Hải)
    - Các trang chung của CB (Đăng nhập, Đăng ký, Quên mật khẩu, Đổi thông các nhân)

</details>

<details>
    <summary>Cấu trúc thư mục</summary>

    ```
    Thư mục gốc
    │
    ├── assets : Thư mục chứa Media, Image, Fonts của từng Phân hệ tương ứng
    │   ├── chung : Chứa những file phương tiện dùng chung như Logo, Font, ...
    │   │   └── ...
    │   │
    │   ├── dan
    │   │   └── ...
    │   │
    │   ├── phuong
    │   │   └── ...
    │   │
    │   ├── quan
    │   │   └── ...
    │   │
    │   └── so
    │       └── ...
    │
    ├── components : Thư mục chứa các Component tương ứng cho từng role
    │   │            (Component là mấy cái thành phần UI nhỏ, thường sẽ tái sử dụng, lặp lại nhìu lần
    │   │             Như là Nút, Slide, Header, Search bar...)
    │   ├── chung
    │   │   ├── Button.js
    │   │   └── Header.js
    │   │
    │   ├── dan
    │   │   └── ...
    │   │
    │   ├── phuong
    │   │   └── ...
    │   │
    │   ├── quan
    │   │   └── ...
    │   │
    │   └── so
    │       └── ...
    │
    ├── functions : Thư mục chứa các phương thức xử lý với dữ liệu
    │   │        
    │   ├── dan
    │   │   ├── getMap.js
    │   │   ├── getReportList.js
    │   │   └── sendReportList.js
    │   │
    │   ├── canbo
    │   │   ├── sendLogin.js
    │   │   └── sendSignup.js
    │   │
    │   ├── phuong
    │   │   ├── get...
    │   │   └── ...
    │   │
    │   ├── quan
    │   │   ├── get...
    │   │   └── ...
    │   │
    │   └── so
    │       ├── get...
    │       └── ...
    │
    ├── screens : Thư mục chứa các UI screens
    │   │        (Mỗi phân hệ chia theo các Trang Chức Năng)
    │   ├── dan
    │   │   ├── trangchu.html
    │   │   ├── trangchu.js
    │   │   └── ...
    │   │
    │   ├── canbo
    │   │   ├── dangnhap
    │   │   │   ├── dangnhap.html
    │   │   │   ├── dangnhap.css
    │   │   │   └── dangnhap.js
    │   │   │
    │   │   ├── dangky
    │   │   │   ├── dangky.html
    │   │   │   ├── dangky.css
    │   │   │   └── dangky.js
    │   │   └── ...
    │   │
    │   ├── phuong
    │   │   └── ...
    │   │
    │   ├── quan
    │   │   └── ...
    │   │
    │   └── so
    │       └── ...
    │ 
    │ 
    ├── global.css : File CSS chung, chứa những thuộc tính global như là font, color,...
    ├── main.js : Tạo ra chơi thoi chứ chưa biết có dùng hong
    └── index.html : 
    ```

</details>
