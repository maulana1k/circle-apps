import { useContext, useState } from 'react'
import { Avatar, Button, Center, Flex, FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Textarea } from '@chakra-ui/react'
import { UserWithToken } from '@circle-app/api-interfaces'
import { FiUpload } from 'react-icons/fi';
import { uploadFiles } from '../../hooks/useFirebase';
import axios from 'axios';
import { UserContext, UserContextType } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile(props: { isOpen: any, onClose: any, profile: UserWithToken }) {
    const [name, setName] = useState(props.profile.displayName)
    const [bio, setBio] = useState(props.profile.bio);
    const [file, setFile] = useState<Blob>();
    const [avatar, setAvatar] = useState(props.profile.avatar);
    const { user, dispatcher } = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    const fileHandle = (e: any) => {
        if (e.target.files[0].size > 2 * 1024 * 1024) {
            alert('Image size too large!');
            return;
        }
        setFile(e.target.files[0]);
        setAvatar(URL.createObjectURL(e.target.files[0]));
    }

    const updateProfile = async () => {
        let newAvatar;
        try {
            if (avatar !== props.profile.avatar && file) {
                const fileUrl = await uploadFiles(file, 'images/users/avatar' + props.profile.username + '.jpg')
                newAvatar = fileUrl;
            } else {
                newAvatar = avatar;
            }
            const data = { ...props.profile, displayName: name, avatar: newAvatar, bio: bio };
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
                    <Stack direction={'row'} align='end' >
                        <Avatar size={'2xl'} src={avatar} />
                        <input onInput={fileHandle} type="file" hidden id="avatar" accept='*.img' />
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
                                    <FiUpload size={30} />
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
                    <Button onClick={updateProfile} colorScheme={'twitter'} rounded={"full"}  >Save</Button>
                </Stack>
            </ModalContent>
        </Modal>
    )
}
