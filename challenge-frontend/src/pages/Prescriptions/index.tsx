import { LockOutlined, MailOutlined } from '@ant-design/icons';
import React from 'react';

import { useAccount } from '../../hooks';
import { Button, Container, Form, Input, Wrapper } from './styles';

export const Prescriptions: React.FC = () => {
  const { loadingAccount, handleLogin } = useAccount();

  return (
    <Container>
      <Wrapper>
        <Form name="login" onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, insira um e-mail válido.",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="form-icon" />}
              type="email"
              placeholder={"E-mail"}
              size="middle"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, insira uma senha válida.",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="form-icon" />}
              type="password"
              placeholder={"Palavra-passe"}
              size="middle"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loadingAccount}
              style={{
                width: "100%",
              }}
            >
              {"Continuar"}
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </Container>
  );
};
