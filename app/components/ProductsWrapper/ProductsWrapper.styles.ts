export const styles = {
    productsWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "50px"
    },
    product: {
        width: "100%",
        height: "126px",
        borderRadius: "10px",
        background: "#C0DDEF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: "42px",
        cursor: "pointer"
    },
    productText: {
        fontWeight: 500,
        fontSize: "32px",
        fontFamily: "Montserrat"
    },
    productInfoWrapper: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    },
    counterWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    counter: {
        width: "32px",
        height: "32px",
        background: "#244260",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
    },
    arrowUp: {
        transform: "rotate(270deg)",
        color: "#EAF7FE",
        cursor: "pointer",
        ":hover": {
            opacity: 0.5
        }
    },
    arrowDown: {
        transform: "rotate(90deg)",
        color: "#EAF7FE",
        cursor: "pointer",
        ":hover": {
            opacity: 0.5
        }
    },
    productImage: {
        width: "100px",
        height: "100px",
        background: "#244260",
        borderRadius: "8px",
        backgroundSize: "100% 100%"
    },
    button: {
        borderRadius: "8px",
        background: "#244260",
        paddingX: "55px",
    },
    receipt: {
        width: "100vw",
        height: "100vh",
        background: "rgba(234, 247, 254, 0.8)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    receiptContent: {
        width: 400,
        height: 500,
        padding: "30px",
        background: "#C0DDEF",
        borderRadius: "10px",
        position: "relative"
    },
    receiptBox: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    receiptRow: {
        display: "flex",
        justifyContent: "space-between"
    },
    receiptMainRow: {
        color: "#FFFFFF",
        fontWeight: 500,
        fontSize: "24px",
        fontFamily: "Montserrat"
    },
    receiptRowText: {
        color: "#1976d2",
        fontWeight: 500,
        fontSize: "24px",
        fontFamily: "Montserrat"
    },
    closeButton: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        background: "#1976d2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transform: "translate(50%, -50%)"
    },
    line: {
        wdith: "100%",
        height: 0,
        border: "1px solid #1976d2"
    },
    closeIcon: {
        color: "#FFFFFF",
        fontWeight: 500
    }
};
