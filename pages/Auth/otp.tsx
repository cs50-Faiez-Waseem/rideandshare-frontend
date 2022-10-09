import PageLayout from '@/components/page-layout';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Box,
    PinInput, PinInputField, HStack
} from '@chakra-ui/react';
import { IoIosPin } from "react-icons/io";


export default function Otp() {
    return (<PageLayout
        title='OfferRide | Ride&Share'
        description='Create your own carpool'
    >
        <Box minH={'70vh'}>
            <Flex
                minH={'70vh'}
                align={'center'}
                justify={'center'}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                        Enter your Opt here.
                    </Heading>
                    <Text
                        fontSize={{ base: 'sm', sm: 'md' }}
                        color={useColorModeValue('gray.800', 'gray.400')}>
                        We have sent Your Otp Message on this number +92 xxx-xxxxxxx
                    </Text>
                    <FormControl id="email">
                        <HStack w='100%' justifyContent={'center'}>
                            <PinInput>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                           Verfiy
                        </Button>
                    </Stack>
                </Stack>
            </Flex>

        </Box>


    </PageLayout>)
}