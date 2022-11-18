import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ITweet } from '@circle-app/api-interfaces';
import { TweetField } from "../TweetField";
import TweetsCard from './TweetsCard';

export default function TweetModal(props: {
  isOpen: any;
  onClose: any;
  replyTo?: ITweet;
}) {
  return (
    <Modal size={'2xl'} isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent px={4} rounded={'2xl'}>
        <ModalHeader>Tweet</ModalHeader>
        <ModalCloseButton />
        {props.replyTo && (
          <TweetsCard tweet={props.replyTo as ITweet} toReply />
        )}
        <TweetField replyTo={props.replyTo?._id} />
      </ModalContent>
    </Modal>
  );
}
