import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { MyContext } from '../App';

function ModalWindow({ isModalOpen, toggleOpen, modalData }) {
  const { state, dispatch } = useContext(MyContext);
  useEffect(() => {
    if (modalData) {
      dispatch({ type: 'set_notEmpty', payload: null, group: modalData });
    }
  }, [modalData, dispatch]);
  if (!modalData) {
    return null;
  }

  const modalGroup = state.xmlUpdate.find((el) => el.group === modalData);
  const { group, toKeep, notEmpty, tagsToUpdate } = modalGroup;

  const handleClick = (uniqueIndentifier, shouldAdd) => {
    dispatch({
      type: 'toggle_set_toKeep',
      payload: { uniqueIndentifier, shouldAdd },
      group: modalData,
    });
  };

  const { putOnFalse, notOnFalse } = notEmpty.reduce(
    (acumulator, uniqueIndentifier) => {
      let isOnFalse = false;
      const tagName = uniqueIndentifier.split('_')[0];
      const eid = uniqueIndentifier.split('_')[1];
      const question = state.xmlDom.querySelector(
        `${tagName}[EntityId="${eid}"]`
      );
      Array.from(question.children).map((child) => {
        const html = child.innerHTML.trim();
        if (
          html.indexOf('false') === 0 &&
          tagsToUpdate.includes(child.tagName)
        ) {
          isOnFalse = true;
        }
      });

      const name = Array.from(question.children).filter(
        (element) => element.tagName === 'Name'
      )[0].innerHTML;

      const questionByEidName = { uniqueIndentifier, name };
      isOnFalse
        ? acumulator.putOnFalse.push(questionByEidName)
        : acumulator.notOnFalse.push(questionByEidName);
      return acumulator;
    },
    { putOnFalse: [], notOnFalse: [] }
  );

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isModalOpen}
        onClose={toggleOpen}
        size='2xl'
      >
        <ModalOverlay />
        <ModalContent pb='20px'>
          <ModalHeader>{group.toUpperCase()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              {`Unselect questions to keep ${group}`}
            </Text>
            <Wrap>
              {notOnFalse.map(({ uniqueIndentifier, name }) => {
                const isSelected = toKeep.includes(uniqueIndentifier);
                return (
                  <WrapItem key={uniqueIndentifier}>
                    <Button
                      variant={isSelected ? 'solid' : 'outline'}
                      css={{
                        backgroundColor: isSelected
                          ? '#5a5d79'
                          : 'rgb(201, 27, 31)',
                        color: '#fff',
                      }}
                      _hover={{
                        backgroundColor: isSelected
                          ? 'rgb(81 81 80)'
                          : 'rgb(181, 24, 26)',
                      }}
                      onClick={() =>
                        handleClick(uniqueIndentifier, !isSelected)
                      }
                      width='94px'
                      _focus={{ boxShadow: 'none' }}
                    >
                      {name}
                    </Button>
                  </WrapItem>
                );
              })}
            </Wrap>

            {putOnFalse.length > 0 && (
              <Text fontWeight='bold' mb='1rem' mt='2rem'>
                {`Select questions to remove ${group}`}
              </Text>
            )}
            <Wrap>
              {putOnFalse.map(({ uniqueIndentifier, name }) => {
                const isSelected = toKeep.includes(uniqueIndentifier);
                return (
                  <WrapItem key={uniqueIndentifier}>
                    <Button
                      variant={!isSelected ? 'solid' : 'outline'}
                      css={{
                        backgroundColor: !isSelected
                          ? 'rgb(201, 27, 31)'
                          : '#5a5d79',
                        color: '#fff',
                      }}
                      _hover={{
                        backgroundColor: !isSelected
                          ? 'rgb(181, 24, 26)'
                          : 'rgb(81 81 80)',
                      }}
                      onClick={() =>
                        handleClick(uniqueIndentifier, !isSelected)
                      }
                      width='94px'
                      _focus={{ boxShadow: 'none' }}
                    >
                      {name}
                    </Button>
                  </WrapItem>
                );
              })}
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalWindow;
