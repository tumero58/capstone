import { CREATE_PRODUCT_API } from "@/constants/api";
import { handleRequest, METHODS } from "./handleRequest";

export const postProduct = async (
    name: string,
    amount: number,
    supplier: string,
    bio: string,
    buyPrice: number,
    sellPrice: number,
    maxCapacity: number,
    minAmount: number,
    orderAutiomation: boolean
) => {
    const productId = await handleRequest(CREATE_PRODUCT_API, METHODS.POST, {
        name,
        amount,
        supplier,
        bio,
        buyPrice,
        sellPrice,
        maxCapacity,
        minAmount,
        orderAutiomation
    });
    return productId;
};
