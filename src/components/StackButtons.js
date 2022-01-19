import { Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { STATUS } from '../utils';
import OptionButton from './OptionButton';
import { WrapItem } from '@chakra-ui/react';
import { useEffect } from 'react';

const StackButtons = ({ xmlUpdate, status, dispatch, toggleModalOpen }) => {
  if (status === STATUS.IDLE) {
    return null;
  }
  if (status === STATUS.PENDING) {
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    );
  }

  return (
    <Stack mb={10} alignItems='center'>
      {xmlUpdate.map((buttonGroup) => {
        const { title, showSettings, shouldUpdate } = buttonGroup;
        return (
          <WrapItem key={title}>
            <OptionButton
              label={title}
              dispatch={dispatch}
              buttonGroup={buttonGroup}
              ml={showSettings ? '48px' : '8px'}
              showSettings={showSettings}
              toggleModalOpen={toggleModalOpen}
              isSelected={shouldUpdate}
            />
          </WrapItem>
        );
      })}
    </Stack>
  );
};

export default StackButtons;
