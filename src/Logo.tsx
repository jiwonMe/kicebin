import styled from 'styled-components';
import logo from './assets/kicebin-logo.svg';
import { Image } from 'antd'


const Logo = () => {
  return (
    <Image src={logo} alt="logo" />
  );
};

export default Logo;