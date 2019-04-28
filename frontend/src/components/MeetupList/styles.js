import styled from 'styled-components';
import { Container as MeetupContainer } from '../Meetup/styles';
import { metrics } from '../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  p {
    font-weight: 600;
    margin-bottom: ${metrics.baseMargin * 2}px;
  }

  & + div {
    margin-top: ${metrics.baseMargin * 3}px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${MeetupContainer} {
    margin-right: ${metrics.baseMargin}px;
    margin-bottom: ${metrics.baseMargin}px;
  }
`;
