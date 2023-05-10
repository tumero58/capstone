import { CMS_URL } from "@/constants/cms";
import { IProduct } from "@/interfaces/Iproduct";
import { Box, Button, Typography } from "@mui/material";
import { Fragment } from "react";
import { styles } from "./ProductsWrapper.styles";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { EXPORT } from "@/constants/general";

interface IProdcutsWrapper {
    products: IProduct[];
}

export const ProductsWrapper = ({ products }: IProdcutsWrapper): JSX.Element => {
    return (
        <Box sx={styles.productsWrapper}>
            {products.map((item: IProduct, index) => {
                return (
                    <Fragment key={index + 1}>
                        <Box sx={styles.product}>
                            <Box>
                                <Typography sx={styles.productText}>{item.name.toUpperCase()}</Typography>
                            </Box>
                            <Box sx={styles.productInfoWrapper}>
                                <Box sx={styles.counterWrapper}>
                                    <PlayArrowIcon sx={styles.arrowUp} />
                                    <Box sx={styles.counter}>
                                        <Typography>0</Typography>
                                    </Box>
                                    <PlayArrowIcon sx={styles.arrowDown} />
                                </Box>
                                <Box sx={{
                                    ...styles.productImage,
                                    backgroundImage: `url(${CMS_URL}${item.image})`,
                                }}></Box>
                            </Box>
                        </Box>
                    </Fragment>
                )
            })}
            <Button
                sx={styles.button}
                variant='contained'
            >{EXPORT}</Button>
        </Box>
    )
};
