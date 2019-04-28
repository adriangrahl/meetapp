import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Creators as MeetupsActions } from '../../store/ducks/meetups';
import { Container, InputContainer } from './styles';

class Search extends Component {
  state = {
    value: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { value } = this.state;
    const { getSubscribedRequest, getUnsubscribedRequest, getRecommendedRequest } = this.props;

    getSubscribedRequest(value);
    getUnsubscribedRequest(value);
    getRecommendedRequest(value);
  };

  render() {
    const { value } = this.state;

    return (
      <Container onSubmit={this.handleSubmit} autoComplete="off">
        <InputContainer>
          <input
            type="text"
            name="search"
            placeholder="Buscar Meetups"
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </InputContainer>
      </Container>
    );
  }
}

Search.propTypes = {
  getSubscribedRequest: PropTypes.func.isRequired,
  getUnsubscribedRequest: PropTypes.func.isRequired,
  getRecommendedRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(MeetupsActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Search);
