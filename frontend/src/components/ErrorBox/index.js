import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ErrorActions } from '../../store/ducks/error';

import {
  Container, Box, Message, Close, Details,
} from './styles';

const ErrorBox = ({ error: { message, data, visible }, hideError }) => visible && (
<Container>
  <Box>
    <Message>
      <p>{message}</p>
      {data && data.length && <ErrorDetails data={data} />}
    </Message>
    <Close>
      <i className="fa fa-times-circle" aria-hidden="true" onClick={hideError} />
    </Close>
  </Box>
</Container>
);

ErrorBox.propTypes = {
  hideError: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    visible: PropTypes.bool,
  }).isRequired,
};

const ErrorDetails = ({ data }) => (
  <Details>
    {data.map((err, i) => (
      <li key={i}>{err.message}</li>
    ))}
  </Details>
);

ErrorDetails.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(ErrorActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorBox);
