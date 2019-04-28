import styled, { css } from 'styled-components';
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

  label,
  h4 {
    font-weight: 600;
  }

  h4 {
    margin-bottom: ${metrics.baseMargin}px;
  }

  input {
    height: 24px;
    font-size: 20px;
    margin-top: ${metrics.baseMargin}px;
    background: ${colors.secondary};
    border: 0;
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
  min-height: 50px;
  background: ${colors.primary};
  font-size: 16px;
  font-weight: 700;
  border-radius: 25px;
  border: 0;
  margin-top: ${metrics.basePadding * 2}px;
  margin-bottom: ${metrics.basePadding}px;
  background: ${props => (props.disabled ? colors.disabled : colors.primary)};
`;

const dragActive = css`
  border-color: ${colors.success};
`;

const dragReject = css`
  border-color: ${colors.danger};
`;

export const DropContainer = styled.div.attrs({ className: 'dropzone' })`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  height: 50px;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => colors[props.type || 'none']};
  align-items: center;
  justify-content: center;
  padding: 15px 0;
`;
