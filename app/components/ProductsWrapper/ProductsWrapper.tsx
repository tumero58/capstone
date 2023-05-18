import { CMS_API, CMS_PRODUCTS, CMS_URL, CMS_WALLET } from "@/constants/cms";
import { IProduct } from "@/interfaces/Iproduct";
import { Box, Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { styles } from "./ProductsWrapper.styles";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CURRENCY, EXPORT, EXPORT_PRODUCTS_EMPTY_TEXT } from "@/constants/general";
import Link from "next/link";
import { PRODUCTS } from "@/constants/routes";
import { useRouter } from "next/router";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { CREATE_NOTIFICATION_API, CREATE_RECEIPT_API } from "@/constants/api";
import { IWallet } from "@/interfaces/Iwallet";

interface IProdcutsWrapper {
    products: IProduct[];
    wallet: IWallet;
}

export const ProductsWrapper = ({ products, wallet }: IProdcutsWrapper): JSX.Element => {
    const router = useRouter();

    const productAmounts = products.map((item) => {
        return {
            id: item.id,
            amount: item.amount,
            name: item.name,
            price: item.sellPrice,
            buyPrice: item.buyPrice,
            maxAmount: item.amount,
            minimumAmount: item.minimumAmount,
            orderAutomation: item.orderAutomation
        };
    })

    const productAmountZero = productAmounts.map((item) => {
        return {
            id: item.id,
            amount: "0",
            name: item.name,
            price: item.price,
            buyPrice: item.buyPrice,
            maxAmount: item.maxAmount,
            minimumAmount: item.minimumAmount,
            orderAutomation: item.orderAutomation
        }
    })

    const [exportProducts, setExportProducts] = useState(productAmountZero);
    const [receiptProducts, setReceiptProducts] = useState(productAmountZero);
    const [openReceipt, setOpenReceipt] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);

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
                            price: replaceProduct.price,
                            buyPrice: replaceProduct.buyPrice,
                            maxAmount: replaceProduct.maxAmount,
                            minimumAmount: replaceProduct.minimumAmount,
                            orderAutomation: replaceProduct.orderAutomation
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
                            price: replaceProduct.price,
                            buyPrice: replaceProduct.buyPrice,
                            maxAmount: replaceProduct.maxAmount,
                            minimumAmount: replaceProduct.minimumAmount,
                            orderAutomation: replaceProduct.orderAutomation
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
            return;
        } else {
            setReceiptProducts(filteredExportProducts);
            let totalAmount: number = 0;
            let totalPrice: number = 0;
            let totalProfit: number = 0;
            filteredExportProducts.forEach((item) => {
                totalAmount += Number(item.amount);
                totalPrice += Number(item.price);
                totalProfit += (Number(item.price) - Number(item.buyPrice)) * Number(item.amount);
            });
            setTotalAmount(totalAmount);
            setTotalPrice(totalPrice);
            setTotalProfit(totalProfit);
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
                let amountSum: number = 0;
                CMSProducts.forEach((item) => {
                    amountSum += Number(item.amount) * Number(item.productPrice);
                });
                const walletRes = await handleRequest(`${CMS_API}${CMS_WALLET}`, METHODS.PUT, {
                    "data": {
                        "balance": (Number(wallet.balance) + amountSum).toString()
                    }
                });
                if (walletRes.data) {
                    filteredExportProducts.forEach(async (item) => {
                        const putRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${item.id}`, METHODS.PUT, {
                            "data": {
                                "amount": Number(item.maxAmount) - Number(item.amount),
                            }
                        });
                        if (putRes.data) {
                            if (Number(item.maxAmount) - Number(item.amount) <= 0) {
                                if (item.orderAutomation === false) {
                                    const notifRes = await handleRequest(CREATE_NOTIFICATION_API, METHODS.POST, {
                                        message: `Product: ${item.name} is out of stock`
                                    });
                                    if (notifRes.id) {
                                        await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${item.id}`, METHODS.DELETE);
                                    }
                                } else {
                                    if (Number(item.minimumAmount) * Number(item.buyPrice) < Number(wallet.balance)) {
                                        const walletRes = await handleRequest(`${CMS_API}${CMS_WALLET}`, METHODS.PUT, {
                                            "data": {
                                                "balance": (Number(wallet.balance) - Number(item.minimumAmount) * Number(item.buyPrice)).toString()
                                            }
                                        });
                                        if (walletRes.data) {
                                            await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${item.id}`, METHODS.PUT, {
                                                "data": {
                                                    "amount": item.minimumAmount,
                                                }
                                            });
                                        }
                                    } else {
                                        const notifRes = await handleRequest(CREATE_NOTIFICATION_API, METHODS.POST, {
                                            message: `Not enought money to purchase product: ${item.name}`
                                        });
                                        if (notifRes.id) {
                                            await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${item.id}`, METHODS.DELETE);
                                        }
                                    }
                                };
                            };
                        };
                    })
                    alert("Successfully exported");
                    setOpenReceipt(true);
                } else {
                    alert("Something went wrong");
                }
            }
        };
    };

    const handleRedirect = (id: string) => {
        router.push(`${PRODUCTS}/${id}`);
    };

    return (
        <Box>
            {openReceipt ?
                <Box sx={styles.receipt}>
                    <Box sx={styles.receiptContent}>
                        <Box sx={styles.closeButton}>
                            <Typography sx={styles.closeIcon}
                                onClick={() => { setOpenReceipt(false) }}>
                                X
                            </Typography>
                        </Box>
                        <Box sx={styles.receiptBox}>
                            <Box sx={styles.receiptRow}>
                                <Typography sx={styles.receiptMainRow}>Name</Typography>
                                <Typography sx={styles.receiptMainRow}>Amount</Typography>
                                <Typography sx={styles.receiptMainRow}>Price</Typography>
                            </Box>
                            {receiptProducts.map((item, index) =>
                                <Box sx={styles.receiptRow} key={index + 1}>
                                    <Typography sx={styles.receiptRowText}>{item.name}</Typography>
                                    <Typography sx={styles.receiptRowText}>{item.amount}</Typography>
                                    <Typography sx={styles.receiptRowText}>{item.price} $</Typography>
                                </Box>
                            )}
                            <Box sx={styles.line}></Box>
                            <Box sx={styles.receiptRow}>
                                <Typography sx={styles.receiptRowText}>Total</Typography>
                                <Typography sx={styles.receiptRowText}>{totalAmount}</Typography>
                                <Typography sx={styles.receiptRowText}>{totalPrice} $</Typography>
                            </Box>
                            <Box>
                                <Typography sx={styles.receiptRowText}>Profit: {totalProfit} $</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box> : <></>}
            <Box sx={styles.productsWrapper}>
                {products.map((item: IProduct) => {
                    const currentProduct = exportProducts.find(product => product.id === item.id);
                    if (currentProduct) {
                        return (
                            <Fragment key={item.id}>
                                <Box sx={styles.product} onClick={() => { handleRedirect(item.id) }}>
                                    <Box>
                                        <Typography sx={styles.productText}>{item.name.toUpperCase()}: {item.amount}</Typography>
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
        </Box>
    )
};
