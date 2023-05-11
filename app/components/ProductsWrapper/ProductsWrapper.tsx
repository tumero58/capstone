import { CMS_URL } from "@/constants/cms";
import { IProduct } from "@/interfaces/Iproduct";
import { Box, Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { styles } from "./ProductsWrapper.styles";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { EXPORT } from "@/constants/general";

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

    const [exportProducts, setExportProducts] = useState(productAmounts);

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

    console.log(exportProducts, "prod amount");


    return (
        <Box sx={styles.productsWrapper}>
            {products.map((item: IProduct, index) => {
                const currentProduct = exportProducts.find(product => product.id === item.id);
                if (currentProduct) {
                    return (
                        <Fragment key={index + 1}>
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
                        </Fragment>
                    )
                }
            })}
            <Button
                sx={styles.button}
                variant='contained'
            >{EXPORT}</Button>
        </Box>
    )
};
