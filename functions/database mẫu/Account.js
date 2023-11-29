// LƯU THÌ SẼ LƯU NHƯ THẾ NÀY
// NHƯNG KHI TRẢ DỮ LIỆU THÌ SẼ PHẢI GHÉP BẢNG/THAM CHIẾU NHÉ

const Account = [
    {
        accountId: 1,
        role: 1, // 1: Phường , 2: Quận, 3: Sở
        
        username: "",
        password: "", // (bcrypt) 

        idQuan: "5",   // Quận 5
        idPhuong: "4", // Phường 4

        fullname: "Khoa Meng",
        dob: '31/12/2023',
        email: 'test@gmail.com',
        phone: '0123456789',
    },
    {
        accountId: 2,
        role: 2, // Cán bộ Quận

        username: "",
        password: "", // (bcrypt)

        idQuan: "6",   // Quận 6
        idPhuong: "",

        fullname: "Khoa Meng",
        dob: '31/12/2023',
        email: 'test@gmail.com',
        phone: '0123456789',
    },
    {
        accountId: 3,
        role: 3, // Cán bộ Sở

        username: "",
        password: "", // (bcrypt)

        idQuan: "",
        idPhuong: "",

        fullname: "Khoa Meng",
        dob: '31/12/2023',
        email: 'test@gmail.com',
        phone: '0123456789',
    }
]
