import { postProduct } from "./apiUtils";
import { postImage } from "./cmsUtils";

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
    files = []
) => {
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
    const created = await postImage(productId, files[0]);
    if (created) {
        alert("Product created successfully!!!!!");
    } else {
        alert("There was a problem!!!!")
    }
};
