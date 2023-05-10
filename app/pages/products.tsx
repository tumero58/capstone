import Header from "@/components/Header/Header";
import { CMS_API, CMS_WALLET } from "@/constants/cms";
import { IWallet } from "@/interfaces/Iwallet";
import { productsStyles } from "@/styles/Products.styles";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { Box, Input } from "@mui/material";
import Image from "next/image";
import searchIcon from "../public/search_icon.png";

export async function getStaticProps() {
    const { data = [] } = await handleRequest(`${CMS_API}${CMS_WALLET}`, METHODS.GET) ?? {};

    const wallet: IWallet = {
        name: data.attributes.name,
        balance: data.attributes.balance
    } || {}

    return {
        props: {
            wallet
        }
    };
}

interface IProducts {
    wallet: IWallet;
}

export default function Products({ wallet }: IProducts) {
    return (
        <>
            <Header walletName={wallet.name} walletBalance={wallet.balance} />
            <Box sx={productsStyles.productsWrapper}>
                <Box sx={productsStyles.searchInput}>
                    <Image src={searchIcon.src} alt="" height={30} width={30} />
                    <Input sx={productsStyles.searchInputContent} />
                </Box>
            </Box>
        </>
    )
}