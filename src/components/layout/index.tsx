import { Box  , useMediaQuery} from '@chakra-ui/react';
import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  
  const [isMobile] = useMediaQuery('(min-width: 760px)')

  return (
    <>
    <Box position='fixed' width={'100%'} zIndex={2}>
      <Header />
    </Box>
      <Box as='main' >{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
