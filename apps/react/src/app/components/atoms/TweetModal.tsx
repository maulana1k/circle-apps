import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { TweetField } from '../Feeds';
import TweetsCard from './TweetsCard';

export default function TweetModal(props: { isOpen: any; onClose: any }) {
  return (
    <Modal size={'2xl'} isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent px={4} rounded={'2xl'}>
        <ModalHeader>Tweet</ModalHeader>
        <ModalCloseButton />
        <TweetsCard toReply />
        <TweetField />
        {/* <ModalFooter /> */}
      </ModalContent>
    </Modal>
  );
}
