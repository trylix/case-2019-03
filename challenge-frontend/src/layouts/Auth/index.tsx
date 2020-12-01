import React, { Fragment } from 'react';

import { Brand, Container, Logo, Wrapper } from './styles';

export const Auth: React.FC = ({ children }) => {
  return (
    <Container>
      <Wrapper>
        <Brand>
          <Logo />
        </Brand>
        <Fragment>{children}</Fragment>
      </Wrapper>
    </Container>
  );
};
