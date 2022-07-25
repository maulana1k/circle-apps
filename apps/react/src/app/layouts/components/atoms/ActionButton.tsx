import { Button } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface ActionButtonProps {
  children: string;
  icon: ReactElement;
  color: string;
  handleClick?: (x: any) => void;
}

export const ActionButton = ({
  children,
  icon,
  color,
  handleClick,
}: ActionButtonProps) => (
  <Button
    _hover={{ color }}
    rounded={'full'}
    variant={'link'}
    size={'sm'}
    leftIcon={icon}
    fontWeight={'normal'}
    onClick={handleClick}
  >
    {children}
  </Button>
);
