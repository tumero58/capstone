import { CMS_API, CMS_WALLET } from "@/constants/cms";
import { IWallet } from "@/interfaces/Iwallet";
import { postProduct } from "./apiUtils";
import { postImage } from "./cmsUtils";
import { handleRequest, METHODS } from "./handleRequest";

export const createProduct = async (
    name = "",
    amount = 0,
    supplier = "",
    bio = "",
    buyPrice = 0,
    sellPrice = 0,
    maximumCapacity = 0,
    minimumAmount = 0,
    orderAutiomation = false,
    files = [],
    wallet: IWallet
) => {
    if (amount * buyPrice < Number(wallet.balance)) {
        const productId = await postProduct(
            name,
            amount,
            supplier,
            bio,
            buyPrice,
            sellPrice,
            maximumCapacity,
            minimumAmount,
            orderAutiomation
        );
        const walletRes = await handleRequest(`${CMS_API}${CMS_WALLET}`, METHODS.PUT, {
            "data": {
                "balance": (Number(wallet.balance) - (amount * buyPrice)).toString()
            }
        });
        const created = await postImage(productId, files[0]);
        if (created && walletRes.data) {
            alert("Product created successfully!!!!!");
        } else {
            alert("There was a problem!!!!")
        }
    } else {
        alert("Not enough money to create");
    }
};
