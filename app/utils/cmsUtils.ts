import { CMS_API, CMS_PRODUCTS, CMS_PRODUCTS_REF, CMS_UPLOAD, IMAGE_FIELD } from "@/constants/cms";
import { handleRequest, METHODS } from "./handleRequest";

export const postProductCMS = async (
    name: string,
    amount: number,
    supplier: string,
    bio: string,
    buyPrice: number,
    sellPrice: number,
    maximumCapacity: number,
    minimumAmount: number,
    orderAutomation: boolean
) => {
    const postRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}`, METHODS.POST, {
        "data": {
            name,
            amount,
            supplier,
            bio,
            buyPrice,
            sellPrice,
            maximumCapacity,
            minimumAmount,
            orderAutomation
        }
    });
    return postRes.data.id;
};

export const postImage = async (productId: string, imageFile: Blob) => {
    if (productId) {
        if (imageFile) {
            const formData = new FormData();
            formData.append("ref", CMS_PRODUCTS_REF);
            formData.append("refId", productId);
            formData.append("field", IMAGE_FIELD);
            formData.append("files", imageFile);
            const res = await fetch(`${CMS_API}${CMS_UPLOAD}`, {
                method: METHODS.POST,
                body: formData
            });
            if (res.ok) {
                return true;
            } else {
                return false;
            };
        } else {
            return true;
        };
    };
};
