export interface PackingProduct {
    _id: string;
    scanLocation: {
        coordinates: any[]
    };
    children: any[];
    createdBy: string | any;
    activeBy: {
        _id: string;
        fullName: string;
        [X: string]: any;
    };
    activeAt: Date | string;
    type: string;
    productPlan: string | any;
    enterprise: {
        [X: string]: string;
    };
    code: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    scanAt: Date | string;
    scanBy: {
        _id: string;
        fullName: string;
        [X: string]: string;
    };
    [X: string]: any;
}

export const ProductData: any[] = [
    {
        _id: "ABC123ABC123ABC123ABC123",
        assignDate: new Date(),
        activeAt: new Date(),
        identification: '8935005801029',
        activeBy: {
            _id: '1234676135',
            fullName: 'Nguyễn Văn A',
        },
        scanBy: {
            _id: '1234676135dầgdg',
            fullName: 'Nguyễn Văn B',
        },
        expiry: new Date()
    },
    {
        _id: "ABC123ABC123ABC123ABC124",
        assignDate: new Date(),
        activeAt: new Date(),
        identification: '8935005801029',
        activeBy: {
            _id: '1234676135',
            fullName: 'Nguyễn Văn A',
        },
        scanBy: {
            _id: '1234676135dầgdg',
            fullName: 'Nguyễn Văn B',
        },
        expiry: new Date()
    },
    {
        _id: "ABC123ABC123ABC123ABC125",
        assignDate: new Date(),
        activeAt: new Date(),
        identification: '8935005801029',
        activeBy: {
            _id: '1234676135',
            fullName: 'Nguyễn Văn A',
        },
        scanBy: {
            _id: '1234676135dầgdg',
            fullName: 'Nguyễn Văn B',
        },
        expiry: new Date()
    },
    {
        _id: "ABC123ABC123ABC123ABC126",
        assignDate: new Date(),
        activeAt: new Date(),
        identification: '8935005801029',
        activeBy: {
            _id: '1234676135',
            fullName: 'Nguyễn Văn A',
        },
        scanBy: {
            _id: '1234676135dầgdg',
            fullName: 'Nguyễn Văn B',
        },
        expiry: new Date()
    }
]