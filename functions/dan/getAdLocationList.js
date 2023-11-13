
const fakeAdLocationList = [
    {
        id: 1,
        quyhoach: true,
        longitude: 106.683218,
        latitude: 10.761180,
    },
    {
        id: 2,
        quyhoach: false,
        longitude: 106.681622,
        latitude: 10.765123,
    },
    {
        id: 3,
        quyhoach: false,
        longitude: 106.689628,
        latitude: 10.761667,
    },
    {
        id: 4,
        quyhoach: true,
        longitude: 106.686656,
        latitude: 10.762573,
    }
]

export default async function getAdLocationList() {
    return fakeAdLocationList;
}