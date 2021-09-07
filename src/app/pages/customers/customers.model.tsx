export interface CustomersModel {
    [X: string]: any;
}

export const masterData: CustomersModel[] = [
    {
        _id: '000001',
        code: '000001',
        phone: '0868670715',
        createdAt: new Date()
    },
    {
        _id: '000002',
        code: '000002',
        phone: '0969333010',
        createdAt: new Date()
    },
    {
        _id: '000003',
        code: '000003',
        phone: '0974947335',
        createdAt: new Date()
    },
    {
        _id: '000004',
        code: '000004',
        phone: '0245748956',
        createdAt: new Date()
    },
]

export const historyData: any[] = [
    {
        buyDate: new Date(),
        species: {
            _id: 'abc',
            name: 'Rau muống',
        },
        qr: {
            _id: 'ABCXYZ1234A'
        },
        store: {
            _id: 'csvks',
            name: 'Đại lý số 1',
            seller: {
                _id: 'cávav',
                name: 'Nguyễn Văn A'
            }
        },

    }
]