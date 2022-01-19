// import { Image, Container } from '@chakra-ui/react';
import { Image } from '@chakra-ui/image';
import { Container } from '@chakra-ui/layout';
import AplusA from '../AplusA_logo.png';
const Header = () => {
  return (
    <Container p={0} bgColor='#9895ba' maxW='80rem'>
      <Image src='https://author.aplusaresearch.com/isa/PYAMLMFAKKOYIBEYNHKRJRBIMIEALXOH/banner_emailtemplate.png' />
      {/* <Image src={AplusA} /> */}
    </Container>
  );
};

export default Header;
