import PageLayout from '@/components/page-layout';
import { login, retrieveUserSession } from '@/data/Auth.api';
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
export default function SignIn() {
  const [phoneNo, setPhoneNo] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const toast = useToast();
  const _handleSubmit = (e) => {
    e.preventDefault();
    login(
      {
        phoneNo: '+' + phoneNo,
        password: password,
      },
      (res) => {
        console.log(res);
        if (res?.isRegisterd) {
          toast({
            title: 'LoggedIn',
            description: 'You have succefully logged into your  account',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          router.replace('/');
        } else {
          toast({
            title: 'Alert',
            description: res.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    );
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
                SignIn To Account
              </Heading>
              <FormControl id='phone' isRequired>
                <FormLabel>Phone</FormLabel>
                <PhoneInput
                  inputStyle={{
                    width: '100%',
                  }}
                  country={'pk'}
                  value={phoneNo}
                  onChange={(phone) => setPhoneNo(phone)}
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
                  href='/Auth/register'
                  bg={'red.400'}
                  color={'white'}
                  w='full'
                  _hover={{
                    bg: 'red.500',
                  }}
                >
                  create a new Account
                </Button>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  w='full'
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={_handleSubmit}
                  type='button'
                >
                  SigIn
                </Button>
              </Stack>
            </Stack>
          )}
        </Flex>
      </Box>
    </PageLayout>
  );
}
