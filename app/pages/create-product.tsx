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
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Name</Typography>
                    <Input onChange={(e) => { handleChange(e, setName) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Amount</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setAmount) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Supplier</Typography>
                    <Input onChange={(e) => { handleChange(e, setSupplier) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Bio</Typography>
                    <Input onChange={(e) => { handleChange(e, setBio) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Buy Price</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setBuyPrice) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Sell Price</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setSellPrice) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Maximum Capacity</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setMaximumCapacity) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Minimum Capacity</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setMinimumAmount) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Order Automation</Typography>
                    <Checkbox onChange={(e) => { handleCheckBox(e) }} sx={styles.inputContent} />
                </Box>
                <Box sx={styles.input}>
                    <Typography sx={styles.inputText}>Image</Typography>
                    <Input type='file' onChange={handleFileChange} sx={styles.inputContent} />
                </Box>

                <Button
                    sx={styles.button}
                    variant='contained'
                    onClick={handleClick}
                >Add</Button>
            </Box>
        </>
    )
};
