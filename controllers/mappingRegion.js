

function mappingRegion(idQuan, idPhuong) {

    const district = hochiminh.find(d => d.idQuan === idQuan);

    if (district) {
        const ward = district.wards.find(w => w.idPhuong === idPhuong);
        return ward ?
        {
            quan: district.name,
            phuong: ward.name
        } : null;
    }
    return null;
}

module.exports = mappingRegion;

const hochiminh = [
    {
        "name": "Quận 1",
        "division_type": "2",
        "idQuan": "quan_1",
        "wards": [
            {
                "name": "Phường Tân Định",
                "division_type": "3",
                "idPhuong": "phuong_tan_dinh"
            },
            {
                "name": "Phường Đa Kao",
                "division_type": "3",
                "idPhuong": "phuong_da_kao"
            },
            {
                "name": "Phường Bến Nghé",
                "division_type": "3",
                "idPhuong": "phuong_ben_nghe"
            },
            {
                "name": "Phường Bến Thành",
                "division_type": "3",
                "idPhuong": "phuong_ben_thanh"
            },
            {
                "name": "Phường Nguyễn Thái Bình",
                "division_type": "3",
                "idPhuong": "phuong_nguyen_thai_binh"
            },
            {
                "name": "Phường Phạm Ngũ Lão",
                "division_type": "3",
                "idPhuong": "phuong_pham_ngu_lao"
            },
            {
                "name": "Phường Cầu Ông Lãnh",
                "division_type": "3",
                "idPhuong": "phuong_cau_ong_lanh"
            },
            {
                "name": "Phường Cô Giang",
                "division_type": "3",
                "idPhuong": "phuong_co_giang"
            },
            {
                "name": "Phường Nguyễn Cư Trinh",
                "division_type": "3",
                "idPhuong": "phuong_nguyen_cu_trinh"
            },
            {
                "name": "Phường Cầu Kho",
                "division_type": "3",
                "idPhuong": "phuong_cau_kho"
            }
        ]
    },
    {
        "name": "Quận 12",
        "division_type": "2",
        "idQuan": "quan_12",
        "wards": [
            {
                "name": "Phường Thạnh Xuân",
                "division_type": "3",
                "idPhuong": "phuong_thanh_xuan"
            },
            {
                "name": "Phường Thạnh Lộc",
                "division_type": "3",
                "idPhuong": "phuong_thanh_loc"
            },
            {
                "name": "Phường Hiệp Thành",
                "division_type": "3",
                "idPhuong": "phuong_hiep_thanh"
            },
            {
                "name": "Phường Thới An",
                "division_type": "3",
                "idPhuong": "phuong_thoi_an"
            },
            {
                "name": "Phường Tân Chánh Hiệp",
                "division_type": "3",
                "idPhuong": "phuong_tan_chanh_hiep"
            },
            {
                "name": "Phường An Phú Đông",
                "division_type": "3",
                "idPhuong": "phuong_an_phu_dong"
            },
            {
                "name": "Phường Tân Thới Hiệp",
                "division_type": "3",
                "idPhuong": "phuong_tan_thoi_hiep"
            },
            {
                "name": "Phường Trung Mỹ Tây",
                "division_type": "3",
                "idPhuong": "phuong_trung_my_tay"
            },
            {
                "name": "Phường Tân Hưng Thuận",
                "division_type": "3",
                "idPhuong": "phuong_tan_hung_thuan"
            },
            {
                "name": "Phường Đông Hưng Thuận",
                "division_type": "3",
                "idPhuong": "phuong_dong_hung_thuan"
            },
            {
                "name": "Phường Tân Thới Nhất",
                "division_type": "3",
                "idPhuong": "phuong_tan_thoi_nhat"
            }
        ]
    },
    {
        "name": "Quận Gò Vấp",
        "division_type": "2",
        "idQuan": "quan_go_vap",
        "wards": [
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường 17",
                "division_type": "3",
                "idPhuong": "phuong_17"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_6"
            },
            {
                "name": "Phường 16",
                "division_type": "3",
                "idPhuong": "phuong_16"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            },
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_9"
            },
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_8"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            }
        ]
    },
    {
        "name": "Quận Bình Thạnh",
        "division_type": "2",
        "idQuan": "quan_binh_thanh",
        "wards": [
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 27",
                "division_type": "3",
                "idPhuong": "phuong_27"
            },
            {
                "name": "Phường 26",
                "division_type": "3",
                "idPhuong": "phuong_26"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 25",
                "division_type": "3",
                "idPhuong": "phuong_25"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            },
            {
                "name": "Phường 24",
                "division_type": "3",
                "idPhuong": "phuong_24"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_06"
            },
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 17",
                "division_type": "3",
                "idPhuong": "phuong_17"
            },
            {
                "name": "Phường 21",
                "division_type": "3",
                "idPhuong": "phuong_21"
            },
            {
                "name": "Phường 22",
                "division_type": "3",
                "idPhuong": "phuong_22"
            },
            {
                "name": "Phường 19",
                "division_type": "3",
                "idPhuong": "phuong_19"
            },
            {
                "name": "Phường 28",
                "division_type": "3",
                "idPhuong": "phuong_28"
            }
        ]
    },
    {
        "name": "Quận Tân Bình",
        "division_type": "2",
        "idQuan": "quan_tan_binh",
        "wards": [
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_06"
            },
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_08"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            }
        ]
    },
    {
        "name": "Quận Tân Phú",
        "division_type": "2",
        "idQuan": "quan_tan_phu",
        "wards": [
            {
                "name": "Phường Tân Sơn Nhì",
                "division_type": "3",
                "idPhuong": "phuong_tan_son_nhi"
            },
            {
                "name": "Phường Tây Thạnh",
                "division_type": "3",
                "idPhuong": "phuong_tay_thanh"
            },
            {
                "name": "Phường Sơn Kỳ",
                "division_type": "3",
                "idPhuong": "phuong_son_ky"
            },
            {
                "name": "Phường Tân Quý",
                "division_type": "3",
                "idPhuong": "phuong_tan_quy"
            },
            {
                "name": "Phường Tân Thành",
                "division_type": "3",
                "idPhuong": "phuong_tan_thanh"
            },
            {
                "name": "Phường Phú Thọ Hòa",
                "division_type": "3",
                "idPhuong": "phuong_phu_tho_hoa"
            },
            {
                "name": "Phường Phú Thạnh",
                "division_type": "3",
                "idPhuong": "phuong_phu_thanh"
            },
            {
                "name": "Phường Phú Trung",
                "division_type": "3",
                "idPhuong": "phuong_phu_trung"
            },
            {
                "name": "Phường Hòa Thạnh",
                "division_type": "3",
                "idPhuong": "phuong_hoa_thanh"
            },
            {
                "name": "Phường Hiệp Tân",
                "division_type": "3",
                "idPhuong": "phuong_hiep_tan"
            },
            {
                "name": "Phường Tân Thới Hòa",
                "division_type": "3",
                "idPhuong": "phuong_tan_thoi_hoa"
            }
        ]
    },
    {
        "name": "Quận Phú Nhuận",
        "division_type": "2",
        "idQuan": "quan_phu_nhuan",
        "wards": [
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_08"
            },
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 17",
                "division_type": "3",
                "idPhuong": "phuong_17"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            }
        ]
    },
    {
        "name": "Thành phố Thủ Đức",
        "division_type": "2",
        "idQuan": "thanh_pho_thu_duc",
        "wards": [
            {
                "name": "Phường Linh Xuân",
                "division_type": "3",
                "idPhuong": "phuong_linh_xuan"
            },
            {
                "name": "Phường Bình Chiểu",
                "division_type": "3",
                "idPhuong": "phuong_binh_chieu"
            },
            {
                "name": "Phường Linh Trung",
                "division_type": "3",
                "idPhuong": "phuong_linh_trung"
            },
            {
                "name": "Phường Tam Bình",
                "division_type": "3",
                "idPhuong": "phuong_tam_binh"
            },
            {
                "name": "Phường Tam Phú",
                "division_type": "3",
                "idPhuong": "phuong_tam_phu"
            },
            {
                "name": "Phường Hiệp Bình Phước",
                "division_type": "3",
                "idPhuong": "phuong_hiep_binh_phuoc"
            },
            {
                "name": "Phường Hiệp Bình Chánh",
                "division_type": "3",
                "idPhuong": "phuong_hiep_binh_chanh"
            },
            {
                "name": "Phường Linh Chiểu",
                "division_type": "3",
                "idPhuong": "phuong_linh_chieu"
            },
            {
                "name": "Phường Linh Tây",
                "division_type": "3",
                "idPhuong": "phuong_linh_tay"
            },
            {
                "name": "Phường Linh Đông",
                "division_type": "3",
                "idPhuong": "phuong_linh_dong"
            },
            {
                "name": "Phường Bình Thọ",
                "division_type": "3",
                "idPhuong": "phuong_binh_tho"
            },
            {
                "name": "Phường Trường Thọ",
                "division_type": "3",
                "idPhuong": "phuong_truong_tho"
            },
            {
                "name": "Phường Long Bình",
                "division_type": "3",
                "idPhuong": "phuong_long_binh"
            },
            {
                "name": "Phường Long Thạnh Mỹ",
                "division_type": "3",
                "idPhuong": "phuong_long_thanh_my"
            },
            {
                "name": "Phường Tân Phú",
                "division_type": "3",
                "idPhuong": "phuong_tan_phu"
            },
            {
                "name": "Phường Hiệp Phú",
                "division_type": "3",
                "idPhuong": "phuong_hiep_phu"
            },
            {
                "name": "Phường Tăng Nhơn Phú A",
                "division_type": "3",
                "idPhuong": "phuong_tang_nhon_phu_a"
            },
            {
                "name": "Phường Tăng Nhơn Phú B",
                "division_type": "3",
                "idPhuong": "phuong_tang_nhon_phu_b"
            },
            {
                "name": "Phường Phước Long B",
                "division_type": "3",
                "idPhuong": "phuong_phuoc_long_b"
            },
            {
                "name": "Phường Phước Long A",
                "division_type": "3",
                "idPhuong": "phuong_phuoc_long_a"
            },
            {
                "name": "Phường Trường Thạnh",
                "division_type": "3",
                "idPhuong": "phuong_truong_thanh"
            },
            {
                "name": "Phường Long Phước",
                "division_type": "3",
                "idPhuong": "phuong_long_phuoc"
            },
            {
                "name": "Phường Long Trường",
                "division_type": "3",
                "idPhuong": "phuong_long_truong"
            },
            {
                "name": "Phường Phước Bình",
                "division_type": "3",
                "idPhuong": "phuong_phuoc_binh"
            },
            {
                "name": "Phường Phú Hữu",
                "division_type": "3",
                "idPhuong": "phuong_phu_huu"
            },
            {
                "name": "Phường Thảo Điền",
                "division_type": "3",
                "idPhuong": "phuong_thao_dien"
            },
            {
                "name": "Phường An Phú",
                "division_type": "3",
                "idPhuong": "phuong_an_phu"
            },
            {
                "name": "Phường An Khánh",
                "division_type": "3",
                "idPhuong": "phuong_an_khanh"
            },
            {
                "name": "Phường Bình Trưng Đông",
                "division_type": "3",
                "idPhuong": "phuong_binh_trung_dong"
            },
            {
                "name": "Phường Bình Trưng Tây",
                "division_type": "3",
                "idPhuong": "phuong_binh_trung_tay"
            },
            {
                "name": "Phường Cát Lái",
                "division_type": "3",
                "idPhuong": "phuong_cat_lai"
            },
            {
                "name": "Phường Thạnh Mỹ Lợi",
                "division_type": "3",
                "idPhuong": "phuong_thanh_my_loi"
            },
            {
                "name": "Phường An Lợi Đông",
                "division_type": "3",
                "idPhuong": "phuong_an_loi_dong"
            },
            {
                "name": "Phường Thủ Thiêm",
                "division_type": "3",
                "idPhuong": "phuong_thu_thiem"
            }
        ]
    },
    {
        "name": "Quận 3",
        "division_type": "2",
        "idQuan": "quan_3",
        "wards": [
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường Võ Thị Sáu",
                "division_type": "3",
                "idPhuong": "phuong_vo_thi_sau"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            }
        ]
    },
    {
        "name": "Quận 10",
        "division_type": "2",
        "idQuan": "quan_10",
        "wards": [
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_08"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_06"
            }
        ]
    },
    {
        "name": "Quận 11",
        "division_type": "2",
        "idQuan": "quan_11",
        "wards": [
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_08"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_06"
            },
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 16",
                "division_type": "3",
                "idPhuong": "phuong_16"
            }
        ]
    },
    {
        "name": "Quận 4",
        "division_type": "2",
        "idQuan": "quan_4",
        "wards": [
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_06"
            },
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_08"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 18",
                "division_type": "3",
                "idPhuong": "phuong_18"
            },
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 16",
                "division_type": "3",
                "idPhuong": "phuong_16"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            }
        ]
    },
    {
        "name": "Quận 5",
        "division_type": "2",
        "idQuan": "quan_5",
        "wards": [
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_08"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_06"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            }
        ]
    },
    {
        "name": "Quận 6",
        "division_type": "2",
        "idQuan": "quan_6",
        "wards": [
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_06"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_08"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            }
        ]
    },
    {
        "name": "Quận 8",
        "division_type": "2",
        "idQuan": "quan_8",
        "wards": [
            {
                "name": "Phường 8",
                "division_type": "3",
                "idPhuong": "phuong_08"
            },
            {
                "name": "Phường 2",
                "division_type": "3",
                "idPhuong": "phuong_02"
            },
            {
                "name": "Phường 1",
                "division_type": "3",
                "idPhuong": "phuong_01"
            },
            {
                "name": "Phường 3",
                "division_type": "3",
                "idPhuong": "phuong_03"
            },
            {
                "name": "Phường 11",
                "division_type": "3",
                "idPhuong": "phuong_11"
            },
            {
                "name": "Phường 9",
                "division_type": "3",
                "idPhuong": "phuong_09"
            },
            {
                "name": "Phường 10",
                "division_type": "3",
                "idPhuong": "phuong_10"
            },
            {
                "name": "Phường 4",
                "division_type": "3",
                "idPhuong": "phuong_04"
            },
            {
                "name": "Phường 13",
                "division_type": "3",
                "idPhuong": "phuong_13"
            },
            {
                "name": "Phường 12",
                "division_type": "3",
                "idPhuong": "phuong_12"
            },
            {
                "name": "Phường 5",
                "division_type": "3",
                "idPhuong": "phuong_05"
            },
            {
                "name": "Phường 14",
                "division_type": "3",
                "idPhuong": "phuong_14"
            },
            {
                "name": "Phường 6",
                "division_type": "3",
                "idPhuong": "phuong_06"
            },
            {
                "name": "Phường 15",
                "division_type": "3",
                "idPhuong": "phuong_15"
            },
            {
                "name": "Phường 16",
                "division_type": "3",
                "idPhuong": "phuong_16"
            },
            {
                "name": "Phường 7",
                "division_type": "3",
                "idPhuong": "phuong_07"
            }
        ]
    },
    {
        "name": "Quận Bình Tân",
        "division_type": "2",
        "idQuan": "quan_binh_tan",
        "wards": [
            {
                "name": "Phường Bình Hưng Hòa",
                "division_type": "3",
                "idPhuong": "phuong_binh_hung_hoa"
            },
            {
                "name": "Phường Bình Hưng Hoà A",
                "division_type": "3",
                "idPhuong": "phuong_binh_hung_hoa_a"
            },
            {
                "name": "Phường Bình Hưng Hoà B",
                "division_type": "3",
                "idPhuong": "phuong_binh_hung_hoa_b"
            },
            {
                "name": "Phường Bình Trị Đông",
                "division_type": "3",
                "idPhuong": "phuong_binh_tri_dong"
            },
            {
                "name": "Phường Bình Trị Đông A",
                "division_type": "3",
                "idPhuong": "phuong_binh_tri_dong_a"
            },
            {
                "name": "Phường Bình Trị Đông B",
                "division_type": "3",
                "idPhuong": "phuong_binh_tri_dong_b"
            },
            {
                "name": "Phường Tân Tạo",
                "division_type": "3",
                "idPhuong": "phuong_tan_tao"
            },
            {
                "name": "Phường Tân Tạo A",
                "division_type": "3",
                "idPhuong": "phuong_tan_tao_a"
            },
            {
                "name": "Phường An Lạc",
                "division_type": "3",
                "idPhuong": "phuong_an_lac"
            },
            {
                "name": "Phường An Lạc A",
                "division_type": "3",
                "idPhuong": "phuong_an_lac_a"
            }
        ]
    },
    {
        "name": "Quận 7",
        "division_type": "2",
        "idQuan": "quan_7",
        "wards": [
            {
                "name": "Phường Tân Thuận Đông",
                "division_type": "3",
                "idPhuong": "phuong_tan_thuan_dong"
            },
            {
                "name": "Phường Tân Thuận Tây",
                "division_type": "3",
                "idPhuong": "phuong_tan_thuan_tay"
            },
            {
                "name": "Phường Tân Kiểng",
                "division_type": "3",
                "idPhuong": "phuong_tan_kieng"
            },
            {
                "name": "Phường Tân Hưng",
                "division_type": "3",
                "idPhuong": "phuong_tan_hung"
            },
            {
                "name": "Phường Bình Thuận",
                "division_type": "3",
                "idPhuong": "phuong_binh_thuan"
            },
            {
                "name": "Phường Tân Quy",
                "division_type": "3",
                "idPhuong": "phuong_tan_quy"
            },
            {
                "name": "Phường Phú Thuận",
                "division_type": "3",
                "idPhuong": "phuong_phu_thuan"
            },
            {
                "name": "Phường Tân Phú",
                "division_type": "3",
                "idPhuong": "phuong_tan_phu"
            },
            {
                "name": "Phường Tân Phong",
                "division_type": "3",
                "idPhuong": "phuong_tan_phong"
            },
            {
                "name": "Phường Phú Mỹ",
                "division_type": "3",
                "idPhuong": "phuong_phu_my"
            }
        ]
    },
    {
        "name": "Huyện Củ Chi",
        "division_type": "2",
        "idQuan": "huyen_cu_chi",
        "wards": [
            {
                "name": "Thị trấn Củ Chi",
                "division_type": "3",
                "idPhuong": "thi_tran_cu_chi"
            },
            {
                "name": "Xã Phú Mỹ Hưng",
                "division_type": "3",
                "idPhuong": "xa_phu_my_hung"
            },
            {
                "name": "Xã An Phú",
                "division_type": "3",
                "idPhuong": "xa_an_phu"
            },
            {
                "name": "Xã Trung Lập Thượng",
                "division_type": "3",
                "idPhuong": "xa_trung_lap_thuong"
            },
            {
                "name": "Xã An Nhơn Tây",
                "division_type": "3",
                "idPhuong": "xa_an_nhon_tay"
            },
            {
                "name": "Xã Nhuận Đức",
                "division_type": "3",
                "idPhuong": "xa_nhuan_duc"
            },
            {
                "name": "Xã Phạm Văn Cội",
                "division_type": "3",
                "idPhuong": "xa_pham_van_coi"
            },
            {
                "name": "Xã Phú Hòa Đông",
                "division_type": "3",
                "idPhuong": "xa_phu_hoa_dong"
            },
            {
                "name": "Xã Trung Lập Hạ",
                "division_type": "3",
                "idPhuong": "xa_trung_lap_ha"
            },
            {
                "name": "Xã Trung An",
                "division_type": "3",
                "idPhuong": "xa_trung_an"
            },
            {
                "name": "Xã Phước Thạnh",
                "division_type": "3",
                "idPhuong": "xa_phuoc_thanh"
            },
            {
                "name": "Xã Phước Hiệp",
                "division_type": "3",
                "idPhuong": "xa_phuoc_hiep"
            },
            {
                "name": "Xã Tân An Hội",
                "division_type": "3",
                "idPhuong": "xa_tan_an_hoi"
            },
            {
                "name": "Xã Phước Vĩnh An",
                "division_type": "3",
                "idPhuong": "xa_phuoc_vinh_an"
            },
            {
                "name": "Xã Thái Mỹ",
                "division_type": "3",
                "idPhuong": "xa_thai_my"
            },
            {
                "name": "Xã Tân Thạnh Tây",
                "division_type": "3",
                "idPhuong": "xa_tan_thanh_tay"
            },
            {
                "name": "Xã Hòa Phú",
                "division_type": "3",
                "idPhuong": "xa_hoa_phu"
            },
            {
                "name": "Xã Tân Thạnh Đông",
                "division_type": "3",
                "idPhuong": "xa_tan_thanh_dong"
            },
            {
                "name": "Xã Bình Mỹ",
                "division_type": "3",
                "idPhuong": "xa_binh_my"
            },
            {
                "name": "Xã Tân Phú Trung",
                "division_type": "3",
                "idPhuong": "xa_tan_phu_trung"
            },
            {
                "name": "Xã Tân Thông Hội",
                "division_type": "3",
                "idPhuong": "xa_tan_thong_hoi"
            }
        ]
    },
    {
        "name": "Huyện Hóc Môn",
        "division_type": "2",
        "idQuan": "huyen_hoc_mon",
        "wards": [
            {
                "name": "Thị trấn Hóc Môn",
                "division_type": "3",
                "idPhuong": "thi_tran_hoc_mon"
            },
            {
                "name": "Xã Tân Hiệp",
                "division_type": "3",
                "idPhuong": "xa_tan_hiep"
            },
            {
                "name": "Xã Nhị Bình",
                "division_type": "3",
                "idPhuong": "xa_nhi_binh"
            },
            {
                "name": "Xã Đông Thạnh",
                "division_type": "3",
                "idPhuong": "xa_dong_thanh"
            },
            {
                "name": "Xã Tân Thới Nhì",
                "division_type": "3",
                "idPhuong": "xa_tan_thoi_nhi"
            },
            {
                "name": "Xã Thới Tam Thôn",
                "division_type": "3",
                "idPhuong": "xa_thoi_tam_thon"
            },
            {
                "name": "Xã Xuân Thới Sơn",
                "division_type": "3",
                "idPhuong": "xa_xuan_thoi_son"
            },
            {
                "name": "Xã Tân Xuân",
                "division_type": "3",
                "idPhuong": "xa_tan_xuan"
            },
            {
                "name": "Xã Xuân Thới Đông",
                "division_type": "3",
                "idPhuong": "xa_xuan_thoi_dong"
            },
            {
                "name": "Xã Trung Chánh",
                "division_type": "3",
                "idPhuong": "xa_trung_chanh"
            },
            {
                "name": "Xã Xuân Thới Thượng",
                "division_type": "3",
                "idPhuong": "xa_xuan_thoi_thuong"
            },
            {
                "name": "Xã Bà Điểm",
                "division_type": "3",
                "idPhuong": "xa_ba_diem"
            }
        ]
    },
    {
        "name": "Huyện Bình Chánh",
        "division_type": "2",
        "idQuan": "huyen_binh_chanh",
        "wards": [
            {
                "name": "Thị trấn Tân Túc",
                "division_type": "3",
                "idPhuong": "thi_tran_tan_tuc"
            },
            {
                "name": "Xã Phạm Văn Hai",
                "division_type": "3",
                "idPhuong": "xa_pham_van_hai"
            },
            {
                "name": "Xã Vĩnh Lộc A",
                "division_type": "3",
                "idPhuong": "xa_vinh_loc_a"
            },
            {
                "name": "Xã Vĩnh Lộc B",
                "division_type": "3",
                "idPhuong": "xa_vinh_loc_b"
            },
            {
                "name": "Xã Bình Lợi",
                "division_type": "3",
                "idPhuong": "xa_binh_loi"
            },
            {
                "name": "Xã Lê Minh Xuân",
                "division_type": "3",
                "idPhuong": "xa_le_minh_xuan"
            },
            {
                "name": "Xã Tân Nhựt",
                "division_type": "3",
                "idPhuong": "xa_tan_nhut"
            },
            {
                "name": "Xã Tân Kiên",
                "division_type": "3",
                "idPhuong": "xa_tan_kien"
            },
            {
                "name": "Xã Bình Hưng",
                "division_type": "3",
                "idPhuong": "xa_binh_hung"
            },
            {
                "name": "Xã Phong Phú",
                "division_type": "3",
                "idPhuong": "xa_phong_phu"
            },
            {
                "name": "Xã An Phú Tây",
                "division_type": "3",
                "idPhuong": "xa_an_phu_tay"
            },
            {
                "name": "Xã Hưng Long",
                "division_type": "3",
                "idPhuong": "xa_hung_long"
            },
            {
                "name": "Xã Đa Phước",
                "division_type": "3",
                "idPhuong": "xa_da_phuoc"
            },
            {
                "name": "Xã Tân Quý Tây",
                "division_type": "3",
                "idPhuong": "xa_tan_quy_tay"
            },
            {
                "name": "Xã Bình Chánh",
                "division_type": "3",
                "idPhuong": "xa_binh_chanh"
            },
            {
                "name": "Xã Quy Đức",
                "division_type": "3",
                "idPhuong": "xa_quy_duc"
            }
        ]
    },
    {
        "name": "Huyện Nhà Bè",
        "division_type": "2",
        "idQuan": "huyen_nha_be",
        "wards": [
            {
                "name": "Thị trấn Nhà Bè",
                "division_type": "3",
                "idPhuong": "thi_tran_nha_be"
            },
            {
                "name": "Xã Phước Kiển",
                "division_type": "3",
                "idPhuong": "xa_phuoc_kien"
            },
            {
                "name": "Xã Phước Lộc",
                "division_type": "3",
                "idPhuong": "xa_phuoc_loc"
            },
            {
                "name": "Xã Nhơn Đức",
                "division_type": "3",
                "idPhuong": "xa_nhon_duc"
            },
            {
                "name": "Xã Phú Xuân",
                "division_type": "3",
                "idPhuong": "xa_phu_xuan"
            },
            {
                "name": "Xã Long Thới",
                "division_type": "3",
                "idPhuong": "xa_long_thoi"
            },
            {
                "name": "Xã Hiệp Phước",
                "division_type": "3",
                "idPhuong": "xa_hiep_phuoc"
            }
        ]
    },
    {
        "name": "Huyện Cần Giờ",
        "division_type": "2",
        "idQuan": "huyen_can_gio",
        "wards": [
            {
                "name": "Thị trấn Cần Thạnh",
                "division_type": "3",
                "idPhuong": "thi_tran_can_thanh"
            },
            {
                "name": "Xã Bình Khánh",
                "division_type": "3",
                "idPhuong": "xa_binh_khanh"
            },
            {
                "name": "Xã Tam Thôn Hiệp",
                "division_type": "3",
                "idPhuong": "xa_tam_thon_hiep"
            },
            {
                "name": "Xã An Thới Đông",
                "division_type": "3",
                "idPhuong": "xa_an_thoi_dong"
            },
            {
                "name": "Xã Thạnh An",
                "division_type": "3",
                "idPhuong": "xa_thanh_an"
            },
            {
                "name": "Xã Long Hòa",
                "division_type": "3",
                "idPhuong": "xa_long_hoa"
            },
            {
                "name": "Xã Lý Nhơn",
                "division_type": "3",
                "idPhuong": "xa_ly_nhon"
            }
        ]
    }
]