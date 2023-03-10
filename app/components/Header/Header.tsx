import { links } from "@/constants/links";
import { Box } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { styles } from "./Header.styles";

const Header = () => {

    const router = useRouter();

    return (
        <Box sx={styles.header}>
            <Box sx={{
                display:"flex",
                gap:"24px"
            }}>
                {links.map((item, index) => {                    
                    return (
                        <Fragment key={index}>
                            <Link 
                            href={item.slug} 
                            style={router.asPath == item.slug ? {...styles.link,...styles.linkActive} : styles.link}
                            >{item.title}</Link>
                        </Fragment>
                    )
                })}
            </Box>
        </Box>
    );
}

export default Header;