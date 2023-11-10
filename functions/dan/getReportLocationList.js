
const fakeReportLocationList = [
    {
        id: 1,
        type: 'tgsp',
        lng: 106.684880,
        lat: 10.764990,
    },
    {
        id: 2,
        type: 'dknd',
        lng: 106.686540,
        lat: 10.764274,
    },
    {
        id: 3,
        type: 'dgyk',
        lng: 106.688186,
        lat: 10.764136,
    },
    {
        id: 4,
        type: 'gdtm',
        lng: 106.690291,
        lat: 10.764111,
    },
]

export default async function getReportLocationList() {
    return fakeReportLocationList;
}