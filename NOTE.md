
### ====== PHÂN CÔNG ======

- 

Nghĩa :
    Dân :
        - Đổi function trong Controller sang kiểu Model
        - reportList (DDi tham khảo các nhóm khác)
        - Thống kê (Sở)
        - Chỉnh lại mấy cái placeholder, text, ...

        - Nhắc tụi nó Thêm Phường 15 của Quận 5
        * CHỈ NHỮNG CÁI BÁO CÁO về `BẢNG QUẢNG CÁO` hoặc là `ĐỊA ĐIỂM QUẢNG CÁO`
          khi MÀ được duyệt là 'ĐÃ XỬ LÝ' THÌ PHẢI ĐỔI reportId của adLocation và ad tương ứng
          Còn nếu mà Từ chối thì ko cần cập nhật reportId của adLocation và ad

        - Geocoding Search bar (Final)
        - Format lại các hàm Controller, Sửa lại res.json error lỗi rõ ràng hơn
        - Guide Marker (Optional)

Khoa :
    Phường + Quận :
        - Thêm nút lọc Phường cho Cán bộ Quận
        - Lọc ra những báo cáo của Phường/Quận tương ứng cho mọi trang
        - Đổi function trong Controller sang kiểu Model
        - Đổi tên thêm "Tất cả" vào các nút filter
        - Sửa lại Tên Cán bộ thành email đăng nhập (cho ngắn)
        - Trang Báo cáo : Phường/Quận/Sở luôn
            + Xóa chữ "gần"
            + Đổi thành TÊN BẢNG QUẢNG CÁO đối với các Báo cáo Bảng QC
        - Trang Yêu cầu điều chỉnh QC :
            + Thêm cột Tên bảng QC
            + Sửa lại Phần Lý do chỉnh sửa (Theo 1 trong 2 cách)


        * CHỈ NHỮNG CÁI BÁO CÁO về `BẢNG QUẢNG CÁO` hoặc là `ĐỊA ĐIỂM QUẢNG CÁO`
          khi MÀ được duyệt là 'ĐÃ XỬ LÝ' THÌ PHẢI ĐỔI reportId của adLocation và ad tương ứng
          Còn nếu mà Từ chối thì ko cần cập nhật reportId của adLocation và ad
Bảo :
    Sở :
        - Lọc ra những báo cáo trùng Địa điểm QC / Bảng QC => Nếu Đã Xử lý 1 cái, thì những cái còn lại thành Từ chối
            * CHỈ NHỮNG CÁI BÁO CÁO về `BẢNG QUẢNG CÁO` hoặc là `ĐỊA ĐIỂM QUẢNG CÁO`
            khi MÀ được duyệt là 'ĐÃ XỬ LÝ' THÌ PHẢI ĐỔI reportId của adLocation và ad tương ứng
            Còn nếu mà Từ chối thì ko cần cập nhật reportId của adLocation và ad
        - Thêm trang `Quản lý Điều chỉnh QC`
        - Sửa lại tên các nút trên Sidebar cho rõ ràng
        - Up ảnh lên ở đâu? => Liên hệ Hải hỗ trợ
        - Thiếu trang thêm nhân sự
        - Style lại mấy cái modal Thêm địa điểm QC
        - Đổi function trong Controller sang kiểu Model
        - Sửa lỗi Xử lý Yêu cầu cấp phép
        BỎ CÁI FIELD delete TRONG COLLECTION report




Hải :
    - PHỤ TH BẢO
    Cán bộ :
        - Sort
    Database :
        - Phường/Quận : Người dân gửi báo cáo sẽ nhận được email thông báo về tình trạng và cách thức xử lý cho từng báo cáo một cách tự động


Tạo Tài khoản :
    - Quận 1 - Phường Nguyễn Cư Trinh
    - Quận 1 - Phường Phạm Ngũ Lão
    - Quận 5 - Phường 4
    - Quận 5 - Phường 3


