import { routes } from "@/constants/routes";
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
                {routes.map((item, index) => {                    
                    return (
                        <Fragment key={index}>
                            <Link 
                            href={item.slug} 
                            style={router.asPath == item.slug ? {...styles.route,...styles.routeActive} : styles.route}
                            >{item.title}</Link>
                        </Fragment>
                    )
                })}
            </Box>
        </Box>
    );
}

export default Header;