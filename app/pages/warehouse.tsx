import { styles } from "@/styles/Warehouse.styles";
import { Box } from "@mui/material";

export default function Warehouse(){
    return(
        <Box sx={styles.warehouseWrapper}>
            <Box sx={styles.warehouseInfoBlock}></Box>
            <Box sx={styles.warehouseViewBlock}></Box>
        </Box>
    )
}