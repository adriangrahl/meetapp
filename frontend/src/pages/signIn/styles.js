import styled from 'styled-components';
import { metrics, colors } from '../../styles/index';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  min-width: 315px;
  max-width: 315px;

  a {
    color: ${colors.regular};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin-top: ${metrics.basePadding * 2}px;

  label {
    font-weight: 600;
  }

  input {
    height: 24px;
    font-size: 20px;
    margin-top: ${metrics.basePadding / 2}px;
    background: ${colors.secondary};
    border: 0;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  min-height: 50px;
  background: ${props => (props.disabled ? colors.disabled : colors.primary)};
  font-size: 16px;
  font-weight: 700;
  border-radius: 25px;
  border: 0;
  margin-top: ${metrics.basePadding * 2}px;
  margin-bottom: ${metrics.basePadding}px;
`;
