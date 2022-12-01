import { useContext, useState } from 'react'
import { Avatar, Box, Button, Center, Flex, FormControl, FormLabel, Image, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Textarea } from '@chakra-ui/react'
import { IUser, UserWithToken } from '@circle-app/api-interfaces'
import { FiImage, FiUpload, FiUser } from 'react-icons/fi';
import { uploadFiles } from '../../hooks/useFirebase';
import axios from 'axios';
import { UserContext, UserContextType } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile(props: { isOpen: any, onClose: any, profile: UserWithToken }) {
    const [name, setName] = useState(props.profile.displayName)
    const [bio, setBio] = useState(props.profile.bio);
    const [avatar, setAvatar] = useState<Blob>();
    const [cover, setCover] = useState<Blob>()
    const [avatarUrl, setAvatarUrl] = useState(props.profile.avatar);
    const [coverUrl, setCoverUrl] = useState(props.profile.coverImages);
    const [loading, setLoading] = useState(false)
    const { user, dispatcher } = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    const avatarHandle = (e: any) => {
        if (e.target.files[0].size > 2 * 1024 * 1024) {
            alert('Image size too large!');
            return;
        }
        setAvatar(e.target.files[0]);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
    const coverHandle = (e: any) => {
        if (e.target.files[0].size > 2 * 1024 * 1024) {
            alert('Image size too large!');
            return;
        }
        setCover(e.target.files[0]);
        setCoverUrl(URL.createObjectURL(e.target.files[0]));
    }
    const updateProfile = async () => {
        setLoading(true)
        let newAvatar, newCover;
        try {
            if (avatarUrl !== props.profile.avatar && avatar) {
                const fileUrl = await uploadFiles(avatar, 'images/users/avatar/' + props.profile.username + '.jpg')
                newAvatar = fileUrl;
            } else {
                newAvatar = avatarUrl;
            }
            if (coverUrl !== props.profile.coverImages && cover) {
                const fileUrl = await uploadFiles(cover, 'images/users/cover/' + props.profile.username + '.jpg')
                newCover = fileUrl
            } else {
                newCover = coverUrl;
            }
            const data: IUser = { ...props.profile, displayName: name, avatar: newAvatar, bio: bio, coverImages: newCover };
            console.log('data ', data);

            const res = await axios.put('/api/auth/update-profile', data);
            dispatcher({ ...res.data, token: user.token });
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal isCentered size={'xl'} isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent borderRadius={20} >
                <ModalHeader>Update Profile</ModalHeader>
                <ModalCloseButton />

                <Stack align={'start'} p={8}>
                    {
                        coverUrl !== ('' || 'default') && (
                            <Box h={'44'} alignItems={'center'} display={'flex'} overflow={'hidden'} rounded={'md'} >
                                <Image src={coverUrl} />
                            </Box>
                        )
                    }
                    <Stack direction={'row'} align='end' >
                        <input onInput={coverHandle} type="file" hidden id='cover' />
                        <Avatar size={'2xl'} src={avatarUrl} />
                        <input onInput={avatarHandle} type="file" hidden id="avatar" accept='*.img' />
                        <label htmlFor="avatar">
                            <Flex
                                justifyContent={'center'}
                                bg={'twitter.400'}
                                h={14}
                                w={14}
                                color={'white'}
                                rounded={'full'}
                                cursor={'pointer'}
                                className="hover:scale-110 cursor-pointer duration-200"
                            >
                                <Center>
                                    <FiUser size={30} />
                                </Center>
                            </Flex>
                        </label>
                        <label htmlFor="cover">
                            <Flex
                                justifyContent={'center'}
                                bg={'twitter.400'}
                                h={14}
                                w={14}
                                color={'white'}
                                rounded={'full'}
                                cursor={'pointer'}
                                className="hover:scale-110 cursor-pointer duration-200"
                            >
                                <Center>
                                    <FiImage size={30} />
                                </Center>
                            </Flex>
                        </label>
                    </Stack>
                    <FormControl>
                        <FormLabel>Display Name</FormLabel>
                        <Input onChange={(e: any) => setName(e.target.value)} value={name} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea onChange={(e: any) => setBio(e.target.value)} value={bio} />
                    </FormControl>
                    <Button isLoading={loading} loadingText={'Updating your profile'} onClick={updateProfile} colorScheme={'twitter'} rounded={"full"}  >Save</Button>
                </Stack>
            </ModalContent>
        </Modal>
    )
}
