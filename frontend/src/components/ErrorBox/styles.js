import styled from 'styled-components';
import { metrics } from '../../styles';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${metrics.basePadding}px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 315px;
  max-width: 315px;
  background: #f55a5a;
  border-radius: ${metrics.baseRadius}px;
  padding: ${metrics.basePadding / 2}px;

  position: relative;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Details = styled.ul`
  padding: 5px 0 0 20px;
`;

export const Close = styled.div`
  position: absolute;
  height: 100%;
  right: 10px;
  top: 10px;
`;
