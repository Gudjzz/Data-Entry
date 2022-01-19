import { Button } from '@chakra-ui/button';
import { SettingsIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';

const OptionButton = ({
  label,
  buttonGroup,
  dispatch,
  ml,
  toggleModalOpen,
  isSelected,
}) => {
  const { group, showSettings, toKeep } = buttonGroup;
  const handleClick = () => {
    dispatch({ type: 'btn_selected', payload: !isSelected, group });
  };

  return (
    <>
      <Box mr={2} ml={2}>
        <Button
          variant={isSelected ? 'solid' : 'outline'}
          // colorScheme={isSelected ? 'green' : 'blue'}
          css={{
            backgroundColor: isSelected ? 'rgb(201, 27, 31)' : '#5a5d79',
            color: '#fff',
          }}
          _hover={{
            backgroundColor: isSelected ? 'rgb(181, 24, 26)' : 'rgb(81 81 80)',
          }}
          _focus={{ boxShadow: 'none' }}
          onClick={handleClick}
          width='300px'
          ml={ml}
        >
          {label}
        </Button>
      </Box>
      {showSettings && (
        <IconButton
          onClick={() => toggleModalOpen(group)}
          _focus={{ boxShadow: 'none' }}
          variant={toKeep.length > 0 ? 'solid' : 'outline'}
          colorScheme={toKeep.length > 0 ? 'linkedin' : 'blue'}
          css={{
            backgroundColor: toKeep.length > 0 ? '#4baac5' : '',
            color: '#fff',
          }}
          disabled={!isSelected}
          aria-label='Search database'
          icon={<SettingsIcon />}
        />
      )}
    </>
  );
};

export default OptionButton;
