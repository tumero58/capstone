import { CMS_API, CMS_PRODUCTS, CMS_PRODUCTS_REF, CMS_UPLOAD, IMAGE_FIELD } from "@/constants/cms";
import { handleRequest, METHODS } from "./handleRequest";

export const createProduct = async(
    name = "",
    amount = 0,
    supplier = "",
    bio = "",
    buyPrice = 0,
    sellPrice = 0,
    maxCapacity = 0,
    minAmount = 0,
    orderAutiomation = false,
    files = []
) =>{
    const postRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}`, METHODS.POST, {
        "data": {
            "name": name,
            "amount": amount,
            "supplier": supplier,
            "bio": bio,
            "buyPrice": buyPrice,
            "sellPrice": sellPrice,
            "maximumCapacity": maxCapacity,
            "minimumAmount": minAmount,
            "orderAutomation": orderAutiomation,
            "files": files
        }
    });
    const id = postRes.data.id;
    const imageFile = files[0];
    if (postRes.data) {
        if (imageFile) {
            const formData = new FormData();
            formData.append("ref", CMS_PRODUCTS_REF);
            formData.append("refId", id);
            formData.append("field", IMAGE_FIELD);
            formData.append("files", imageFile);
            const postRes = await fetch(`${CMS_API}${CMS_UPLOAD}`, {
                method: METHODS.POST,
                body: formData
            });
            if (postRes.ok) {
                alert("Product successfully created!!!");
            } else {
                alert("There was a problem with image")
            }
        } else {
            alert("Product successfully created!!!");
        }
        return postRes;
    };
}