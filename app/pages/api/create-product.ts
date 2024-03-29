import { postProductCMS } from '@/utils/cmsUtils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler({ body: {
    name,
    amount,
    supplier,
    bio,
    buyPrice,
    sellPrice,
    maximumCapacity,
    minimumAmount,
    orderAutomation
} = {} }: NextApiRequest, res: NextApiResponse) {
    try {
        const productId = await postProductCMS(
            name,
            amount,
            supplier,
            bio,
            buyPrice,
            sellPrice,
            maximumCapacity,
            minimumAmount,
            orderAutomation
        )
        res.json(productId);
    } catch {
        res.json(undefined);
    };
};
