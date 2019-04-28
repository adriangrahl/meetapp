import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MeetupList from '../../components/MeetupList';
import { Creators as MeetupsActions } from '../../store/ducks/meetups';
import { Container } from './styles';

class Dashboard extends Component {
  state = {};

  static propTypes = {
    getSubscribedRequest: PropTypes.func.isRequired,
    getUnsubscribedRequest: PropTypes.func.isRequired,
    getRecommendedRequest: PropTypes.func.isRequired,
    subscribed: PropTypes.shape({
      data: PropTypes.array.isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    unsubscribed: PropTypes.shape({
      data: PropTypes.array.isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    recommended: PropTypes.shape({
      data: PropTypes.array.isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { getSubscribedRequest, getUnsubscribedRequest, getRecommendedRequest } = this.props;

    getSubscribedRequest();
    getUnsubscribedRequest();
    getRecommendedRequest();
  }

  render() {
    const { subscribed, unsubscribed, recommended } = this.props;

    return (
      <Container>
        <MeetupList title="Inscrições" data={subscribed.data} loading={subscribed.loading} />
        <MeetupList
          title="Próximos meetups"
          data={unsubscribed.data}
          loading={unsubscribed.loading}
        />
        <MeetupList title="Recomendados" data={recommended.data} loading={recommended.loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  subscribed: state.meetups.subscribed,
  unsubscribed: state.meetups.unsubscribed,
  recommended: state.meetups.recommended,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
