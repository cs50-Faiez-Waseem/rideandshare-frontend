import DownloadSection from '@/components/home/DownloadAppSection';
import DriveSection from '@/components/home/DriveSection';
import FaqSection from '@/components/home/FaqSection';
import Information from '@/components/home/InformationSection';
import PageLayout from '@/components/page-layout';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
const IndexPage = () => {
  const { t } = useTranslation();
  const [isMobile] = useMediaQuery('(min-width: 760px)');

  return (
    <>
      <PageLayout
        title='Home |  Ride&Share'
        description='Ride&Share is A carpooling Service.has been developed to help encourage carpooling by helping users “offer a ride” in their vehicle or “find a ride” with other users.'
      >
        <Stack minH={'70vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: useBreakpointValue({ base: '20%', md: '30%' }),
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'app.green',
                    zIndex: -1,
                  }}
                >
                  Ride&Share
                </Text>
                <br />{' '}
                <Text color={'app.green'} as={'span'}>
                  Carpool
                </Text>{' '}
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                carpooling system has been developed to help encourage
                carpooling by helping users “offer a ride” in their vehicle or
                “find a ride” with other users.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  as={'a'}
                  href='/rides'
                  rounded={'full'}
                  bg={'app.green'}
                  color={'white'}
                  _hover={{
                    bg: 'teal',
                  }}
                >
                  Find A Ride
                </Button>
                <Button rounded={'full'} as='a' href='/create-ride'>
                  Create A Ride
                </Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1} justifyContent='center' alignItems={'center'}>
            <Image
              maxHeight={400}
              alt={'Login Image'}
              src={'assets/images/world-map.png'}
            />
          </Flex>
        </Stack>
        <Box py={12}></Box>
        <Information />
        <Box py={12}></Box>
        <DriveSection />
        <Box py={12}></Box>
        <FaqSection />
        <Box py={12}></Box>
        <DownloadSection />
        <Box py={12}></Box>
      </PageLayout>
    </>
  );
};

export default IndexPage;
