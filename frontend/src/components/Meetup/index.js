import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Title, NumMembers, Info, Button, PhotoContainer,
} from './styles';

const Meetup = ({
  id, title, numSub, photoUrl,
}) => (
  <Container>
    <PhotoContainer>
      {!!photoUrl && <img src={photoUrl} alt={title} height="110px" width="290px" />}
    </PhotoContainer>

    <Info>
      <div>
        <Title>{title}</Title>
        <NumMembers>{`${numSub} membros`}</NumMembers>
      </div>
      <Button to={`/meetups/${id}`}>
        <i className="fa fa-chevron-right" />
      </Button>
    </Info>
  </Container>
);

Meetup.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  numSub: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
};

Meetup.defaultProps = {
  photoUrl: '',
};

export default Meetup;
