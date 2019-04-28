import styled from 'styled-components';
import SearchIcon from '../../assets/images/search.svg';
import { metrics, colors } from '../../styles';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 100px;
  width: 100%;
  margin-top: ${metrics.baseMargin * 3}px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  padding: 6px 7px 6px 30px;
  background: ${colors.disabled} url(${SearchIcon}) no-repeat 10px center !important;
  border-radius: ${metrics.baseRadius}px;

  input {
    flex: 1;
    width: 100%;
    font-size: 15px;
    color: ${colors.white} !important;
    border: 0;
    background: ${colors.disabled} !important;
  }
`;
