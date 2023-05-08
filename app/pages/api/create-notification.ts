import { CMS_API, CMS_NOTIFICATIONS, DEFAULT_OPENED_STATUS } from '@/constants/cms';
import { handleRequest, METHODS } from '@/utils/handleRequest';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler({ body: {
    message
} = {} }: NextApiRequest, res: NextApiResponse) {
    try {
        const notification = await handleRequest(`${CMS_API}${CMS_NOTIFICATIONS}`, METHODS.POST, {
            "data": {
                message,
                "openedStatus": DEFAULT_OPENED_STATUS
            }
        })
        res.json(notification.data);
    } catch {
        res.json(undefined);
    };
};
