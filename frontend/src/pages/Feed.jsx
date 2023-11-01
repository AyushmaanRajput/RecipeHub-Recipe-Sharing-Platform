import { Box, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import FeedCard from '../components/Feed/FeedCard'
import { MiniCard_Chef, MiniCard_Recipes } from '../components/Feed/MiniCard'
import styled from '@emotion/styled'

export const Feed = () => {
  let arr = new Array(10).fill(1)
  return (
    <DIV>
      <Flex spacing={8} direction='row'>
        <Box p={5} h="90vh" overflowY="scroll" className='scroll' >
          {arr.map((_, index) => {
            return <FeedCard key={index} />
          })}
        </Box>
        <Box p={5}  h="80vh" spacing="10px"  >
          <MiniCard_Recipes />
          <MiniCard_Recipes />
          <MiniCard_Recipes />
          <MiniCard_Chef />
          <MiniCard_Chef />
          <MiniCard_Chef />
        </Box>
      </Flex>
    </DIV>
  )
}

const DIV = styled.div`
  background-color:#f7fbfc;
  .scroll::-webkit-scrollbar{
    display: none;
    
     }
`