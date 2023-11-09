
const fakeReportList = [
    {
        id: 1,
        title: 'Report 1',
        description: 'This is a report',
        date: '2023-01-01',
    },
    {
        id: 2,
        title: 'Report 2',
        description: 'This is another report',
        date: '2023-01-02',
    },
    {
        id: 3,
        title: 'Report 3',
        description: 'This is yet another report',
        date: '2023-01-03',
    },
    {
        id: 4,
        title: 'Report 4',
        description: 'This is final report in the list',
        date: '2023-01-04',
    }
]

export default async function getReportList() {
    return fakeReportList;
}
