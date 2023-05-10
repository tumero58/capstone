export const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        paddingY: "32px",
        paddingX: "145px",
        gap:"36px"
    },
    descInput: {
        width: "50%"
    },
    button: {
        borderRadius:"8px",
        background:"#244260",
        paddingX:"55px",
    },
    input: {
        display: "flex",
        width: "100%",
        height: "40px",
        background: "#C0DDEF",
        paddingX: "24px",
        alignItems: "center",
        gap: "24px",
        borderRadius: "12px"
    },
    inputText: {
        fontWeight: 500,
        fontSize: 24
    },
    inputContent: {
        "::before": {
            display: "none"
        },
        "::after": {
            display: "none"
        },
        fontWeight: 500,
        fontSize: 18
    }
};
