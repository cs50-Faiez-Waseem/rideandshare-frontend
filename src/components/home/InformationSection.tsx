import * as React from 'react'
import { Box , Text , Flex , Center, Heading  , Image , useMediaQuery} from '@chakra-ui/react'
import { title } from 'process';

// create a component
const Information = () => {
    const [isMobile] = useMediaQuery('(min-width: 600px)')
    return (
        <Flex  justify={'space-evenly'} flexWrap={!isMobile ? 'wrap' : 'nowrap'} >
           <ContentCard src='assets/images/compose.png' heading='Identification' text='We have verified every driver , So you don’t have to worry' />
           <ContentCard src='assets/images/done.png' heading='Secure' text='Thanks , to our powerful Technology your information is Safe & Secure with Us.  ' />
           <ContentCard src='assets/images/car.png'  heading='Easy Rides' text='With our service you will find rides with ease ' />
        </Flex>
    );
};

const ContentCard : React.FC<{src : string , heading : string , text : string}> = ({src , heading , text})  =>{
  return(<Center flexDirection={'column'}  ml={3} >
    <Image  boxSize='68px'
    objectFit='cover'
    src={src}
    alt={'alt : '+title} />
    <Heading m={3}>{heading}</Heading>
    <Text align={'center'}>{text}</Text>
  </Center>)
}



export default Information;
