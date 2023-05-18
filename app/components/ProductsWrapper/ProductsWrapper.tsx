import { CMS_URL } from "@/constants/cms";
import { IProduct } from "@/interfaces/Iproduct";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { styles } from "./ProductsWrapper.styles";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { EXPORT, EXPORT_PRODUCTS_EMPTY_TEXT } from "@/constants/general";
import Link from "next/link";
import { PRODUCTS } from "@/constants/routes";

interface IProdcutsWrapper {
    products: IProduct[];
}

export const ProductsWrapper = ({ products }: IProdcutsWrapper): JSX.Element => {

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

    const handleAmountUp = ({ id, amount }: { id: string, amount: string }) => {
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

    const handleAmountDown = ({ id, amount }: { id: string, amount: string }) => {
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

    const handleExport = () => {
        const filteredExportProducts = exportProducts.filter(item => Number(item.amount) !== 0);
        if (filteredExportProducts.length === 0) {
            alert(EXPORT_PRODUCTS_EMPTY_TEXT);
        }
    };

    return (
        <Box sx={styles.productsWrapper}>
            {products.map((item: IProduct) => {
                const currentProduct = exportProducts.find(product => product.id === item.id);
                if (currentProduct) {
                    return (
                        <Link href={`${PRODUCTS}/${item.id}`} key={item.id}>
                            <Box sx={styles.product}>
                                <Box>
                                    <Typography sx={styles.productText}>{item.name.toUpperCase()}</Typography>
                                </Box>
                                <Box sx={styles.productInfoWrapper}>
                                    <Box sx={styles.counterWrapper}>
                                        <PlayArrowIcon sx={styles.arrowUp} onClick={() => { handleAmountUp(currentProduct) }} />
                                        <Box sx={styles.counter}>
                                            <Typography>{currentProduct.amount}</Typography>
                                        </Box>
                                        <PlayArrowIcon sx={styles.arrowDown} onClick={() => { handleAmountDown(currentProduct) }} />
                                    </Box>
                                    <Box sx={{
                                        ...styles.productImage,
                                        backgroundImage: `url(${CMS_URL}${item.image})`,
                                    }}></Box>
                                </Box>
                            </Box>
                        </Link>
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
