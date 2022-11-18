import { useState } from 'react'
import { Avatar, Button, FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Textarea } from '@chakra-ui/react'
import { UserWithToken } from '@circle-app/api-interfaces'

export default function UpdateProfile(props: { isOpen: any, onClose: any, profile: UserWithToken }) {
    const [name, setName] = useState(props.profile.displayName)
    const [bio, setBio] = useState(props.profile.bio);

    return (
        <Modal isCentered size={'xl'} isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent borderRadius={20} >
                <ModalHeader>Update Profile</ModalHeader>
                <ModalCloseButton />
                <Stack align={'start'} p={8}>
                    <Avatar size={'2xl'} src={props.profile.avatar} />
                    <FormControl>
                        <FormLabel>Display Name</FormLabel>
                        <Input onChange={(e: any) => setName(e.target.value)} value={name} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea value={bio} />
                    </FormControl>
                    <Button colorScheme={'twitter'} rounded={"full"}  >Save</Button>
                </Stack>
            </ModalContent>
        </Modal>
    )
}
