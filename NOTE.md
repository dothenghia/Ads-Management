API Key : AIzaSyDorTHtdzjlwow2eDY0l3hsLQa-GjDgAns

- Viết lại những phương thức trong getAdLocationInfo.js /
- Viết lại những phương thức trong getReportLocationInfo.js /
- Đổi theme bản đồ khác (bỏ mấy cái trạm xe bus, ...)
- Geocoding Report Card
- Geocoding Search bar
- Send Report + LocalStorage


### ====== PHÂN CÔNG ======

Nghĩa :
    Dân :
    - Viết trong functions => fetch API thẳng từ FireBase
    - Local Storage Lưu thông tin báo cáo đã gửi của ng dân
    => Khi ng dân báo cáo thì sẽ lưu ID báo cáo lại
    Khi bấm nút Danh sách BC thì sẽ fetch lại các thông tin theo của cái ID đã lưu


Khoa :
    Phường + Quận :
    => Bản đồ mở rộng giới hạn view (tạo layer viền khu vực đó - nếu rảnh)
    => Trang bando : Nút xem danh sách báo cáo + Sidebar khi click vào điểm QC
    + Nhập thông tin cấp phép => Chọn Quận -> Phường -> Nhập đường
    + Yêu cầu chỉnh sửa -> Là chỉnh sửa Quảng cáo (Tên, Kích thước, Hình)

    + Xử lý báo cáo -> Có hình Cây bút , bấm dô hiện lên thông tin báo cáo và Có cáo ô để điền phương thức xử lý , Có thêm 2 nút là Từ chối và Gửi xử lí => Thay đổi cái tình trạng xử lý bên ngoài và mất đi hình cây bút

Bảo :
    => Sửa cái Dropdown trang Nhân sự (so) => Theo layout CRUD của cô
    + Sửa lại UI thêm cái nút hình cây bút
    Cán bộ chung :
    + Tạo trang chỉnh sửa thông tin cá nhân (Bao gồm cả thông tin và Đổi password)
    => Bổ sung route Quận vào file index.js ở root
    + thongtinquangcao của Phường, Quận, Sở bỏ đi cột Số lượng + Kích thước 

Hải :
    + JWT
    - Viết mẫu Database
    - Viết mẫu mấy cái fetch API cho người dân (Tạo file example.js trong functions/dan)
    - Phụ những phần khác