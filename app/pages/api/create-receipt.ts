import { CMS_API, CMS_RECEIPTS } from '@/constants/cms';
import { handleRequest, METHODS } from '@/utils/handleRequest';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler({ body: {
    productName,
    amount,
    productPrice
} = {} }: NextApiRequest, res: NextApiResponse) {
    try {
        const receipt = await handleRequest(`${CMS_API}${CMS_RECEIPTS}`, METHODS.POST, {
            "data": {
                "product": [
                    {
                        productName,
                        amount,
                        productPrice
                    }
                ]
            }
        })
        res.json(receipt.data);
    } catch {
        res.json(undefined);
    };
};
