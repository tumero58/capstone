import '@/styles/globals.css';
import { styles } from '@/styles/App.styles'
import { Box } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { INXPORT } from '@/constants/general';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{INXPORT}</title>
      </Head>
      <Box sx={styles.container}>
        <Box sx={styles.body}>
          <Component {...pageProps} />
        </Box>
      </Box>
    </>
  )
}
