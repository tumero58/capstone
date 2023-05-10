export interface ICMSProduct {
    id: string;
    attributes: {
        name: string;
        amount: string;
        supplier: string;
        bio: string;
        buyPrice: string;
        sellPrice: string;
        maximumCapacity: string;
        minimumAmount: string;
        orderAutomation: boolean;
        image: {
            data: {
                attributes: {
                    url: string
                }
            }
        };
    }
}

export interface IProduct {
    id: string;
    name: string;
    amount: string;
    supplier: string;
    bio: string;
    buyPrice: string;
    sellPrice: string;
    maximumCapacity: string;
    minimumAmount: string;
    orderAutomation: boolean;
    image: string | null;
}