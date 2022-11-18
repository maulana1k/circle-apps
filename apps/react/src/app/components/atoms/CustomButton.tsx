import { IconButton } from '@chakra-ui/react';
import { ReactElement } from 'react';

export default function CustomButton(props: {
  icon: ReactElement;
  size?: string;
  onClick?: (x: any) => void;
}) {
  return (
    <IconButton
      onClick={props.onClick}
      variant={'ghost'}
      colorScheme={'twitter'}
      rounded={'full'}
      size={props.size ?? 'md'}
      aria-label="img"
      icon={props.icon}
    />
  );
}
