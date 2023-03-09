import '@/styles/globals.css'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { styles } from '@/styles/App.styles'
import { Box } from '@mui/material'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box sx={styles.container}>
      <Header />
      <Box sx={styles.body}>
        <Component {...pageProps} />
      </Box>
      <Footer />
    </Box>
  )
}
