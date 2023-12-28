
### ====== PHÂN CÔNG ======

- 

Nghĩa :
    Dân :
        - TOÀN BẢN ĐỒ => chỉ lấy những cái là 'Đã xử lý'
        - DANH SÁCH ĐÃ GỬI => thì chỉ lẫy những cái reportId trong local storage đã gửi
        
        - Nhắc tụi nó Thêm Phường 15 của Quận 5
        - CHỈ NHỮNG CÁI BÁO CÁO NÀO MÀ 'ĐÃ XỬ LÝ' THÌ MỚI ĐỔI reportId của adLocation và ad
          Còn nếu mà Từ chối thì ko cần cập nhật reportId của adLocation và ad

    Phường+Quận :
        - Trang BanDo chưa làm xong [4h]
            => Bản đồ mở rộng giới hạn view (tạo layer viền khu vực đó - nếu rảnh) /
            => Cần làm Sidebar
            => Cần làm Nút danh sách báo cáo
        - Geocoding Search bar (Final)
        - Guide Marker (Optional)

Khoa :
    Phường + Quận :
        - Thêm nút lọc Phường cho Cán bộ Quận
        - Lọc ra những báo cáo của Phường/Quận tương ứng cho mọi trang
        - Lọc ra những báo cáo trùng Địa điểm QC / Bảng QC => Nếu Đã Xử lý 1 cái, thì những cái còn lại thành Từ chối

Bảo :
    Sở :
    - Thống kê - Chưa
    - Chỉnh sửa tài khoản Cán bộ (P/Q/S) :
        + Thêm gmail, fb id - rồi
    - Sửa lại tên các nút trên Sidebar cho rõ ràng
    - Up ảnh lên ở đâu? => Liên hệ Hải hỗ trợ
    - Thiếu trang thêm nhân sự
    - Style lại mấy cái modal Thêm địa điểm QC

    BỎ CÁI FIELD delete TRONG COLLECTION report



Hải :
    Cán bộ :
    - Sort
    - Check Đăng nhập cùng 1 tài khoản cùng lúc
    Database :
    - Phường/Quận : Người dân gửi báo cáo sẽ nhận được email thông báo về tình trạng và cách thức xử lý cho từng báo cáo một cách tự động
    - Nghiên cứu cách hiện cái Mapbox popup nhỏ nhỏ để lấy long/latitude
    - Tạo Model (Sau khi xong hết tất cả thao tác với Database)


