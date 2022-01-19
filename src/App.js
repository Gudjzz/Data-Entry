import './App.css';
import { Box, Container, Text } from '@chakra-ui/react';
import Header from './components/Header';
import Upload from './components/Upload';
import React, { useReducer, useState } from 'react';
import UpdateXml from './components/UpdateXml';
import { reducer, initialState } from './reducers/reducer';
import { STATUS } from './utils';
import StackButtons from './components/StackButtons';
import ModalWindow from './components/ModalWindow';

export const MyContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const toggleModalOpen = (modData) => {
    setModalData(modData);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className='App' style={{ height: '100%' }}>
      <MyContext.Provider value={{ state, dispatch }}>
        <Box>
          <Header />
          <Container mt={5} mb={5}>
            <Text css={{ fontSize: '25px', fontWeight: 'bold' }}>
              Welcome to DataEntry Wizard
            </Text>
          </Container>
          <Container
            mt={5}
            mb={10}
            display='flex'
            flexDirection='row'
            justifyContent='center'
            maxW='100ch'
          >
            <Upload setStatus={setStatus} />
            <UpdateXml isDisabled={state.fileName} />
          </Container>
          <ModalWindow
            isModalOpen={isModalOpen}
            toggleOpen={toggleModalOpen}
            modalData={modalData}
          />
          <StackButtons
            xmlUpdate={state.xmlUpdate}
            status={status}
            dispatch={dispatch}
            toggleModalOpen={toggleModalOpen}
          />
        </Box>
      </MyContext.Provider>
    </div>
  );
}

export default App;
