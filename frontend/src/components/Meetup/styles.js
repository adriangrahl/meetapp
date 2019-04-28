import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { metrics, colors } from '../../styles/index';

export const PhotoContainer = styled.div`
  border-radius: ${metrics.baseRadius * 2}px;

  min-height: 110px;
  min-width: 290px;

  img {
    border-radius: 5px;
  }
`;

export const Container = styled.div`
  background: ${colors.white};
  border-radius: ${metrics.baseRadius * 2}px;
`;

export const Info = styled.div`
  padding: ${metrics.basePadding}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  color: ${colors.black};
  font-weight: bold;
`;

export const NumMembers = styled.div`
  color: ${colors.regular};
  font-size: 14px;
  margin-top: ${metrics.baseMargin / 2}px;
`;

export const Button = styled(Link)`
  width: 40px;
  height: 40px;
  background: ${props => (props.disabled ? colors.disabled : colors.primary)};
  font-size: 16px;
  font-weight: 700;
  border-radius: 25px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
