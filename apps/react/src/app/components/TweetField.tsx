import {
    Avatar, Button,
    Divider, Image, Stack,
    Textarea
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { FiAtSign, FiImage, FiLink } from 'react-icons/fi';
import { UserContext, UserContextType } from '../context/user.context';
import { uploadFiles } from '../hooks/useFirebase';
import CustomButton from './atoms/CustomButton';


export function TweetField(props: {
    refresh?: boolean;
    setRefresh?: any;
    replyTo?: string | undefined;
}) {
    const { user } = useContext(UserContext) as UserContextType;
    const [tweetContent, setTweetContent] = useState<string>('');
    const [filePreview, setFilePreview] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const uploadRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (file) {
            const objectURL = URL.createObjectURL(file as Blob);
            setFilePreview(objectURL);
        } else setFilePreview('');
    }, [file])
    const fileHandle = (e: any) => {
        const object = e.target.files[0];
        setFile(object);
    }
    const inputHandle = (e: any) => {
        const input = e.target.value;
        setTweetContent(input);
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight + 4}px`;
    };

    const postTweet = async () => {
        setLoading(true);
        let fileUrl;
        if (file) {
            fileUrl = await uploadFiles(file, '/images/users/tweet/' + user.username + '/' + file.name);
        }
        if (tweetContent || file) {
            axios
                .post(
                    '/api/tweet/new',
                    { author: user._id, content: tweetContent.trim(), image: fileUrl },
                    { headers: { authorization: 'Bearer ' + user.token } }
                )
                .then((res) => {
                    setTweetContent('');
                    setFile(null);
                    props?.setRefresh(!props?.refresh);
                }).catch((err) => { console.log(err); });
        }
        setLoading(false);
    };
    const replyTweet = async () => {
        setLoading(true);
        if (tweetContent) {
            axios
                .post(
                    '/api/tweet/' + props.replyTo + '/reply',
                    { userId: user._id, content: tweetContent.trim() },
                    { headers: { authorization: 'Bearer ' + user.token } }
                )
                .then(() => {
                    setTweetContent('');
                    props?.setRefresh(!props?.refresh);
                }).catch((err) => { console.log(err); });
        }
        setLoading(false);
    };
    return (
        <Stack className="px-4" w="full" display={'flex'} spacing={3}>
            <Stack direction={'row'}>
                <Avatar src={user.avatar} />
                <Stack alignItems={'start'} pb={2} spacing={1} w={'full'}>
                    <Textarea
                        onInput={(e: any) => inputHandle(e)}
                        value={tweetContent}
                        border={'none'}
                        w={'full'}
                        resize="none"
                        rows={2}
                        wrap="hard"
                        focusBorderColor="none"
                        placeholder="What do you think?"
                        className="placeholder:text-xl  placeholder:text-gray-500 " />
                    {
                        filePreview &&
                        <Stack align={'start'} >
                            <Image borderRadius={'xl'} src={filePreview} />
                            <Button onClick={() => setFile(null)} variant={'outline'} size={'xs'} >Cancel</Button>
                        </Stack>

                    }
                    <Divider />
                    <Stack
                        alignItems={'center'}
                        direction={'row'}
                        justifyContent={'space-between'}
                        p={1}
                        w={'full'}
                    >
                        <Stack spacing={0} direction={'row'}>
                            <CustomButton onClick={() => uploadRef.current?.click()} icon={<FiImage />} />
                            <CustomButton icon={<FiLink />} />
                            {/* <CustomButton icon={<FiAtSign />} /> */}
                            <input type="file" ref={uploadRef} onInput={fileHandle} hidden />
                        </Stack>
                        <Button
                            disabled={!tweetContent && !file}
                            loadingText={'Posting your tweet'}
                            size={'sm'}
                            isLoading={loading}
                            colorScheme={'twitter'}
                            rounded="full"
                            onClick={!props.replyTo ? postTweet : replyTweet}
                        >
                            Tweet
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
