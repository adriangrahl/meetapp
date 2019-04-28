import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as AuthActions } from '../../store/ducks/auth';
import ErrorBox from '../../components/ErrorBox';
import {
  Container, Form, InputGroup, Button,
} from './styles';
import MeetappIcon from '../../assets/images/logo.svg';

class SignIn extends Component {
  state = {
    emailInput: '',
    passwordInput: '',
  };

  async componentDidMount() {
    const auth = JSON.parse(await localStorage.getItem('@MeetApp:auth'));

    if (auth) {
      const { user, token } = auth;
      const { signInSuccess } = this.props;

      signInSuccess(user, token);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signInRequest } = this.props;
    const { emailInput, passwordInput } = this.state;

    signInRequest(emailInput, passwordInput);
  };

  render() {
    const { emailInput, passwordInput } = this.state;
    const { loading, token, firstLogin } = this.props;

    if (token && firstLogin) return <Redirect to="/preferences" />;
    if (token) return <Redirect to="/" />;
    return (
      <Container>
        <ErrorBox />
        <Form onSubmit={this.handleSubmit}>
          <img src={MeetappIcon} alt="Meetup Icon" height="38" />
          <InputGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={e => this.setState({ emailInput: e.target.value })}
              value={emailInput}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Sua senha secreta"
              onChange={e => this.setState({ passwordInput: e.target.value })}
              value={passwordInput}
            />
          </InputGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Carregando' : 'Entrar'}
          </Button>
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

SignIn.propTypes = {
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string,
  firstLogin: PropTypes.bool,

  signInRequest: PropTypes.func.isRequired,
  signInSuccess: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  token: null,
  firstLogin: true,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  token: state.auth.token,
  firstLogin: (state.auth.user && state.auth.user.first_login) || null,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
