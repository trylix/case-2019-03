import * as antd from 'antd';
import styled from 'styled-components';

import vittaIcon from '../../assets/images/icon.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  place-items: center;

  & > * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Brand = styled.div`
  margin-bottom: 18px;
`;

export const Logo = styled.img.attrs({
  src: vittaIcon,
})`
  height: auto;
  width: 80px;
`;

export const Form = styled(antd.Form)`
  width: 300px;
`;

export const Input = styled(antd.Input)`
  padding: 8px 12px;

  .form-icon {
    margin-right: 8px;
  }
`;

export const Button = styled(antd.Button)`
  width: 100%;
  height: auto;
  padding: 8px 12px;
`;
