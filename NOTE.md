
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
        - Lọc ra những báo cáo trùng Địa điểm QC / Bảng QC => Nếu Đã Xử lý 1 cái, thì những cái còn lại thành Từ chối - check


        * CHỈ NHỮNG CÁI BÁO CÁO về `BẢNG QUẢNG CÁO` hoặc là `ĐỊA ĐIỂM QUẢNG CÁO`
          khi MÀ được duyệt là 'ĐÃ XỬ LÝ' THÌ PHẢI ĐỔI reportId của adLocation và ad tương ứng
          Còn nếu mà Từ chối thì ko cần cập nhật reportId của adLocation và ad
Bảo :
    Sở :
    - Thống kê - Chưa
    - Chỉnh sửa tài khoản Cán bộ (P/Q/S) :
        + Thêm gmail, fb id - check
    - Sửa lại tên các nút trên Sidebar cho rõ ràng
    - Up ảnh lên ở đâu? => Liên hệ Hải hỗ trợ - check
    - Thiếu trang thêm nhân sự - check
    - Style lại mấy cái modal Thêm địa điểm QC - check

    BỎ CÁI FIELD delete TRONG COLLECTION report - check



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



Sau khi accept, dò theo locationId
Add thêm adId mới
-> ads
reportId: ""
size: ...
name
