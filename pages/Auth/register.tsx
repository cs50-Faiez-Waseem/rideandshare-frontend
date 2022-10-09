import PageLayout from '@/components/page-layout';
import { retrieveUserSession } from '@/data/Auth.api';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
export default function Register() {
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(true);
  const toast = useToast();
  const router = useRouter();
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (username.length > 5) {
      if (password.length > 5) {
        if (phoneNo.length > 11) {
          // router.push('/Auth/otp');
        } else {
          toast({
            title: 'Alert',
            description: 'Invalid Phone Number',
            status: 'warning',
            duration: 4000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: 'Alert',
          description: 'Password Length should be Atleast 6',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Alert',
        description: 'Username Length should be Atleast 6',
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const isLoggedIn = await retrieveUserSession();
      if (isLoggedIn) {
        router.replace('/');
      } else {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <PageLayout
      title='OfferRide | Ride&Share'
      description='Create your own carpool By Simple Registering Proccess.'
    >
      <Box minH={'50vh'} minW={'100%'}>
        <Flex minH={'80vh'} align={'center'} justify={'center'}>
          {isLoading ? (
            <Spinner />
          ) : (
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
                Create Account
              </Heading>
              <FormControl id='userName' isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder='enter your name'
                  _placeholder={{ color: 'gray.500' }}
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id='email' isRequired>
                <FormLabel>Phone</FormLabel>
                <PhoneInput
                  country={'pk'}
                  inputStyle={{
                    width: '100%',
                  }}
                  value={phoneNo}
                  onChange={(phone) => setPhoneNo('+' + phone)}
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder='password'
                  _placeholder={{ color: 'gray.500' }}
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={6} direction={['column', 'row']}>
                <Button
                  as='a'
                  href='/'
                  bg={'red.400'}
                  color={'white'}
                  w='full'
                  _hover={{
                    bg: 'red.500',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  w='full'
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={_handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          )}
        </Flex>
      </Box>
    </PageLayout>
  );
}
