import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
  width: 100%;
`;

export const FormField = styled.div`
  padding: 0px 10px;

  &:nth-child(odd) {
    background-color: #f1f1f1;
  }

  &:nth-child(even) {
    background-color: #f7f7f7;
  }
`;

export const FieldRemove = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
  width: 100%;
`;
