import styled, { css } from 'styled-components';
import { colors } from '../../styles/index';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const dragActive = css`
  border-color: ${colors.success};
`;

const dragReject = css`
  border-color: ${colors.danger};
`;

export const DropContainer = styled.div.attrs({ className: 'dropzone' })`
  border: 1px dashed ${colors.regular};
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  min-height: 50px;
  max-height: 300px;

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

  i {
    color: ${colors.regular};
  }
`;
