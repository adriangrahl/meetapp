import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, metrics } from '../../styles';

export const Container = styled.div`
  background: ${colors.primary};
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  min-height: 80px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: ${metrics.baseMargin * 3}px;

  a,
  ${Link} {
    font-weight: 600;
  }
`;

export const MenuProfile = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: ${metrics.baseMargin * 3}px;

  i {
    cursor: pointer;
  }
`;
