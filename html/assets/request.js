const PermissionReq = [
    {
        permissionReqId: 1,
        name: "Trụ panel",
        co: {
            id: "vincom",
            name: "Vin Cơm",
            email: "vcome@gmail.com",
            phone: "324932423"
        },
        locationId: 2,
        adId: 1,
        startdate: "22/12/2023",
        enddate: "22/12/2024",
        content: "Sơn tường MTP",
        status: 0,
    },
    {
        permissionReqId: 2,
        name: "Bảng quảng cáo 69",
        co: {
            id: "coopmart",
            name: "Cốp Mắc",
            email: "coopmart@gmail.com",
            phone: "543643"
        },
        locationId: 2,
        adId: 3,
        startdate: "24/10/2024",
        enddate: "24/01/2025",
        content: "Sơn tường MTP",
        status: 2,
    },
    {
        permissionReqId: 3,
        name: "Bảng quảng cáo 69",
        co: {
            id: "coopmart",
            name: "Cốp Mắc",
            email: "coopmart@gmail.com",
            phone: "543643"
        },
        locationId: 2,
        adId: 1,
        startdate: "24/10/2024",
        enddate: "24/01/2025",
        content: "Sơn tường MTP",
        status: 1,
    }
]

const ChangeReq = [
    {
        changeReqId: 1,
        locationId: 2,
        newLocationId: 2,
        senderRole: 2,
        date: "02/04/2024",
        reason: "Không phù hợp",
        status: 0
    },
    {
        changeReqId: 2,
        locationId: 1,
        newLocationId: 2,
        senderRole: 2,
        date: "02/04/2024",
        reason: "Không phù hợp",
        status: 1
    },
    {
        changeReqId: 3,
        locationId: 1,
        newLocationId: 2,
        senderRole: 2,
        date: "02/04/2024",
        reason: "Không phù hợp",
        status: 2
    }
]

module.exports = {
    PermissionReq,
    ChangeReq
}