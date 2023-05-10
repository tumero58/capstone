import { routes } from "@/constants/routes";
import { Box, Typography } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { styles } from "./Header.styles";
import notification from "../../public/notification.png";
import Image from "next/image";

const Header = () => {

    const router = useRouter();

    return (
        <>
            <Box sx={styles.headerWrapper}>
                <Box sx={styles.header}>
                    <Box sx={styles.headerSection}>
                        {routes.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <Link
                                        href={item.slug}
                                        style={router.asPath == item.slug ? { ...styles.route, ...styles.routeActive } : styles.route}
                                    >{item.title.toUpperCase()}</Link>
                                </Fragment>
                            )
                        })}
                    </Box>
                    <Box sx={styles.headerSection}>
                        <Typography sx={styles.route}>NAME</Typography>
                        <Typography sx={styles.route}>BALANCE</Typography>
                        <Image src={notification.src} alt="" width={48} height={48} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Header;