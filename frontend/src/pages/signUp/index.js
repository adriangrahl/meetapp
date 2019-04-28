import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Creators as AuthActions } from '../../store/ducks/auth';
import ErrorBox from '../../components/ErrorBox';
import {
  Container, Form, InputGroup, Button,
} from './styles';

import MeetappIcon from '../../assets/images/logo.svg';

class SignUp extends Component {
  state = {
    nameInput: '',
    emailInput: '',
    passwordInput: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { signUpRequest } = this.props;
    const { nameInput, emailInput, passwordInput } = this.state;

    signUpRequest(nameInput, emailInput, passwordInput);
  };

  render() {
    const { nameInput, emailInput, passwordInput } = this.state;
    const { loading } = this.props;

    return (
      <Container>
        <ErrorBox />
        <Form onSubmit={this.handleSubmit}>
          <img src={MeetappIcon} alt="Meetup Icon" height="38" />
          <InputGroup>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="username"
              placeholder="Digite seu nome"
              value={nameInput}
              onChange={e => this.setState({ nameInput: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={emailInput}
              onChange={e => this.setState({ emailInput: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Sua senha secreta"
              value={passwordInput}
              onChange={e => this.setState({ passwordInput: e.target.value })}
            />
          </InputGroup>
          <Button type="submit" disabled={loading}>
            Criar conta
          </Button>
          <Link to="/signin">Já tenho conta</Link>
        </Form>
      </Container>
    );
  }
}

SignUp.propTypes = {
  loading: PropTypes.bool.isRequired,

  signUpRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
