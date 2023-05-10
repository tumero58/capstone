import background from "../public/background.png";

export const homeStyles = {
    homeWrapper: {
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${background.src})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    contentWrapper: {
        display: "flex"
    },
    routes: {
        width: "520px",
        display: "flex",
        flexDirection: "column",
        gap: "100px"
    },
    route: {
        width: "100%",
        height: "218px",
        background: "#244260",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #000000",
        borderRadius: "32px"
    },
    routeText:{
        fontWeight: 700,
        fontSize: 55,
        color: "white"
      }
};
