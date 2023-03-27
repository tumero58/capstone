import { CMS_API, POPULATE_ALL } from '@/constants/cms';
import { handleRequest, METHODS } from '@/utils/handleRequest';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler({ body: {
    field = ""
  } = {} }: NextApiRequest, res: NextApiResponse) {
    const products = await handleRequest(`${CMS_API}/${field}${POPULATE_ALL}`,METHODS.GET);
    res.json(products);
};

