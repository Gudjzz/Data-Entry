import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { useContext, useEffect } from 'react';
import { MyContext } from '../App';
import { downloadXml, parseTextAsXml } from '../utils';

const UpdateXml = ({ isDisabled }) => {
  const { state, dispatch } = useContext(MyContext);
  const { xmlUpdate, xmlDom, xmlText, readyToDownload, fileName } = state;
  const xmlDomReset = parseTextAsXml(xmlText);
  const handleClick = () => {
    if (!xmlDom) {
      dispatch({ type: 'set_xml', payload: xmlDomReset });
    }
    xmlUpdate.map(({ group, type, shouldUpdate }) => {
      if (shouldUpdate) {
        dispatch({ type, group });
      }
      return null;
    });

    dispatch({ type: 'set_ready_to_download', payload: true });
  };
  useEffect(() => {
    if (readyToDownload) {
      downloadXml(xmlDom, fileName);
      dispatch({ type: 'set_ready_to_download', payload: false });
      dispatch({ type: 'set_xml', payload: xmlDomReset });
    }
  }, [dispatch, readyToDownload, fileName, xmlDom, xmlDomReset]);

  return (
    <Box mr={2} ml={2}>
      <Button
        onClick={handleClick}
        disabled={!isDisabled}
        colorScheme='linkedin'
        css={{ backgroundColor: '#4baac5', color: '#ffffff' }}
        _hover={{ backgroundColor: '#6ec6df' }}
      >
        Generate File
      </Button>
    </Box>
  );
};

export default UpdateXml;
