import styled from 'styled-components';
import { colors } from '../../styles/index';

export const Container = styled.div`
  position: relative;

  img {
    position: relative;
    z-index: 1;
    max-width: 100%;
    max-height: 298px;
  }

  i {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
    color: ${colors.danger};
    font-size: 30px;

    &:hover {
      font-size: 40px;
      transition: font-size 0.3s ease;
    }
  }
`;
