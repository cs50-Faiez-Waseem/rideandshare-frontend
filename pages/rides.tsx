import PageLayout from '@/components/page-layout';
import RideCard from '@/components/Rides/RideCard';
import { retrieveUserSession } from '@/data/Auth.api';
import fetcher from '@/utils/fetcher';
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosPin } from 'react-icons/io';
export default function Rides() {
  const [isNotMobile] = useMediaQuery('(min-width: 760px)');
  const [isloading, setLoading] = useState<boolean>(true);
  const [pickup, setPickup] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [dropoff, setDrop] = useState<string>('');

  const [rides, setRides] = useState<Array<any>>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        setToken(token);
        fetcher('rides', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
          .then((res) => {
            setLoading(false);
            if (res.status) {
              setRides([]);
              if (res.data.total > 0) {
                res.data.data.map((ride) => {
                  setRides((r) => {
                    return [...r, ride];
                  });
                });
              }
            }
          })
          .catch((err) => console.warn(err));
      } else {
        router.replace('/');
      }
    })();
  }, []);
  return (
    <>
      <PageLayout
        title='Ride&Share | Rides'
        description='Explore The Available Rides In Your City With Ride&Share | Ride&Share is A carpooling Service.has been developed to help encourage carpooling by helping users “offer a ride” in their vehicle or “find a ride” with other users.'
      >
        <Box px={12}>
          <Box
            minH={'70vh'}
            flexWrap={isNotMobile ? 'nowrap' : 'wrap'}
            display={'flex'}
            justifyContent='center'
            alignItems={'center'}
            width='100%'
          >
            <Box width={isNotMobile ? '50%' : '100%'}>
              <Image
                src='assets/images/car-travel-2.gif'
                alt='Car travel gif'
              />
            </Box>
            <Box width={isNotMobile ? '50%' : '100%'}>
              <Box
                height={'auto'}
                width='auto'
                p={5}
                ml={4}
                boxShadow={'2xl'}
                borderRadius={20}
                bg={useColorModeValue('white', 'gray.700')}
              >
                <HStack mt={2}>
                  <IoIosPin />
                  <Input
                    variant='flushed'
                    placeholder='Search Place here..'
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </HStack>

                <Button
                  mt={3}
                  width='100%'
                  bg={'blue.400'}
                  color={'white'}
                  onClick={() => {
                    let formdata = new FormData();
                    formdata.append('sQuery', pickup);
                    fetcher('ride/search', {
                      method: 'POST',
                      body: formdata,
                      headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                      },
                    })
                      .then((res) => setRides(res.data.data))
                      .catch((err) => console.warn(err));
                  }}
                >
                  SEARCH RIDE
                </Button>
              </Box>
            </Box>
          </Box>
          <HStack>
            <Text fontWeight={'bold'} color='app.green' fontSize={22}>
              Rides Near You :
            </Text>
          </HStack>
          <Box
            display={'flex'}
            flexDirection='column'
            justifyContent='center'
            alignItems={'center'}
            py={8}
            width={'100%'}
          >
            {isloading && <Spinner />}
            {rides.map((e) => (
              <RideCard ride={e} />
            ))}
          </Box>
        </Box>
      </PageLayout>
    </>
  );
}
