
import { Box, Divider, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { ITweet } from '@circle-app/api-interfaces';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import TweetsCard from './atoms/TweetsCard';

export default function Explore() {
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const [pageIndex, setPageIndex] = useState(0)
    const [fetch, setFetch] = useState(false)
    const [noData, setNoData] = useState(false)
    const listRef = useRef<HTMLDivElement>(null);

    const fetchTweet = async () => {
        try {
            const res = await axios.get<ITweet[]>('/api/tweet?size=5&offset=' + pageIndex);
            setTweets([...tweets, ...res.data]);
            if (!res.data.length) {
                setNoData(true);
            }
            setPageIndex(pageIndex + 1);
            setFetch(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        (async () => {
            await fetchTweet();
        })()
    }, [fetch]);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])
    const handleScroll = async () => {
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current
            if (scrollTop + clientHeight + 1 >= scrollHeight && !noData) {
                setFetch(true);
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Explore | Unsoedfess</title>
            </Helmet>
            <Box
                className="backdrop-blur-sm z-40"
                bg={'whiteAlpha.800'}
                w={'full'}
                position={'absolute'}
            >
                <Heading p={4} size={'md'}>
                    Explore
                </Heading>
            </Box>

            <Stack onScroll={handleScroll} ref={listRef} spacing={0} pt={14} overflowY={'scroll'} h={'full'} w={'full'}>
                <Stack divider={<Divider />} spacing={0}>
                    {tweets.map((item: ITweet) => (
                        <TweetsCard key={item._id} tweet={item} />
                    ))}
                </Stack>

                {fetch &&
                    <Stack align={'center'} py={8} >
                        <Spinner size={'lg'} />
                    </Stack>
                }
                {noData &&
                    <Stack align={'center'} py={8} >
                        <Text>No more tweets</Text>
                    </Stack>
                }
            </Stack>
        </>
    )
}
