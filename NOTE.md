
### ====== PHÂN CÔNG ======

Nghĩa :

    Dân :
        - Send Report => Gửi thẳng lên Collection 'reports' /
        - LocalStorage [1h] /
        - Captcha Box [2h] /
        - Fetch Report [2h]
            => Khi fetch về thì chỉ lấy những cái là 'Từ chối' & 'Đã xử lý' & những cái reportId trong local storage đã gửi

    Phường+Quận :
        - Trang BanDo chưa làm xong [3h]
            => Cần làm Sidebar
            => Cần làm Nút danh sách báo cáo
            => Bản đồ mở rộng giới hạn view (tạo layer viền khu vực đó - nếu rảnh)
        - Geocoding Search bar (Final)
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