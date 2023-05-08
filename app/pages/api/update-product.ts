import { CMS_API, CMS_PRODUCTS } from '@/constants/cms';
import { handleRequest, METHODS } from '@/utils/handleRequest';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler({ body: {
    productId,
    body
} = {} }: NextApiRequest, res: NextApiResponse) {
    try {
        const putRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${productId}`, METHODS.PUT, {
            "data": body
        });
        res.json(putRes.data);
    } catch {
        res.json(undefined);
    };
};



