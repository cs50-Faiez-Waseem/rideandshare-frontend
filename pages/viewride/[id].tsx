// @ts-nocheck
import { retrieveUserSession } from '@/data/Auth.api';
import fetcher from '@/utils/fetcher';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Input,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/Script';
import { useEffect, useRef, useState } from 'react';
import { GoStar } from 'react-icons/go';
const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ride, setRide] = useState<Object>({});
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [totalSeatsLeft] = useState(ride?.noOfSeats - ride?.booked);
  const [noOfSeats, setNoOfSeats] = useState(1);
  const [isNotMobile] = useMediaQuery('(min-width: 760px)');
  const [_customFare, _setCustomeFare] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const renderMap = () => {
    try {
      setTimeout(() => {
        class MapView {
          map = null;
          popup = null;
          marker = null;
          defaultCircleConfig = {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 500,
          };
          constructor(a = [46.386338941059, -123.538660985981]) {
            (this.map = L.map('map').setView(a, 16)),
              L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                { maxZoom: 20, attribution: '\xa9 OpenStreetMap' }
              ).addTo(this.map),
              (this.popup = L.popup());
          }
          createTwoPoints(a, b) {
            try {
              L.Routing.control({
                waypoints: [L.latLng(a[0], a[1]), L.latLng(b[0], b[1])],
              }).addTo(this.map);
            } catch {
              throw new Error('Illegal Arguments ~ Pass Array');
            }
          }
          createMarker(a = []) {
            this.marker = L.marker(a).addTo(this.map);
          }
          createRadius(a, b = this.defaultCircleConfig) {
            L.circle(a, b).addTo(this.map);
          }
          onClickListener(b = null, a = !1, c = !1) {
            a
              ? this.map.on('click', (a) => {
                  c ||
                    this.popup
                      .setLatLng(a.latlng)
                      .setContent('You clicked the map here ' + a.latlng)
                      .openOn(this.map);
                  let d = [];
                  d.push(a.latlng.lat),
                    d.push(a.latlng.lng),
                    this.marker.setLatLng(d).update(),
                    b(a);
                })
              : this.map.on('click', (a) => {
                  c ||
                    this.popup
                      .setLatLng(a.latlng)
                      .setContent('You clicked the map here ' + a.latlng)
                      .openOn(this.map),
                    b(a);
                });
          }
          addSearchBar() {
            var a = new L.esri.Controls.Geosearch().addTo(this.map),
              b = new L.LayerGroup().addTo(this.map);
            a.on('results', function (c) {
              b.clearLayers();
              for (var a = c.results.length - 1; a >= 0; a--)
                b.addLayer(L.marker(c.results[a].latlng));
            });
          }
          getcurrentLocation() {
            navigator.geolocation
              ? navigator.geolocation.getCurrentPosition(
                  (c) => {
                    let b = {
                      lat: c.coords.latitude,
                      lng: c.coords.longitude,
                    };
                    console.log(b);
                    let a = [];
                    a.push(b.lat),
                      a.push(b.lng),
                      this.marker.setLatLng(a).update(),
                      this.invoke(JSON.stringify(a));
                  },
                  () => {
                    alert('Failed To Get Location ');
                  }
                )
              : alert('doesnt support Geolocation');
          }
        }
        let mymap = new MapView([24.8990162, 67.0308583]);
        mymap.createTwoPoints(
          [ride?.pickup_address?.latitude, ride?.pickup_address?.longitude],
          [ride?.dropoff_address?.latitude, ride?.dropoff_address?.longitude]
        );
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error({
        type: 'L is not defined',
        detail: error,
      });
    } finally {
      console.log('finally');
    }
  };

  useEffect(() => {
    if (id)
      (async () => {
        const token = await retrieveUserSession();
        if (token) {
          fetcher(`ride/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          })
            .then((res) => {
              if (res?.status) {
                setRide(res.data);
                renderMap();
              }
            })
            .catch((err) => console.warn(err));
        }
      })();
  }, [id]);

  useEffect(() => {
    if (!isNotMobile) {
      document
        ?.querySelector('.leaflet-routing-alternatives-container')
        ?.remove();
    }
  }, [isNotMobile]);
  const onHandleSubmit = () => {
    if (_customFare) {
      (async () => {
        const token = await retrieveUserSession();
        if (token) {
          let formdata = new FormData();
          formdata.append('ride_id', ride.id);
          formdata.append('status', 'pending');
          formdata.append('seats_count', noOfSeats);
          formdata.append('offered_fare', _customFare);
          fetcher('user/ride-request', {
            method: 'POST',
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          })
            .then((res) => {
              console.log(res);
              if (res.status) {
                toast({
                  description: 'Ride Request Sent successfully',
                  duration: 3000,
                  isClosable: true,
                  status: 'success',
                });
              } else {
                toast({
                  description: 'Ride Request Sent Failed : ' + res.data,
                  duration: 3000,
                  isClosable: true,
                  status: 'error',
                });
              }
            })
            .catch((err) => console.warn(err));
        }
      })();
    } else {
      (async () => {
        const token = await retrieveUserSession();
        if (token) {
          let formdata = new FormData();
          formdata.append('ride_id', ride.id);
          formdata.append('status', 'pending');
          formdata.append('seats_count', noOfSeats);
          fetcher('user/ride-request', {
            method: 'POST',
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          })
            .then((res) => {
              setLoading(false);
              console.log(res);
              if (res.status) {
                toast({
                  description: 'Ride Request Sent successfully',
                  duration: 3000,
                  isClosable: true,
                  status: 'success',
                });
              } else {
                toast({
                  description: 'Ride Request Sent Failed : ' + res.data,
                  duration: 3000,
                  isClosable: true,
                  status: 'error',
                });
              }
            })
            .catch((err) => console.warn(err));
        }
      })();
    }
  };
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.2.0/dist/leaflet.css'
        />
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css'
        />
        <link
          rel='stylesheet'
          href='http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css'
        />

        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.css'
        ></link>
      </Head>
      <Script src='https://unpkg.com/leaflet@1.2.0/dist/leaflet.js'></Script>
      <Script src='https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js'></Script>
      <Script src='https://cdn-geoweb.s3.amazonaws.com/esri-leaflet/0.0.1-beta.5/esri-leaflet.js'></Script>
      <Script src='https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.js'></Script>

      {isLoading && (
        <Box
          width={'100%'}
          height={400}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          bg={'rgba(0, 0, 0, 0.5)'}
          color={'#fff'}
        >
          Map Loading... <Spinner />{' '}
        </Box>
      )}
      <Box>
        <div
          id='map'
          style={{ width: '100%', height: isNotMobile ? 450 : 300 }}
        ></div>
      </Box>
      <HStack>
        <HStack w={isNotMobile ? '90%' : '70%'} h='auto'>
          <Center ml={2}>
            <Avatar
              bg='green.500'
              source={{
                uri: ride?.avatar
                  ? ride?.avatar
                  : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            ></Avatar>
          </Center>
          <VStack ml={2}>
            <Text fontWeight={'bolder'} color='app.green'>
              {ride?.username}
            </Text>
            <HStack>
              <GoStar color='yellow' />
              <GoStar color='yellow' />
              <GoStar color='yellow' />
              <GoStar color='yellow' />
            </HStack>
          </VStack>
        </HStack>
        <VStack w={isNotMobile ? '10%' : '30%'} h='auto'>
          <Text fontWeight={'bolder'} w={'100%'} color='app.green'>
            Fare :{' '}
          </Text>
          <Text w={'100%'}>{ride?.fare} Rs</Text>
          <Text fontWeight={'bolder'} color='app.green' w={'100%'}>
            Seats :{' '}
          </Text>
          <Text w={'100%'}>{ride?.noOfSeats}</Text>
          <Text w={'100%'} fontWeight={'bolder'} color='app.green'>
            Date :{' '}
          </Text>
          <Text w={'100%'}>{ride?.departure_date?.substring(0, 10)}</Text>
        </VStack>
      </HStack>
      <Box ml={2} mr={2} h={70}>
        <Text>{ride?.description}</Text>
      </Box>
      <VStack ml={2} mt={2}>
        <Text fontWeight={'bolder'} color='app.green'>
          Pickup:
        </Text>
        <Text>{ride?.pickup_address?.address}</Text>
      </VStack>
      <VStack ml={2} mt={2}>
        <Text fontWeight={'bolder'} color='app.green'>
          DropOff:
        </Text>
        <Text>{ride?.dropoff_address?.address}</Text>
      </VStack>
      <Center py={4}>
        <Button bg={'app.green'} color='#fff' onClick={onOpen}>
          Request Ride
        </Button>
      </Center>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Ride Request</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Input
              placeholder='Amount'
              type={'number'}
              value={_customFare}
              onChange={(e) => {
                if (parseInt(e.target.value) <= parseInt(ride?.fare)) {
                  _setCustomeFare(e.target.value);
                } else if (e.target.value == '') {
                  _setCustomeFare(e.target.value);
                }
              }}
            />
            *Leave Blank if not offering a custom fare amount.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              CANCEL
            </Button>
            <Button
              colorScheme='red'
              ml={3}
              onClick={() => {
                onHandleSubmit();
                onClose();
              }}
            >
              SEND
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Box py={4}></Box>
    </>
  );
};

export default Post;
