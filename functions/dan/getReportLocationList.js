
const fakeReportLocationList = [
    {
        id: 1,
        type: 'tgsp',
        longitude: 106.684880,
        latitude: 10.764990,
    },
    {
        id: 2,
        type: 'dknd',
        longitude: 106.686540,
        latitude: 10.764274,
    },
    {
        id: 3,
        type: 'dgyk',
        longitude: 106.688186,
        latitude: 10.764136,
    },
    {
        id: 4,
        type: 'gdtm',
        longitude: 106.690291,
        latitude: 10.764111,
    },
]

export default async function getReportLocationList() {
    return fakeReportLocationList;
}