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
    }
};
