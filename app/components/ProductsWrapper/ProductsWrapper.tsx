import { CMS_URL } from "@/constants/cms";
import { IProduct } from "@/interfaces/Iproduct";
import { Box, Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { styles } from "./ProductsWrapper.styles";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { EXPORT, EXPORT_PRODUCTS_EMPTY_TEXT } from "@/constants/general";
import Link from "next/link";
import { PRODUCTS } from "@/constants/routes";
import { useRouter } from "next/router";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { CREATE_RECEIPT_API } from "@/constants/api";

interface IProdcutsWrapper {
    products: IProduct[];
}

export const ProductsWrapper = ({ products }: IProdcutsWrapper): JSX.Element => {
    const router = useRouter();

    const productAmounts = products.map((item) => {
        return {
            id: item.id,
            amount: item.amount,
            name: item.name,
            price: item.sellPrice
        };
    })

    const productAmountZero = productAmounts.map((item) => {
        return {
            id: item.id,
            amount: "0",
            name: item.name,
            price: item.price
        }
    })

    const [exportProducts, setExportProducts] = useState(productAmountZero);

    const handleAmountUp = (e: any, { id, amount }: { id: string, amount: string }) => {
        e.stopPropagation();
        const currentProduct = productAmounts.find(product => product.id === id);
        if (currentProduct) {
            if ((Number(amount) + 1) > Number(currentProduct.amount)) {
                return;
            } else {
                const replaceProduct = exportProducts.find(product => product.id === id);
                if (replaceProduct) {
                    const replaceProductIndex = exportProducts.indexOf(replaceProduct);
                    if (replaceProductIndex !== -1) {
                        const newExportProducts = exportProducts;
                        newExportProducts[replaceProductIndex] = {
                            id: replaceProduct.id,
                            amount: (Number(replaceProduct.amount) + 1).toString(),
                            name: replaceProduct.name,
                            price: replaceProduct.price
                        };
                        setExportProducts([...newExportProducts]);
                    };
                };
            };
        };
    };

    const handleAmountDown = (e: any, { id, amount }: { id: string, amount: string }) => {
        e.stopPropagation();
        const currentProduct = productAmounts.find(product => product.id === id);
        if (currentProduct) {
            if ((Number(amount) - 1) < 0) {
                return;
            } else {
                const replaceProduct = exportProducts.find(product => product.id === id);
                if (replaceProduct) {
                    const replaceProductIndex = exportProducts.indexOf(replaceProduct);
                    if (replaceProductIndex !== -1) {
                        const newExportProducts = exportProducts;
                        newExportProducts[replaceProductIndex] = {
                            id: replaceProduct.id,
                            amount: (Number(replaceProduct.amount) - 1).toString(),
                            name: replaceProduct.name,
                            price: replaceProduct.price
                        };
                        setExportProducts([...newExportProducts]);
                    };
                };
            };
        };
    };

    const handleExport = async () => {
        const filteredExportProducts = exportProducts.filter(item => Number(item.amount) !== 0);
        if (filteredExportProducts.length === 0) {
            alert(EXPORT_PRODUCTS_EMPTY_TEXT);
        } else {
            const CMSProducts = filteredExportProducts.map((item) => {
                return {
                    productName: item.name,
                    amount: item.amount,
                    productPrice: item.price
                }
            });
            const res = await handleRequest(CREATE_RECEIPT_API, METHODS.POST, {
                array: CMSProducts
            });
            if (res.id) {
                alert("Successfully exported");
            } else {
                alert("Something went wrong");
            }
        };
    };

    const handleRedirect = (id: string) => {
        router.push(`${PRODUCTS}/${id}`);
    }

    return (
        <Box sx={styles.productsWrapper}>
            {products.map((item: IProduct) => {
                const currentProduct = exportProducts.find(product => product.id === item.id);
                if (currentProduct) {
                    return (
                        <Fragment key={item.id}>
                            <Box sx={styles.product} onClick={() => { handleRedirect(item.id) }}>
                                <Box>
                                    <Typography sx={styles.productText}>{item.name.toUpperCase()}</Typography>
                                </Box>
                                <Box sx={styles.productInfoWrapper}>
                                    <Box sx={styles.counterWrapper}>
                                        <PlayArrowIcon sx={styles.arrowUp} onClick={(e) => { handleAmountUp(e, currentProduct) }} />
                                        <Box sx={styles.counter}>
                                            <Typography>{currentProduct.amount}</Typography>
                                        </Box>
                                        <PlayArrowIcon sx={styles.arrowDown} onClick={(e) => { handleAmountDown(e, currentProduct) }} />
                                    </Box>
                                    <Box sx={{
                                        ...styles.productImage,
                                        backgroundImage: `url(${CMS_URL}${item.image})`,
                                    }}></Box>
                                </Box>
                            </Box>
                        </Fragment>
                    )
                }
            })}
            <Button
                sx={styles.button}
                variant='contained'
                onClick={handleExport}
            >{EXPORT}</Button>
        </Box >
    )
};
