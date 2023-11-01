import { Avatar, Box, Button, Card, CardBody, CardFooter, Flex, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsBookmark } from 'react-icons/bs'

import { AiOutlineUser } from 'react-icons/ai'
const MiniCard_Recipes = () => {
    return (
        <div>
            <Card
                maxW='md'
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                p="10px"

            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '100px' }}
                    maxH={{ sm: '80px' }}
                    borderRadius="5px"
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>Name of recipe</Heading>

                        <Text >
                            By Name Who is Posted
                        </Text>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    )
}

const MiniCard_Chef = () => {
    return (
        <div>
            <Card maxW='md'  p="10px">
                <Flex justify="space-between"
                align="center">
                    <Avatar src={<AiOutlineUser />} />
                    <Box>
                        <Heading size='sm'>Name of who is posted</Heading>
                    </Box>
                    <Button>Follow</Button>
                </Flex>
            </Card>
        </div>
    )
}

export { MiniCard_Chef, MiniCard_Recipes } 