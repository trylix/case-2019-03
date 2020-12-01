import * as antd from 'antd';
import styled from 'styled-components';

import vittaIcon from '../../assets/images/icon.png';

export const Layout = styled(antd.Layout)`
  width: 100vw;
  min-height: 100vh;

  & > * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export const Header = styled(antd.Layout.Header)`
  background-color: #fff;
  box-shadow: 0 8px 10px rgba(31, 70, 88, 0.04);
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Row = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  & + & {
    justify-content: flex-end;
  }
`;

export const Logo = styled.img.attrs({
  src: vittaIcon,
})`
  height: auto;
  height: 48px;
`;

export const Content = styled(antd.Layout.Content)`
  padding: 36px 56px;
`;
