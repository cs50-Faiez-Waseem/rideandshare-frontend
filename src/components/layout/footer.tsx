import {
  Box,
  chakra,
  Container,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

// import AppStoreBadge from '@/components/AppStoreBadge';
// import PlayStoreBadge from '@/components/PlayStoreBadge';

const ListHeader = ({ children }: { children?: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children?: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Links</ListHeader>
            <Link href={'/rides'}>Search A Ride</Link>
            <Link href={'/create-ride'}>Offer A Ride</Link>
            <Link href={'/report'}>Report/Complain</Link>
            <Link href={'/about'}>About Us</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link href={'/privacyPolicy'}>Privacy Policy</Link>
            <Link href={'/cookies'}>Cookies Policy</Link>
            <Link href={'/terms-and-service'}>Terms of Service</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Help Center</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Install App</ListHeader>
            <Box>
              <Image
                htmlWidth={170}
                htmlHeight={45}
                objectFit='cover'
                src='assets/images/playstore.png'
                alt='Playstore Image'
              />
            </Box>
            <Box>
              <Image
                ml={1}
                htmlWidth={150}
                htmlHeight={45}
                objectFit='cover'
                src='assets/images/Appstore.svg'
                alt='Apple Store Image'
              />
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text>© 2022 Ride & Share. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
