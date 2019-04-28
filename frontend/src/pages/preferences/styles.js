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

  h2,
  h4 {
    align-self: flex-start;
  }

  p {
    color: ${colors.light};
    margin-top: ${metrics.baseMargin * 2}px;
    line-height: 30px;
  }

  h4 {
    margin-top: ${metrics.baseMargin * 3}px;
  }
`;

export const CheckGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: ${metrics.baseMargin * 2}px;

  div {
    & + div {
      margin-top: ${metrics.baseMargin}px;
    }

    display: flex;
    flex-direction: row;
  }

  label {
    font-weight: 500;
    font-size: 18px;
    margin-left: ${metrics.baseMargin}px;
  }

  input {
    &[type='checkbox'] {
      border-radius: 4px;
      width: 20px;
      height: 20px;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      outline: 0;
      background: ${colors.disabled};
    }

    &[type='checkbox']:checked {
      background: #f64067;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  background: ${props => (props.disabled ? colors.disabled : colors.primary)};
  font-size: 16px;
  font-weight: 700;
  border-radius: 25px;
  border: 0;
  margin-top: ${metrics.baseMargin * 2}px;
`;
