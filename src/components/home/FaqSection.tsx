import React from 'react';
import { Box, Text  , HStack, VStack , Heading , useMediaQuery} from '@chakra-ui/react'

export default function FaqSection(){
    const [isMobile] = useMediaQuery('(min-width: 700px)')
    return <Box display={'flex'} flexDirection='column' justifyContent={'center'} mt={5} >
        <Heading textAlign={'center'}>FAQ's</Heading>
        <HStack flexDirection={isMobile ? 'row' : 'column'}>
           <CardFaq title={'How To Book A Ride ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolorem beatae ea saepe laborum rerum dolores et accusantium vel! Accusamus dolores labore fugit exercitationem. Ipsa qui eum libero cupiditate blanditiis! Aliquid, quo? Autem placeat praesentium enim ratione ipsum iusto pariatur beatae a similique, consectetur eos esse veritatis! Inventore, provident officia!'} />
           <CardFaq title={'How To Book A Ride ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolorem beatae ea saepe laborum rerum dolores et accusantium vel! Accusamus dolores labore fugit exercitationem. Ipsa qui eum libero cupiditate blanditiis! Aliquid, quo? Autem placeat praesentium enim ratione ipsum iusto pariatur beatae a similique, consectetur eos esse veritatis! Inventore, provident officia!'} />
        </HStack>
        <HStack  flexDirection={isMobile ? 'row' : 'column'}>
           <CardFaq title={'How To Book A Ride ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolorem beatae ea saepe laborum rerum dolores et accusantium vel! Accusamus dolores labore fugit exercitationem. Ipsa qui eum libero cupiditate blanditiis! Aliquid, quo? Autem placeat praesentium enim ratione ipsum iusto pariatur beatae a similique, consectetur eos esse veritatis! Inventore, provident officia!'} />
           <CardFaq title={'How To Book A Ride ?'} answer={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolorem beatae ea saepe laborum rerum dolores et accusantium vel! Accusamus dolores labore fugit exercitationem. Ipsa qui eum libero cupiditate blanditiis! Aliquid, quo? Autem placeat praesentium enim ratione ipsum iusto pariatur beatae a similique, consectetur eos esse veritatis! Inventore, provident officia!'} />
        </HStack>
        
    </Box>
}
type Props = {
    title : String,
    answer : String
}

const CardFaq = ({title  , answer} : Props) =>{

    return (
        <VStack mt={3}>
            <Text fontWeight='extrabold' color={'app.green'}>{title}</Text>
            <Text color={'CaptionText'}>{answer.length > 130 ? answer.substring(0 , 130) + '  See More...' : answer}</Text>
        </VStack>
    )

}