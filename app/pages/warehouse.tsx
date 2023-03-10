import { defaultTypeColor } from "@/constants/warehouse";
import { styles } from "@/styles/Warehouse.styles";
import { Box, Checkbox, Input, Typography } from "@mui/material";
import { Fragment, useState } from "react";

export default function Warehouse() {

    const [whWidth, setWhWidth] = useState(0);
    const [whHeight, setWhHeight] = useState(0);
    const [whLength, setWhLength] = useState(0);
    const [typesCount, setTypesCount] = useState([{ color: defaultTypeColor, width: "100%", height: "100%" }]);
    const [distributeIndividually, setDistributeIndividually] = useState(false);



    const handleCheckBox = (event: any) => {
        setDistributeIndividually(event.target.checked);

    }

    const handleChange = (event: any, setter: Function) => {
        setter(event.target.value);
    };

    const handleColorChange = (event: any, index: number) => {
        const arr = typesCount.map((item, ind) => {
            return {
                ...item,
                color: ind === index ? event.target.value : item.color
            }
        })
        setTypesCount(arr);
    };

    const handleWidthChange = (event: any, index: number) => {
        const arr = typesCount.map((item, ind) => {
            return {
                ...item,
                width: ind === index ? `${event.target.value}px` : item.width
            }
        })
        setTypesCount(arr);
    };

    const handleHeightChange = (event: any, index: number) => {
        const arr = typesCount.map((item, ind) => {
            return {
                ...item,
                height: ind === index ? `${event.target.value}px` : item.height
            }
        })
        setTypesCount(arr);
    };

    const handleCountChange = (event: any) => {
        let arr = [];
        for (let i = 0; i < +event.target.value; i++) {
            arr.push({ color: defaultTypeColor, width: "100%", height: "100%" });
        };
        setTypesCount(arr);
    };




    return (
        <Box sx={styles.warehouseWrapper}>
            <Box sx={styles.warehouseInfoBlock}>
                <Typography>Headline</Typography>
                <Typography>Warehouse Width</Typography>
                <Input onChange={(event) => handleChange(event, setWhWidth)} />
                <Typography>Warehouse Height</Typography>
                <Input onChange={(event) => handleChange(event, setWhHeight)} />
                <Typography>Warehouse Length</Typography>
                <Input onChange={(event) => handleChange(event, setWhLength)} />
                <Box sx={styles.flex}>
                    <Box>
                        <Typography>Product Types</Typography>
                        <Input onChange={handleCountChange} />
                    </Box>
                    <Box>
                        <Typography>Distribute individually</Typography>
                        <Checkbox onChange={handleCheckBox} />
                    </Box>
                </Box>
                {typesCount.map((item, index) => {
                    return (
                        <Fragment key={index + 1}>
                            <Box sx={styles.flex}>
                                <Box>
                                    <Typography>Type color</Typography>
                                    <Input defaultValue={defaultTypeColor} onChange={(event) => handleColorChange(event, index)} />
                                </Box>
                                {distributeIndividually &&
                                    <Box sx={styles.flex}>
                                        <Box>
                                            <Typography>Type width</Typography>
                                            <Input onChange={(event) => handleWidthChange(event, index)} />
                                        </Box>
                                        <Box>
                                            <Typography>Type Height</Typography>
                                            <Input onChange={(event) => handleHeightChange(event, index)} />
                                        </Box>
                                    </Box>
                                }
                            </Box>
                        </Fragment>
                    )
                })}
            </Box>
            <Box sx={styles.warehouseViewBlock}>
                <Typography sx={styles.warehouseViewBlockWrapper}>{`${whWidth}x${whLength}x${whHeight}`}</Typography>
                <Box sx={{
                    width: `${whWidth}px`,
                    height: `${whLength}px`,
                    display: "flex",
                    flexWrap: distributeIndividually ? "wrap" : "unset"
                }}>
                    {typesCount.map((item, index) => {
                        return (
                            <Fragment key={index + 1}>
                                <Box sx={{
                                    width: item.width,
                                    height: item.height,
                                    background: item.color
                                }}></Box>
                            </Fragment>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}