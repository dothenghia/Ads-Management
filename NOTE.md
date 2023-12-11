API Key : AIzaSyDorTHtdzjlwow2eDY0l3hsLQa-GjDgAns

### ====== SEMINAR MAPBOX ======
1. Hướng dẫn tạo tài khoản + Lấy Token
2. Hướng init nhúng cái bản đồ dô file index.html
3. Hướng dẫn tạo Marker bằng cách render layer từ data GeoJSON
4. Hướng dẫn Clustering các marker 
5. Nói về reverseGeocoding (Optional)
6. Nói về Xử lí Hover, Click vào điểm marker

Khoa : 1,3,4
Nghĩa : 2,5,6
=> Soạn cho mấy đứa mẫu giáo cũng đọc được lun


### ====== PHÂN CÔNG ======

Nghĩa :
    Dân :
        - Geocoding Search bar
        - Send Report + LocalStorage (Hỏi xem send vào Collection nào ??)
            => Gửi thăng rlên Collection 'reports'
            => Khi fetch về thì chỉ lấy những cái là 'Từ chối' & 'Đã xử lý' & reportId đã gửi
    Phường+Quận :
        - Trang BanDo chưa làm xong
            => Cần làm Sidebar
            => Cần làm Nút danh sách báo cáo
            => Bản đồ mở rộng giới hạn view (tạo layer viền khu vực đó - nếu rảnh)

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
    - thống nhất đặt id phường trong adlocation để chỉnh sửa trong getLocation
    - Delete h sẽ k dùng được, chỉ có hiệu ứng hiển thị modal
    - Chốt những kiểu dữ liệu được lưu tren firebase
    - accounts chuyển từ hashed pass -> pass
    - Edit khu vực bên nhân sự có thể geocoding reverse?
    Sở :
    - Thống kê
    - Trang Cấp Phép, Điều Chỉnh -> Chỉ có Duyệt thoi
    - Bỏ hết những cái nút Thêm (Trừ trang Nhân sự)
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