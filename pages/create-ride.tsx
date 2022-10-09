// @ts-nocheck
import PageLayout from '@/components/page-layout';
import { retrieveUserSession } from '@/data/Auth.api';
import fetcher from '@/utils/fetcher';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  useColorModeValue,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { IoIosPin } from 'react-icons/io';
export default function OfferRide() {
  const toast = useToast();
  const [isNotMobile] = useMediaQuery('(min-width: 760px)');
  const [value, setValue] = useState('');
  const [fare, setFare] = useState('');
  const [sdate, setDate] = useState('');
  const [desc, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState('');
  const [pickup, setPickup] = useState({});
  const [dropOff, setDropOff] = useState({});
  const [MyVehicles, setMyVehicles] = useState([]);
  const autoCompleteRefPickup = useRef();
  const autoCompleteRefDropOff = useRef();
  const inputRef = useRef();
  const inputRef2 = useRef();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher('rides', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
          .then((res) => {})
          .catch((err) => console.warn(err));
      } else {
        router.replace('/');
      }
    })();
  }, []);
  const options = {
    componentRestrictions: { country: 'pk' },
  };
  useEffect(() => {
    autoCompleteRefPickup.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRefPickup.current.addListener(
      'place_changed',
      async function () {
        const place = await autoCompleteRefPickup.current.getPlace();
        let add = place.formatted_address;
        let value = add.split(',');
        let count = value.length;
        let city = value[count - 3];
        setPickup({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address,
          name: place.formatted_address,
          city: city,
        });
      }
    );
    autoCompleteRefDropOff.current = new window.google.maps.places.Autocomplete(
      inputRef2.current,
      options
    );
    autoCompleteRefDropOff.current.addListener(
      'place_changed',
      async function () {
        const place = await autoCompleteRefDropOff.current.getPlace();
        let add = place.formatted_address;
        let value = add.split(',');
        let count = value.length;
        let city = value[count - 3];
        setDropOff({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address,
          name: place.formatted_address,
          city: city,
        });
      }
    );
  }, []);
  useEffect(() => {
    (async () => {
      const access_token = await retrieveUserSession();
      if (access_token) {
        fetcher('user/vehicle', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
          },
        })
          .then((res) => {
            if (res.status) {
              setMyVehicles(res.data);
            }
          })
          .catch((err) => console.warn(err));
      }
    })();
  }, []);

  const _handleclick = (e) => {
    e.preventDefault();
    if (desc.length < 351) {
      if (value) {
        if (fare.length != 0) {
          if (
            seats.length != 0 &&
            time.length != 0 &&
            sdate.length != 0 &&
            dropOff.length != 0 &&
            pickup.length != 0
          ) {
            (async () => {
              const token = await retrieveUserSession();
              if (token) {
                let formdata = new FormData();
                formdata.append('drop_address', dropOff.address);
                formdata.append(
                  'drop_city',
                  dropOff.city.replace('City', '').trim()
                );
                formdata.append('drop_latitude', dropOff.latitude);
                formdata.append('drop_longitude', dropOff.longitude);
                formdata.append('pick_address', pickup.address);
                formdata.append(
                  'pick_city',
                  pickup.city.replace('City', '').trim()
                );
                formdata.append('pick_longitude', pickup.longitude);
                formdata.append('pick_latitude', pickup.latitude);
                formdata.append('departure_date', sdate);
                formdata.append('departure_time', time);
                formdata.append('status', 'pending');
                formdata.append('noOfSeats', seats);
                formdata.append('fare', parseFloat(fare));
                formdata.append('vehicle_id', value);
                formdata.append('description', desc);
                fetcher('user/ride/save', {
                  method: 'POST',
                  body: formdata,
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                  },
                })
                  .then((res) => {
                    if (res.status) {
                      toast({
                        title: 'Alert',
                        description: 'Trip created SuccessFully',
                        duration: 3000,
                      });
                    } else {
                      toast({
                        title: 'Alert',
                        description: 'Trip creation Failed',
                        duration: 3000,
                      });
                    }
                  })
                  .catch((err) => console.warn(err));
              }
            })();
          } else {
            toast({
              title: 'Alert',
              description: 'Please Fill Out all Feilds',
              duration: 3000,
            });
          }
        } else {
          toast({
            title: 'Alert',
            description: 'Please Enter Fare Amount',
          });
        }
      }
    } else {
      toast({
        title: 'Alert',
        description: 'description too long',
      });
    }
  };
  return (
    <PageLayout
      title='OfferRide | Ride&Share'
      description='Create your own carpool'
    >
      <Head>
        <script
          src='https://maps.googleapis.com/maps/api/js?key=AIzaSyB2HyNTBm1sQJYJkwOOUA1LXRHAKh4gmjU&libraries=places&callback=initMap'
          async
        ></script>
      </Head>
      <Box py={12}></Box>

      <Box
        minH={'80vh'}
        flexWrap={isNotMobile ? 'nowrap' : 'wrap'}
        display={'flex'}
        justifyContent='center'
        alignItems={'center'}
        width='100%'
      >
        <Box width={isNotMobile ? '50%' : '100%'}>
          <Box
            height={'auto'}
            width='auto'
            p={5}
            ml={4}
            boxShadow={'2xl'}
            bg={useColorModeValue('white', 'gray.700')}
          >
            <HStack mt={2} w={'100%'}>
              <IoIosPin />
              <Input
                ref={inputRef}
                variant='flushed'
                placeholder='Leaving From..'
              />
            </HStack>
            <HStack mt={2}>
              <IoIosPin />
              <Input
                variant='flushed'
                placeholder='Going To..'
                ref={inputRef2}
              />
            </HStack>
            <Box
              m={isNotMobile ? 4 : 1}
              p={isNotMobile ? 3 : 2}
              width={isNotMobile ? '94%' : '100%'}
              display={'flex'}
              justifyContent='space-between'
            >
              <Box width={!isNotMobile && '40%'}>
                <Text>Date :</Text>
                <Input
                  type={'date'}
                  mr={isNotMobile ? 0 : 1}
                  onChange={(e) => {
                    setDate(new Date(e.target.valueAsDate).toISOString());
                  }}
                />
              </Box>
              <Box width={!isNotMobile && '40%'}>
                <Text>Time :</Text>
                <Input
                  type={'time'}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Flex mt={3} justifyContent='space-around'>
              <Box width={!isNotMobile && '40%'}>
                <Text>Fare</Text>
                <Input
                  htmlSize={4}
                  type={'number'}
                  value={fare}
                  onChange={(e) => setFare(e.target.value)}
                />
              </Box>
              <Box width={!isNotMobile && '40%'}>
                <Text>Seats</Text>
                <Input
                  type={'number'}
                  htmlSize={4}
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
              </Box>
            </Flex>
            <Box mt={3}>
              <Text fontWeight={'bold'} m={2}>
                Select Ride Type:
              </Text>

              <HStack direction='row'>
                <Select
                  placeholder='Select option'
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  value={value}
                >
                  {MyVehicles.map((e) => (
                    <option value={e.id} key={e.id.toString()}>
                      {'Type : ' + e.type + ` | Car No : ${e.no}`}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Box>
            <Box m={3}>
              <Textarea
                placeholder='enter any note here about the trip '
                size='sm'
                value={desc}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Button
              mt={3}
              width='100%'
              bg={'blue.400'}
              color={'white'}
              onClick={_handleclick}
            >
              CREATE RIDE
            </Button>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}
