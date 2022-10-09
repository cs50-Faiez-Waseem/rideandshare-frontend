// @ts-nocheck
import PageLayout from '@/components/page-layout';
import { logOut, retrieveUserSession } from '@/data/Auth.api';
import fetcher from '@/utils/fetcher';
import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import firebase from '../src/backend/firebase';
export default function Profile() {
  const [isNotMobile] = useMediaQuery('(min-width: 760px)');
  const [isLoading, setLoading] = useState<boolean>(true);
  const [chatlist, setChatlist] = useState([]);
  const [myOfferedRides, setOfferdRides] = useState([]);
  const [access_token, setAccess_token] = useState<string | null>(null);
  const [notifications, setNotifications] = useState([]);
  const [rideHistory, setRideHistory] = useState([]);
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        setAccess_token(access_token);
        setLoading(false);
        fetcher('user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
          .then((res) => {
            setUser(res);
            firebase.onAdded('chatlist/' + res.id, (snap) => {
              setLoading(false);

              setChatlist((item) => {
                return [...item, snap.val()];
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        router.replace('/');
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher('user/notification', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
          .then((res) => {
            if (res.status) {
              const revArray = res.data.reverse();
              setNotifications(revArray);
            }
          })
          .catch((err) => console.warn(err));
        fetcher('user/ride/history', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
          .then((res) => {
            if (res.status) {
              setRideHistory(res.data);
            }
          })
          .catch((err) => console.warn(err));
        fetcher('user/rideOffered', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
          .then((res) => {
            if (res.status) {
              setOfferdRides(res.data.data);
            }
          })
          .catch((err) => console.warn(err));
      }
    })();
  }, []);
  return (
    <PageLayout
      title='Ride&share Profile DashBoard'
      description='Ride&Share User Profile Dsahboard.'
    >
      <Box py={12}></Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <Stack minH={'70vh'} direction={{ base: 'column', md: 'row' }}>
          <Tabs variant='enclosed' width={isNotMobile && '60vw'}>
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Chats</Tab>
              <Tab>Notification</Tab>
              <Tab>Trips</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserProfileEdit />
              </TabPanel>
              <TabPanel>
                {(chatlist || []).map((e) => (
                  <UserChatCard data={e} currentUser={user} />
                ))}
              </TabPanel>
              <TabPanel>
                {notifications.map((e) => (
                  <NotificationCard type={'something'} data={e} />
                ))}
              </TabPanel>
              <TabPanel>
                <Tabs>
                  <TabList>
                    <Tab>Rides Taken</Tab>
                    <Tab>Rides offered</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {rideHistory.map((e) => (
                        <RideTakenCard ride={e} />
                      ))}
                    </TabPanel>
                    <TabPanel>
                      {myOfferedRides.map((e) => (
                        <RideOffered ride={e} />
                      ))}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      )}
    </PageLayout>
  );
}

function UserProfileEdit() {
  const fileInput = useRef<HTMLInputElement>();
  const [user, setUser] = useState<object>({});
  const selectFile = () => {
    fileInput.current.click();
  };
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher('user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
          .then((res) => {
            setUser(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        router.replace('/');
      }
    })();
  }, []);

  return (
    <Flex
      minH={'60vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id='userName'>
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size='xl' src={user?.avatar}>
                <AvatarBadge
                  as={IconButton}
                  size='sm'
                  rounded='full'
                  top='-10px'
                  colorScheme='red'
                  aria-label='remove Image'
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w='full'>
              <input
                type='file'
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={(e) => console.log(e.target.value)}
              />
              <Button w='full' onClick={selectFile}>
                Change Icon
              </Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id='userName'>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder='UserName'
            _placeholder={{ color: 'gray.500' }}
            type='text'
            value={user?.username}
            onChange={(event) => {
              setUser((e) => {
                return {
                  ...e,
                  username: event.target.value,
                };
              });
            }}
          />
        </FormControl>
        <FormControl id='email'>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder='your-email@example.com'
            _placeholder={{ color: 'gray.500' }}
            type='email'
            value={user?.email}
            onChange={(event) => {
              setUser((e) => {
                return {
                  ...e,
                  email: event.target.value,
                };
              });
            }}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Phone No</FormLabel>
          <Input
            placeholder='phoneNo'
            _placeholder={{ color: 'gray.500' }}
            type='tel'
            isDisabled={true}
            value={user?.phoneNo}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.500'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'red.700',
            }}
            onClick={() => {
              logOut((res) => {
                if (res) {
                  toast({
                    isClosable: false,
                    duration: 3000,
                    status: 'success',
                    description: 'You Have Been Logged Out!',
                  });
                  router.replace('/');
                }
              });
            }}
          >
            Log Out
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'blue.500',
            }}
            onClick={async () => {
              const token = await retrieveUserSession();
              if (token) {
                let formdata = new FormData();
                formdata.append('username', user?.username);
                formdata.append('email', user?.email);
                fetcher('user/update', {
                  method: 'POST',
                  body: formdata,
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                  },
                })
                  .then((res) => {
                    if (res.updated) {
                      toast({
                        isClosable: false,
                        duration: 3000,
                        status: 'success',
                        description: 'Profile Info Updated!',
                      });
                    }
                  })
                  .catch((err) => console.log(err));
              }
            }}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

