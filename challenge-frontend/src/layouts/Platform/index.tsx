import { Button, Divider, Space, Typography } from 'antd';
import React from 'react';

import { useAccount } from '../../hooks';
import { Content, Header, Layout, Logo, Row } from './styles';

const { Text } = Typography;

export const Platform: React.FC = ({ children }) => {
  const { accountData, handleLogout } = useAccount();

  if (!accountData) return null;

  const { accountUser } = accountData;

  return (
    <Layout>
      <Header>
        <Row>
          <Logo />
        </Row>
        <Row>
          <Space split={<Divider type="vertical" />}>
            <Text type="secondary">{`Bem vindo de volta, ${accountUser.name}!`}</Text>
            <Button type="link" onClick={handleLogout} block>
              Sair
            </Button>
          </Space>
        </Row>
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};
