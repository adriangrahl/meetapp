import styled from 'styled-components';
import { metrics, colors } from '../../styles/index';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding-top: ${metrics.basePadding * 2}px;

  img {
    max-width: 900px;
    max-height: 400px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  min-width: 315px;
  max-width: 315px;
`;

export const GroupField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${metrics.baseMargin * 2}px;

  h2 {
    margin-bottom: ${metrics.baseMargin}px;
  }

  h4 {
    color: ${colors.light};
    font-size: 14px;
    margin-top: ${metrics.baseMargin}px;
  }

  h5 {
    color: ${colors.regular};
  }

  p {
    color: ${colors.light};
    line-height: 30px;
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
  margin-top: ${metrics.baseMargin * 4}px;
`;
