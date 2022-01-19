import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../App';

import handleFileSelection, { STATUS, parseTextAsXml } from '../utils';

const Upload = ({ setStatus }) => {
  const { state, dispatch } = useContext(MyContext);
  const [inputVal, setInputVal] = useState('');
  const [file, setFile] = useState();

  useEffect(() => {
    if (file) {
      setStatus(STATUS.PENDING);
      handleFileSelection(file, (xmlText) => {
        const xmlDom = parseTextAsXml(xmlText);
        dispatch({ type: 'set_xml', payload: xmlDom });
        dispatch({ type: 'set_xmlText', payload: xmlText });
        dispatch({ type: 'set_toKeep' });
      });
      dispatch({ type: 'set_fileName', payload: file.name });

      setInputVal('');
      setStatus(STATUS.RESOLVED);
    }
  }, [file, dispatch, setStatus]);
  const uploadInit = () => {
    document.getElementById('uploadFile').click();
  };
  const uploadHandler = (event) => {
    setInputVal(event.target.value);
    setFile(event.target.files[0]);
  };

  return (
    <>
      <input
        type='file'
        id='uploadFile'
        style={{ display: 'none' }}
        onChange={uploadHandler}
        value={inputVal}
      />
      <Box mr={2} ml={2}>
        <Button
          css={{ backgroundColor: 'rgb(201, 27, 31)', color: '#ffffff' }}
          colorScheme='blue'
          onClick={uploadInit}
          _hover={{ backgroundColor: 'rgb(181, 24, 26)' }}
        >
          Upload
        </Button>
      </Box>
    </>
  );
};

export default Upload;
