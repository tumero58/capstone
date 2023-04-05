import { CMS_API, CMS_PRODUCTS, CMS_PRODUCTS_REF, CMS_UPLOAD, IMAGE_FIELD } from '@/constants/cms';
import { styles } from '@/styles/CreateProduct.styles';
import { handleRequest, METHODS } from '@/utils/handleRequest';
import { Box, Button, Checkbox, Input, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';


export default function CreateProduct() {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [supplier, setSupplier] = useState("");
    const [bio, setBio] = useState("");
    const [buyPrice, setBuyPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [minAmount, setMinAmount] = useState(0);
    const [orderAutiomation, setOrderAutomation] = useState(false);
    const [files, setFiles] = useState([]);

    console.log({
        name,
        amount,
        supplier,
        bio,
        buyPrice,
        sellPrice,
        maxCapacity,
        minAmount,
        orderAutiomation,
        files
    });



    const handleClick = async () => {
        const postRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}`, METHODS.POST, {
            "data": {
                "name": name,
                "amount": amount,
                "supplier": supplier,
                "bio": bio,
                "buyPrice": buyPrice,
                "sellPrice": sellPrice,
                "maximumCapacity": maxCapacity,
                "minimumAmount": minAmount,
                "orderAutiomation": orderAutiomation,
                "files": files
            }
        });
        const id = postRes.data.id;
        const imageFile = files[0];
        if (postRes.data) {
            if (imageFile) {
                const formData = new FormData();
                formData.append("ref", CMS_PRODUCTS_REF);
                formData.append("refId", id);
                formData.append("field", IMAGE_FIELD);
                formData.append("files", imageFile);
                const postRes = await fetch(`${CMS_API}${CMS_UPLOAD}`, {
                    method: METHODS.POST,
                    body: formData
                });
                if (postRes.ok) {
                    alert("Product successfully created!!!");
                } else {
                    alert("There was a problem with image")
                }
            } else {
                alert("Product successfully created!!!");
            }
        }
        console.log(postRes, "POSTRES");
        // await createProduct(title, description, raiseAmount, files[0]);
        console.log("clicked");
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
                    <Input type='number' onChange={(e) => { handleChange(e, setMaxCapacity) }} />
                </Box>
                <Box>
                    <Typography>Minimum Capacity</Typography>
                    <Input type='number' onChange={(e) => { handleChange(e, setMinAmount) }} />
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
