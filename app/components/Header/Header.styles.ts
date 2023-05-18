export const styles = {
    headerWrapper: {
        width: "100%",
        paddingTop: "40px",
        paddingX: "80px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "24px"
    },
    header: {
        width: "100%",
        height: "92px",
        background: "#244260",
        borderRadius: "16px",
        paddingX: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerSection: {
        display: "flex",
        gap: "36px",
        alignItems: "center"
    },
    route: {
        color: "#FFFFFF",
        fontWeight: 500,
        fontSize: "24px",
        fontFamily: "Montserrat"
    },
    routeActive: {
        color: "#C0DDEF"
    },
    notificationWrapper: {
        position: "relative",
        cursor: "pointer"
    },
    notificationCircle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translate(10px, 10px)",
        ">p": {
            color: "#FFF"
        }
    },
    notificationMessages: {
        width: "500px",
        position: "absolute",
        right: 50,
        zIndex: 1,
        padding: "30px",
        background: "#C0DDEF",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column"
    },
    notificationMessageText: {
        color: "#244260",
        fontWeight: 500,
        fontSize: "24px",
        fontFamily: "Montserrat"
    }
}