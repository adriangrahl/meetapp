import React from 'react';
import PropTypes from 'prop-types';
import Meetup from '../Meetup';

import { Container, List } from './styles';

const MeetupList = ({ title, data, loading }) => (
  <Container>
    <p>{title}</p>
    <List>
      {loading ? (
        <i className="fa fa-spinner fa-pulse" />
      ) : (
        data.map(meetup => (
          <Meetup
            key={meetup.id}
            id={meetup.id}
            title={meetup.title}
            numSub={meetup.__meta__.subscriptions_count}
            photoUrl={(meetup.coverPhoto && meetup.coverPhoto.url) || null}
          />
        ))
      )}
    </List>
  </Container>
);

MeetupList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      __meta__: PropTypes.shape({
        subscriptions_count: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MeetupList;
