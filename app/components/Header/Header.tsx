import { routes } from "@/constants/routes";
import { Box, Typography } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { styles } from "./Header.styles";
import notification from "../../public/notification.png";
import Image from "next/image";
import { CURRENCY } from "@/constants/general";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { CMS_API, CMS_NOTIFICATIONS, POPULATE_ALL } from "@/constants/cms";

interface IHeader {
    walletName: string;
    walletBalance: string;
}

const Header = ({ walletName, walletBalance }: IHeader) => {

    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [openNotification, setOpenNotification] = useState(false);

    useEffect(() => {
        (async () => {
            const { data = [] } =
                await handleRequest(
                    `${CMS_API}${CMS_NOTIFICATIONS}${POPULATE_ALL}`, METHODS.GET) ?? {};
            if (data.length > 0) {
                const filteredData = data.filter((item: { attributes: { openedStatus: boolean } }) => item.attributes.openedStatus === false);
                const notifs = filteredData.map((item: {
                    id: number,
                    attributes: {
                        message: String;
                        openedStatus: boolean;
                    }
                }) => {
                    return {
                        id: item.id,
                        message: item.attributes.message,
                        openedStatus: item.attributes.openedStatus
                    };
                }) || [];
                setNotifications(notifs);
            };
        })();
    }, []);

    const handleNotificationClick = () => {
        if (notifications.length === 0) {
            return;
        };
        setOpenNotification((state) => !state);
        notifications.forEach(async (item: {
            id: number,
            message: String;
            openedStatus: boolean;
        }) => {
            await handleRequest(`${CMS_API}${CMS_NOTIFICATIONS}/${item.id}`, METHODS.PUT, {
                "data": {
                    "openedStatus": true,
                }
            });
        })
    };

    return (
        <>
            <Box sx={styles.headerWrapper}>
                <Box sx={styles.header}>
                    <Box sx={styles.headerSection}>
                        {routes.map((item, index) => {
                            return (
                                <Fragment key={index + 1}>
                                    <Link
                                        href={item.slug}
                                        style={router.asPath == item.slug ? { ...styles.route, ...styles.routeActive } : styles.route}
                                    >{item.title.toUpperCase()}</Link>
                                </Fragment>
                            )
                        })}
                    </Box>
                    <Box sx={styles.headerSection}>
                        <Typography sx={styles.route}>{walletName}</Typography>
                        <Typography sx={styles.route}>{walletBalance} {CURRENCY}</Typography>
                        <Box
                            sx={styles.notificationWrapper}
                            onClick={handleNotificationClick}
                        >
                            <Image src={notification.src} alt="" width={48} height={48} />
                            {notifications.length > 0 ?
                                <Box sx={styles.notificationCircle}>
                                    <Typography>{notifications.length}</Typography>
                                </Box> : <></>
                            }
                            {openNotification ? <Box sx={styles.notificationMessages}>
                                {notifications.map((item: {
                                    id: number,
                                    message: String;
                                    openedStatus: boolean;
                                }) =>
                                    <Typography sx={styles.notificationMessageText}>{item.message}</Typography>
                                )}
                            </Box> : <></>}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Header;