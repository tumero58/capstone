import { routes } from '@/constants/routes';
import { homeStyles } from '@/styles/Home.styles';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import person from "../public/person.png";

export default function Home() {
  
  const filteredRoutes = routes.filter(item => item.slug !== "/");

  return (
    <Box sx={homeStyles.homeWrapper}>
      <Box sx={homeStyles.contentWrapper}>
        <Image src={person.src} alt='' width={500} height={500} />
        <Box sx={homeStyles.routes}>
          {filteredRoutes.map((item, index) => {
            return (
              <Link href={item.slug} key={index + 1}>
                <Box sx={homeStyles.route}>
                  <Typography sx={homeStyles.routeText}>{item.title.toUpperCase()}</Typography>
                </Box>
              </Link>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
