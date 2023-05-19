import Header from "@/components/Header/Header";
import { CMS_API, CMS_PRODUCTS, CMS_WALLET, POPULATE_ALL } from "@/constants/cms";
import { ICMSProduct, IProduct } from "@/interfaces/Iproduct";
import { IWallet } from "@/interfaces/Iwallet";
import { styles as UnitProductStyles } from "@/styles/CreateProduct.styles";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { Box, Typography } from "@mui/material";
import { GetStaticPropsContext } from "next";

export async function getStaticPaths() {

    const { data: product = [] } = await handleRequest(`${CMS_API}${CMS_PRODUCTS}`, METHODS.GET) ?? {};

    const paths = product.map(({ id }: ICMSProduct) => {
        return {
            params: {
                id: id.toString()
            }
        };
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } = {} }: GetStaticPropsContext) {
    const { data, data: { attributes } } = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${id}${POPULATE_ALL}`, METHODS.GET) ?? {};

    const walletData = await handleRequest(`${CMS_API}${CMS_WALLET}`, METHODS.GET) ?? {};

    const wallet: IWallet = {
        name: walletData.data.attributes.name,
        balance: walletData.data.attributes.balance
    } || {}

    const product: IProduct = {
        id: data.id,
        name: attributes.name,
        amount: attributes.amount,
        supplier: attributes.supplier,
        bio: attributes.bio,
        buyPrice: attributes.buyPrice,
        sellPrice: attributes.sellPrice,
        maximumCapacity: attributes.maximumCapacity,
        minimumAmount: attributes.minimumAmount,
        orderAutomation: attributes.orderAutomation,
        image: attributes.image?.data?.attributes?.url || null,
    };

    return {
        props: {
            product,
            wallet
        }
    };
};

export default function Product({
    product: {
        name,
        amount,
        supplier,
        bio,
        buyPrice,
        sellPrice,
        maximumCapacity,
        minimumAmount,
        orderAutomation
    },
    wallet
}: { product: IProduct, wallet: IWallet }) {
    return (
        <>
            <Header walletName={wallet.name} walletBalance={wallet.balance} />
            <Box sx={UnitProductStyles.wrapper}>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Name</Typography>
                    <Typography>{name}</Typography>
                </Box>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Amount</Typography>
                    <Typography>{amount}</Typography>
                </Box>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Supplier</Typography>
                    <Typography>{supplier}</Typography>
                </Box>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Bio</Typography>
                    <Typography>{bio}</Typography>
                </Box>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Buy Price</Typography>
                    <Typography>{buyPrice}</Typography>
                </Box>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Sell Price</Typography>
                    <Typography>{sellPrice}</Typography>
                </Box>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Maximum Capacity</Typography>
                    <Typography>{maximumCapacity}</Typography>
                </Box>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Minimum Amount</Typography>
                    <Typography>{minimumAmount}</Typography>
                </Box>
                <Box sx={UnitProductStyles.input}>
                    <Typography sx={UnitProductStyles.inputText}>Order Automation</Typography>
                    <Typography>{orderAutomation.toString()}</Typography>
                </Box>
            </Box>
        </>
    )
}
