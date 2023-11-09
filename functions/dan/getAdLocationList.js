
const fakeAdLocationList = [
    {
        id: 1,
        type: true,
        lng: 106.682667,
        lat: 10.762886,
    },
    {
        id: 2,
        type: true,
        lng: 106.683218,
        lat: 10.761180,
    },
    {
        id: 3,
        type: false,
        lng: 106.681622,
        lat: 10.765123,
    },
    {
        id: 4,
        type: false,
        lng: 106.689628,
        lat: 10.761667,
    },
    {
        id: 5,
        type: true,
        lng: 106.686656,
        lat: 10.762573,
    }
]

export default async function getAdLocationList() {
    return fakeAdLocationList;
}