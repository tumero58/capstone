import Header from "@/components/Header/Header";
import { ProductsWrapper } from "@/components/ProductsWrapper/ProductsWrapper";
import { CMS_API, CMS_PRODUCTS, CMS_WALLET, POPULATE_ALL } from "@/constants/cms";
import { ICMSProduct, IProduct } from "@/interfaces/Iproduct";
import { IWallet } from "@/interfaces/Iwallet";
import { productsStyles } from "@/styles/Products.styles";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { Box, Input } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import searchIcon from "../../public/search_icon.png";

export async function getStaticProps() {
    const { data = [] } = await handleRequest(`${CMS_API}${CMS_WALLET}`, METHODS.GET) ?? {};

    const wallet: IWallet = {
        name: data.attributes.name,
        balance: data.attributes.balance
    } || {};

    const { data: product = [] } = await handleRequest(`${CMS_API}${CMS_PRODUCTS}${POPULATE_ALL}`, METHODS.GET) ?? {};

    const products: IProduct[] = product.map((item: ICMSProduct) => {
        return {
            id: item.id,
            name: item.attributes.name,
            amount: item.attributes.amount,
            supplier: item.attributes.supplier,
            bio: item.attributes.bio,
            buyPrice: item.attributes.buyPrice,
            sellPrice: item.attributes.sellPrice,
            maximumCapacity: item.attributes.maximumCapacity,
            minimumAmount: item.attributes.minimumAmount,
            orderAutomation: item.attributes.orderAutomation,
            image: item.attributes.image?.data?.attributes?.url || null,
        };
    }) || [];

    return {
        props: {
            wallet,
            products
        }
    };
}

interface IProductsPage {
    wallet: IWallet;
    products: IProduct[];
}

export default function Products({ wallet, products }: IProductsPage) {

    const [searchValue, setSearchValue] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const newFilteredProducts = products.filter(item => item.name.toLowerCase().includes(searchValue));
        setFilteredProducts([...newFilteredProducts]);
    }, [searchValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <>
            <Header walletName={wallet.name} walletBalance={wallet.balance} />
            <Box sx={productsStyles.productsWrapper}>
                <Box sx={productsStyles.searchInput}>
                    <Image src={searchIcon.src} alt="" height={30} width={30} />
                    <Input sx={productsStyles.searchInputContent} onChange={handleChange} />
                </Box>
                <ProductsWrapper products={filteredProducts} />
            </Box>

        </>
    )
}