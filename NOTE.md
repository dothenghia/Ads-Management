### ====== Tài khoản cán bộ ======
## Quận 1 - Phường Nguyễn Cư Trinh
    - username: pckq1hcm
## Quận 1 - Phường Cầu Kho
    - username: pnctq1hcm
## Quận 5 - Phường 4
    - username: p4q5hcm
## Quận 5 - Phường 3
    - username: p3q5hcm
Pass: 123

### ====== HỌP ======
- Trang QLBáo cáo :
    + thêm tên người gửi
    + Thời gian rút gọn lại
    + của Quận thì thêm cột Phường mấy dô

- Code đang chạy ổn thì đừng chuyển sang Model nhìu quá, chỉ cần có đoạn require ở khúc trên đầu, và chuyển 2 3 cái dễ dễ thoi

Nghĩa :
    Dân :
        - Sửa lại icon (Nếu có QC thì có chữ QC)
        - Sửa độ dài tên cán bộ
        - Deploy
        - Style lại 2 cái Modal Trang QL ĐQC (Sở)

        - Sửa lỗi icon khi scoll (Để cuối, tại có lúc bị có lúc ko bị)

Khoa : 
    Phường + Quận :
        - Đổi function trong Controller sang kiểu Model
        - Trang thông tin QC: - [DONE]
            + Thêm nút thêm YCCP - [DONE]
        - Trang Cấp phép QC : - [DONE]
            + Bị lỗi duplicate Hình - [DONE]
            + Những cái đã Duyệt thì ẩn nút thùng rác - [DONE]
        - Trang Điều chỉnh Điểm QC/QC : - [DONE]
            + Bị lỗi duplicate Hình - [DONE]
            + Hình thức và mấy kia là Dropdown - [DONE]
        - Chỉnh lại ratio của các hình trong Modal - [DONE]
        - Set fix width column của Quận Modal với Table - [DONE]

Bảo :
    Sở :
        - Đổi function trong Controller sang kiểu Model            
        - Trang Quản Lý Tạo điểm QC :
            + Style lại đẹp đẹp
            + Fix lại số cho ngắn
            + Fix lỗi NaN long lat   
        - Chỉnh lại kích thước các cột dữ liệu
        - Trang Quản lý Báo cáo :
            => Kiếm th Khoa chỉ
            + Xóa chữ "gần" - Done
            + Đổi thành TÊN BẢNG QUẢNG CÁO đối với các Báo cáo Bảng QC - Done
            + Thêm cột Quận
        - Trang Quản lý Nhân sự :
            + Thêm nút sort cho Khu vực
            + Sửa lỗi Tạo Nhân sự
Hải :
    - Sửa lại toàn bộ các cột thời gian thành dạng dd/mm/yyyy


Cần có ít nhất 20 điểm đặt QC và ít nhất 20 bảng QC đã được cấp phép, nằm rải rác ở 2 phường khác nhau