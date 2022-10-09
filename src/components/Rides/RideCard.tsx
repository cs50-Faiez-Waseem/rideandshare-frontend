import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { GoStar } from 'react-icons/go';
const RideCard = ({ ride }) => {
  const [isNotMobile] = useMediaQuery('(min-width: 760px)');
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      style={{
        cursor: 'pointer',
      }}
      as='a'
      href={'/viewride/' + ride?.id}
      flexDirection={'column'}
      boxShadow={'xl'}
      mt={4}
      py={6}
      width={isNotMobile ? '70%' : '100%'}
      height={'100%'}
      borderRadius={20}
    >
      <Flex flexWrap={isNotMobile ? 'nowrap' : 'wrap'}>
        <Box width={isNotMobile ? '40%' : '100%'} ml={2}>
          <HStack mb={2}>
            <Avatar name='Some User' src='https://bit.ly/dan-abramov' />
            <Box>
              <Heading size={'md'}>{ride?.username}</Heading>
              <HStack>
                <GoStar />
                <GoStar />
                <GoStar />
                <GoStar />
                <GoStar />
              </HStack>
            </Box>
          </HStack>
          <p>{ride?.description}</p>
        </Box>
        <Box
          ml={5}
          width={isNotMobile ? '40%' : '100%'}
          mt={isNotMobile ? 0 : 5}
          textAlign={!isNotMobile ? 'center' : 'justify'}
        >
          <Text fontWeight={'bold'} color='app.green'>
            Pickup :
          </Text>
          <p>{ride?.pickup_address?.address}</p>
          <Text fontWeight={'bold'} color='app.green'>
            DropOff :
          </Text>
          <p>{ride?.dropoff_address.address}</p>
        </Box>
        <Box
          ml={4}
          width={isNotMobile ? '20%' : '100%'}
          textAlign={!isNotMobile ? 'center' : 'justify'}
          mt={isNotMobile ? 0 : 5}
        >
          <Text fontWeight={'bold'} color='app.green'>
            Time :
          </Text>
          <p>{ride?.departure_time}</p>
          <Text fontWeight={'bold'} color='app.green'>
            Fare :
          </Text>
          <p>{ride?.fare}PKR</p>
          <Text fontWeight={'bold'} color='app.green'>
            Seats :
          </Text>
          <p>{ride?.noOfSeats}</p>
        </Box>
      </Flex>
    </Flex>
  );
};

//make this component available to the app
export default RideCard;
