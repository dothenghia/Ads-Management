
### ====== PHÂN CÔNG ======

- 

Nghĩa :

    Dân :
        - Fetch Report [2h]
            => Khi fetch về thì chỉ lấy những cái là 'Từ chối' & 'Đã xử lý' & những cái reportId trong local storage đã gửi

    Phường+Quận :
        - Trang BanDo chưa làm xong [4h]
            => Cần làm Sidebar
            => Cần làm Nút danh sách báo cáo
            => Bản đồ mở rộng giới hạn view (tạo layer viền khu vực đó - nếu rảnh)
        - Geocoding Search bar (Final)
        - Guide Marker (Optional)

Khoa :
    Phường + Quận :
        - Trang Báo cáo :
            => Địa chỉ, phường quận => reverseGeocoding
            => Style lại (Phương thức xử lý bớt border-radius lại xíu)
            Đổi cái Phương thức xử lý xún dưới + Thêm divider phân ra Phần nào của dân gửi lên, phần nào thì của cán bộ
        - Trang yêu cầu cấp phép :
            => Style lại mấy ô input
        - Lấy dữ liệu Phường/Quận tương ứng <== Kiếm th Hải
        - Hiển thị hình ảnh Báo cáo
        - Sửa lại trang Yêu cầu chỉnh sửa => Tạo + Xem lại những cái đã gửi
        - Thêm trang Điều chỉnh DDQC :
            + Chỉ xin điều chỉnh các trường thông tin như adForm, adType, locationType
        - Sửa lại tên cái sidebar cho rõ ràng
        - Thêm nút lọc Phường cho Cán bộ Quận
Bảo :
    Sở :
    - Thống kê - Chưa
    - Trang Cấp Phép, Điều Chỉnh -> Chỉ có Duyệt thoi  - Done

    - Tạo ra trang Quản lý Địa điểm quảng cáo :
        + Có nút Thêm DDQC : Điền vào những cái thông tin về địa điểm đó ()
        + Danh sách các ĐĐQC
    Cụ thể là tạo ra 1 adLocation với adlist rỗng
    
    BỎ CÁI FIELD delete TRONG COLLECTION report
    - Up ảnh lên ở đâu?
    - Thiếu trang thêm nhân sự
    


Hải :
    Cán bộ :
    - Sort
    - Check Đăng nhập cùng 1 tài khoản cùng lúc
    Database :
    - Tạo Model (Sau khi xong hết tất cả thao tác với Database)
    - Phụ th Khoa/Bảo lấy dữ liệu tương ứng với Phường/Quận/Sở khi đăng nhập vào
    - Phường/Quận : Người dân gửi báo cáo sẽ nhận được email thông báo về tình trạng và cách thức xử lý cho từng báo cáo một cách tự động
    - Nghiên cứu cách hiện cái Mapbox popup nhỏ nhỏ để lấy long/latitude