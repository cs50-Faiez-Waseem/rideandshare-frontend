import { Box, Text, HStack, Heading, Image, useMediaQuery   , Button} from '@chakra-ui/react'


// create a component
const DownloadSection = () => {
    const [isMobile] = useMediaQuery('(min-width: 760px)')
    return (
        <Box p={4} m={3} mt={5} mb={5} height={isMobile ? '300' : 'auto'} display='flex'
        justifyContent={'center'}
        alignItems='center'
        flexWrap={!isMobile ? 'wrap' : 'nowrap'}  >
          <Box width={isMobile ? '70%' : 'auto'}>
            <Heading color={'app.green'}>For Better Experience Download Mobile App</Heading>
            <HStack m={2}>
            <Box >
              <Image htmlWidth={170} htmlHeight={45} objectFit='cover' src='assets/images/playstore.png' alt='Playstore Image' />
            </Box>
            <Box>
              <Image ml={1} htmlWidth={150} htmlHeight={45}  objectFit='cover' src='assets/images/Appstore.svg' alt='Apple Store Image' />
            </Box>

            </HStack>
          </Box>
          <Box width={isMobile ? '30%' : '50%'} height='auto'>
                <Image
                    objectFit='cover'
                    src={'assets/images/mobile.png'}
                    alt='alt : taxi-car image'
                />

            </Box>
        </Box>
    );
};

export default DownloadSection;

