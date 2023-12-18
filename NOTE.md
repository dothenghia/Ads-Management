
### ====== SEMINAR MAPBOX ======
0. Giới thiệu mở đầu
1. Hướng dẫn tạo tài khoản + Lấy Token
2. Hướng init nhúng cái bản đồ dô file index.html
3. Hướng dẫn tạo Marker bằng cách render layer từ data GeoJSON
4. Hướng dẫn Clustering các marker 
5. Nói về Xử lí Hover, Click vào điểm marker
6. Nói về reverseGeocoding

Khoa : 1,3,4
Nghĩa : 0,2,5,6
=> Soạn cho mấy đứa mẫu giáo cũng đọc được lun


### ====== [GẤP] ĐỔI DATABASE VỀ MONGODB ======
1. Những phần có thể giữ nguyên bên Firebase :
- Storage

2. Những phần sẽ chuyển sang Mongo :
- FireStore -> MongoDB
    + Có cách Export/Import mấy cái collection 'ads', 'adLocations', 'reports'... (Khoa)

- Convert Code các hàm chức năng
    + Chỉ đơn giản là thay đổi Cú pháp của Firebase thành cú pháp của Mongo (Nhờ ChatGPT hỗ trợ)

3. PHÂN CÔNG :
Hải : `GẤP PHẢI XONG TRONG HÔM NAY -> ĐỂ MẤY ĐỨA KIA MỚI CÓ THỂ LÀM TASK TỤI NÓ`
- Setup MongoDB cho project (Tạo Database MongoDB)
- Tạo các file example cho Cán bộ và Người dân (Liên kết Mongo dô lấy và ghi dữ liệu mẫu thử y chang lần trước)
- Collection 'reports' thêm 'solution' -> là dạng string lưu Phương thức xử lý
- Đổi lại hết những field 'time' thành dạng timestamp/date gì đó

`TRONG LÚC CHỜ HẢI -> LÀM NHỮNG CÁI TASK KO DÍNH TỚI DATABASE: UI, STYLE, XỬ LÝ BUG, KỊCH BẢN SEMINAR`
Nghĩa :
- Chuyển đổi hàm chức năng sang cú pháp của MongoDB cho Người Dân

Khoa :
- Chuyển đổi hàm chức năng sang cú pháp của MongoDB cho Phường + Quận

Bảo :
- Chuyển đổi hàm chức năng sang cú pháp của MongoDB cho Sở

CÁI NÀY ĐANG GẤP NHẤT -> NÊN LÀ BỎ HẾT NHỮNG CÁI ĐANG LÀM -> CHUYỂN SANG LÀM NÓ TRƯỚC NHE
LÀM XONG HẾT THÌ MỚI TIẾP TỤC NHỮNG CÁI KIA NHA



### ====== PHÂN CÔNG ======

Nghĩa :
    Dân :
        - Geocoding Search bar
        - Send Report + LocalStorage (Hỏi xem send vào Collection nào ??)
            => Gửi thăng rlên Collection 'reports'
            => Khi fetch về thì chỉ lấy những cái là 'Từ chối' & 'Đã xử lý' & reportId đã gửi
        - Captcha Box
    Phường+Quận :
        - Trang BanDo chưa làm xong
            => Cần làm Sidebar
            => Cần làm Nút danh sách báo cáo
            => Bản đồ mở rộng giới hạn view (tạo layer viền khu vực đó - nếu rảnh)
        - Guide Marker (Optional)

Khoa :
    Phường + Quận :
        + Xử lý báo cáo -> Làm lại chỉn chu đẹp đẹp
        - Trang Thông tin quảng cáo, Điều chỉnh, Báo cáo
            => Fix bug Filter
        - Trang Báo cáo :
            => Địa chỉ, phường quận => reverseGeocoding
            => Style lại (Phương thức xử lý bớt border-radius lại xíu)
            Đổi cái Phương thức xử lý xún dưới + Thêm border phân ra
        - Trang yêu cầu cấp phép :
            => Style lại mấy ô input
            => Vào collection 'adLocation' lọc ra danh sách các idQuan
            Mỗi idQuan lọc ra danh sách idPhuong
            VD :
                quan_1 : [
                    phuong_1,
                    phuong_3,
                ],
                quan_5: [
                    phuong_4: [
                        duong: "Nguyễn Văn Cừ - An Dương Vương",
                        duong: "Trần Phú - Trần Bình Trọng",
                    ],
                    phuong_6
                ], ...

Bảo :
    - Thêm từng collect isDelete - Done
    - thống nhất đặt id phường trong adlocation để chỉnh sửa trong getLocation  - done
    - Delete h sẽ k dùng được, chỉ có hiệu ứng hiển thị modal - Chưa
    - database có hỗ trợ date (yy-mm-dd) nhớ viết hàm convert - Done
    
    - Detail Cấp Phép chưa có nút accept - Chưa
    Sở :
    - Thống kê - Chưa
    - Trang Cấp Phép, Điều Chỉnh -> Chỉ có Duyệt thoi  - Done
    - Bỏ hết những cái nút Thêm (Trừ trang Nhân sự) - Done
    - Tạo thêm các nhân sự :
        + 2 quận
        + Mỗi quận thì 2 phường



Hải :
    Cán bộ :
    - Sort
    - Check Đăng nhập cùng 1 tài khoản cùng lúc
    Database :
    - Collection 'reports' thêm 'solution' -> Phương thức xử lý
    - Đổi lại hết những field 'time' thành dạng timestamp
    - 