import { CMS_API_OWN } from '@/constants/api';
import { handleRequest, METHODS } from '@/utils/handleRequest';
import { Box, Button, Input } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export default function Home() {
  const [field,setField] = useState("");

  const handleChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setField(event.target.value);
  };

  const getData = async () => {
    const products = await handleRequest(CMS_API_OWN,METHODS.POST,{
      field
    });
    console.log(products);
  };

  return (
    <Box>
      <Input onChange={handleChange}/>
      <Button onClick={getData}>Get Data</Button>
    </Box>
  )
}
