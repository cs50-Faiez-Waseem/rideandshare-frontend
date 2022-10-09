import { Box, Text, Flex, Center, Heading, Image, useMediaQuery   , Button} from '@chakra-ui/react'

const DriveSection = () => {
    const [isMobile] = useMediaQuery('(min-width: 760px)')
    return (
        <Box p={4} m={3} mt={5} mb={5} height={isMobile ? '300' : 'auto'} display='flex'
            justifyContent={'center'}
            alignItems='center'
            flexWrap={!isMobile ? 'wrap' : 'nowrap'} >
            <Box width={isMobile ? '30%' : '50%'} height='auto'>
                <Image
                    objectFit='cover'
                    src={'assets/images/taxi-car.png'}
                    alt='alt : taxi-car image'
                />

            </Box>
            <Box width={isMobile ? '70%' : 'auto'} display='flex' justifyContent={'center'} flexDirection='column' alignItems={'center'}>
                <Heading>Want To Drive?</Heading>
                <Text textAlign={'center'} m={5}>Want to Drive , Offer your own ride , <br/>Its Easy an Simple With just few clicks away .<br /> To maintain safe environment we just need you to verfiy it can be done with id card or driver licence</Text>
                 <Button bg='app.green' borderRadius={20} minWidth={!isMobile ? 150 : 180} color='white' _hover={{
                    background : 'teal'
                 }}>Offer A Ride</Button>
            </Box>
        </Box>
    );
};


//make this component available to the app
export default DriveSection;
