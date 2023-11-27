API Key : AIzaSyDorTHtdzjlwow2eDY0l3hsLQa-GjDgAns


PHÂN CÔNG :

Nghĩa :
+ Chốt Schema của từng Bảng Của Người Dân
+ Xác định những phương thức CRUD Của Người dân + Cái dạng dữ liệu cần trả về

Khoa :
+ Tiếp tục chuyển đổi Handlebars Phường + Quận

Bảo :
+ Tiếp tục hoàn thiện UI
+ Tiếp tục chuyển đổi Handlebars Sở

Hải :
+ Những chức năng chung của cán bộ


[+ Chốt Schema của từng Bảng Của Cán bộ] (Th nào code Hbs thì để ý Data cho từng trang)
[+ Xác định những phương thức CRUD của Cán bộ]






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
