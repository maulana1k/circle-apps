import { Button } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface ActionButtonProps {
  children: string;
  icon: ReactElement;
  color: string;
  isActive?: boolean;
  handleClick?: (x: any) => void;
}

export const ActionButton = ({
  children,
  icon,
  color,
  isActive,
  handleClick,
}: ActionButtonProps) => (
  <Button
    color={isActive ? color : ''}
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