function UserChatCard({ data, currentUser }) {
  useEffect(() => {
    console.clear();
    console.log(data);
  }, []);
  return (
    <Box
      _dark={{
        bg: 'coolGray.800',
      }}
      _light={{
        bg: 'white',
      }}
    >
      <Box pl='4' pr='5' py='2'>
        <HStack>
          <Avatar
            size='md'
            src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          />
          <VStack w='70%' alignItems={'flex-start'}>
            <Text
              color='app.green'
              _dark={{
                color: 'warmGray.50',
              }}
              fontWeight='bold'
            >
              {currentUser.id === data.recieverId
                ? data.senderName
                : data.recieverName}
            </Text>
            <Text
              color='coolGray.600'
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {currentUser === data.recieverId
                ? data.message
                : 'You :' + data.message}
            </Text>
          </VStack>

          <Text
            fontSize='xs'
            color='coolGray.800'
            _dark={{
              color: 'warmGray.50',
            }}
            textAlign='end'
          >
            {data.time}
          </Text>
        </HStack>
      </Box>
      <Divider />
    </Box>
  );
}

function NotificationCard({ type, data }) {
  const [user, setUser] = useState({});

  return (
    <Box mt={2}>
      {type === 'rideRequest' ? (
        <Box w='100%' h='140'>
          <HStack>
            <Center>
              <Avatar
                size={'md'}
                bg='green.500'
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
              ></Avatar>
            </Center>
            <Center>
              <Text fontWeight={'bold'} color='app.green' m={2}>
                Sara Khan
              </Text>
            </Center>
          </HStack>
          <Text ml={2}>Fahad request To Join The Ride</Text>
          <HStack mt={4} w='100%'>
            <Box w='50%'>
              <Button borderRadius={50}>Detail</Button>
            </Box>
            <HStack w='50%' justifyContent='flex-end'>
              <Button
                borderRadius={50}
                w='40%'
                bg='red.400'
                color={'white'}
                _hover={{
                  background: 'red.300',
                }}
              >
                Decline
              </Button>
              <Button
                borderRadius={50}
                w='40%'
                bg='app.green'
                color={'white'}
                _hover={{
                  background: 'green.400',
                }}
              >
                Accept
              </Button>
            </HStack>
          </HStack>
          <Divider mt={2} />
        </Box>
      ) : (
        <Box w='100%' h='auto' p='1'>
          <HStack>
            <VStack
              w='100%'
              alignItems={'flex-start'}
              justifyContent='flex-start'
            >
              <Text fontWeight={'bold'} color='app.green' mt={1}>
                Message
              </Text>
              <Text>{data?.message}</Text>
            </VStack>
          </HStack>
          <Divider mt={1} />
        </Box>
      )}
    </Box>
  );
}

function RideTakenCard({ ride }) {
  return (
    <Box
      bg='#fff'
      _dark={{
        background: 'coolGray.600',
      }}
      shadow={2}
      p={2}
      m={2}
      borderRadius={6}
    >
      <HStack>
        <FaMapMarkerAlt />
        <Text ml={2} flex={1}>
          {ride?.pickup_address?.address}
        </Text>
        <Text
          color='coolGray.400'
          _dark={{
            color: 'coolGray.400',
          }}
        >
          {ride?.ride?.departure_time}
        </Text>
      </HStack>
      <VStack
        bg={'#000'}
        w={1}
        h={6}
        borderRadius={6}
        ml={1}
        mt={2}
        mb={1}
      ></VStack>
      <HStack>
        <FaMapMarkerAlt />
        <Text ml={2} flex={1}>
          {ride?.dropoff_address?.address}
        </Text>
        <Text
          color='coolGray.400'
          _dark={{
            color: 'coolGray.400',
          }}
        ></Text>
      </HStack>
      <Divider
        m={1}
        _dark={{
          background: 'coolGray.400',
        }}
      />
      <Text>Date : {ride?.ride.departure_date?.substring(0, 10)}</Text>
    </Box>
  );
}

function RideOffered({ ride }) {
  return (
    <Box
      bg='#fff'
      _dark={{
        background: 'coolGray.600',
      }}
      as='a'
      href={`ride/summary/${ride.id}`}
      shadow={2}
      p={2}
      m={2}
      borderRadius={6}
    >
      <HStack>
        <FaMapMarkerAlt />
        <Text ml={2} flex={1}>
          {ride?.pickup_address.address}
        </Text>
        <Text
          color='coolGray.400'
          _dark={{
            color: 'coolGray.400',
          }}
        >
          {ride?.departure_time}
        </Text>
      </HStack>
      <VStack bg={'#000'} w={1} h={6} borderRadius={6} ml={1}></VStack>
      <HStack>
        <FaMapMarkerAlt />
        <Text ml={2} flex={1}>
          {ride?.dropoff_address?.address}
        </Text>
        <Text
          color='coolGray.400'
          _dark={{
            color: 'coolGray.400',
          }}
        ></Text>
      </HStack>
      <Divider
        m={1}
        _dark={{
          background: 'coolGray.400',
        }}
      />
      <HStack spacing={2} display={'flex'} justifyContent={'space-between'}>
        <Text>Date : {ride?.departure_date?.substring(0, 10)}</Text>
        <Text>Fare : {ride?.fare} PKR</Text>
      </HStack>
      <HStack spacing={2} display={'flex'} justifyContent={'space-between'}>
        <Text>Seats : {ride?.noOfSeats}</Text>
        <Text>Booked : {ride?.booked}</Text>
      </HStack>
    </Box>
  );
}
