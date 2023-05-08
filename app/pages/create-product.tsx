import { ChangeEvent, useState } from 'react';
import { styles } from '@/styles/CreateProduct.styles';
import { createProduct } from '@/utils/createProduct';
import { Box, Button, Checkbox, Input, Typography } from '@mui/material';


export default function CreateProduct() {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [supplier, setSupplier] = useState("");
    const [bio, setBio] = useState("");
    const [buyPrice, setBuyPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const [maximumCapacity, setMaximumCapacity] = useState(0);
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [orderAutomation, setOrderAutomation] = useState(false);
    const [files, setFiles] = useState([]);

    const handleClick = async () => {
        await createProduct(
            name,
            amount,
            supplier,
            bio,
            buyPrice,
            sellPrice,
            maximumCapacity,
            minimumAmount,
            orderAutomation,
            files
        );
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: Function) => {
        func(e.target.value);
    };

    const handleFileChange = (e: any) => {
        setFiles(e.target.files);
    };

    const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        setOrderAutomation(e.target.checked);
    };

    return (
        <>
            <Box sx={styles.wrapper}>
                <Box>
                    <Typography>Name</Typography>
                    <Input onChange={(e) => { handleChange(e, setName) }} />
                </Box>
                <Box>
                    <Typography>Amount</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setAmount) }} />
                </Box>
                <Box>
                    <Typography>Supplier</Typography>
                    <Input onChange={(e) => { handleChange(e, setSupplier) }} />
                </Box>
                <Box>
                    <Typography>Bio</Typography>
                    <Input onChange={(e) => { handleChange(e, setBio) }} />
                </Box>
                <Box>
                    <Typography>Buy Price</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setBuyPrice) }} />
                </Box>
                <Box>
                    <Typography>Sell Price</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setSellPrice) }} />
                </Box>
                <Box>
                    <Typography>Maximum Capacity</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setMaximumCapacity) }} />
                </Box>
                <Box>
                    <Typography>Minimum Capacity</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setMinimumAmount) }} />
                </Box>
                <Box>
                    <Typography>Order Automation</Typography>
                    <Checkbox onChange={(e) => { handleCheckBox(e) }} />
                </Box>
                <Box>
                    <Typography>Order Automation</Typography>
                    <Input type='file' onChange={handleFileChange} />
                </Box>

                <Button
                    sx={styles.button}
                    variant='contained'
                    onClick={handleClick}
                >CREATE A PRODUCT</Button>
            </Box>
        </>
    )
};
