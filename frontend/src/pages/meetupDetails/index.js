import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'moment/locale/pt-br';
import PropTypes from 'prop-types';
import { Creators as MeetupDetailsActions } from '../../store/ducks/meetupDetails';
import { Creators as SubscriptionActions } from '../../store/ducks/subscription';

import {
  Container, Form, GroupField, Button,
} from './styles';

class MeetupDetails extends Component {
  state = {};

  componentDidMount() {
    const {
      getMeetupDetailsRequest,
      match: {
        params: { id },
      },
    } = this.props;

    getMeetupDetailsRequest(id);
  }

  handleSubmit = (e, id) => {
    e.preventDefault();
    const { subscriptionRequest } = this.props;

    subscriptionRequest(id);
  };

  render() {
    const {
      meetup: { data: meetup, loading: loadingMeetup },
      loadingSubscription,
      match: {
        params: { id },
      },
    } = this.props;

    const { url } = (meetup && meetup.coverPhoto) || {};

    moment.locale('pt-br');

    return (
      <Container>
        {loadingMeetup || !meetup ? (
          <i className="fa fa-spinner fa-pulse" />
        ) : (
          <Fragment>
            {!!url && <img src={url} alt={meetup.title} />}
            <Form onSubmit={e => this.handleSubmit(e, id)}>
              <GroupField>
                <h2>{meetup.title}</h2>
                <h5>{`${meetup.__meta__.subscriptions_count} membros`}</h5>
              </GroupField>
              <GroupField>
                <p>{meetup.description}</p>
              </GroupField>
              <GroupField>
                <h5>Realizado em:</h5>
                <h4>{meetup.location}</h4>
              </GroupField>
              <GroupField>
                <h5>Quando?</h5>
                <h4>{moment(meetup.date).format('LLL')}</h4>
              </GroupField>
              <Button type="submit" disabled={loadingSubscription}>
                {loadingSubscription ? 'Carregando' : 'Inscreva-se'}
              </Button>
            </Form>
          </Fragment>
        )}
      </Container>
    );
  }
}

MeetupDetails.propTypes = {
  meetup: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,

  loadingSubscription: PropTypes.bool.isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  getMeetupDetailsRequest: PropTypes.func.isRequired,
  subscriptionRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meetup: state.meetupDetails,
  loadingSubscription: state.subscription.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...MeetupDetailsActions,
    ...SubscriptionActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetupDetails);
