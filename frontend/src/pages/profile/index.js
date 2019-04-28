import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as AuthActions } from '../../store/ducks/auth';

import {
  Container, Form, InputGroup, CheckGroup, Button,
} from './styles';

class Profile extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    password_confirmationInput: '',
    preferences: [],
    canSubmit: false,
  };

  componentDidMount() {
    const {
      user: { preferences: INITIAL_STATE, username },
    } = this.props;

    const preferences = [
      { name: 'frontend', title: 'Front-end', checked: false },
      { name: 'backend', title: 'Back-end', checked: false },
      { name: 'mobile', title: 'Mobile', checked: false },
      { name: 'devops', title: 'DevOps', checked: false },
      { name: 'management', title: 'Gestão', checked: false },
      { name: 'marketing', title: 'Marketing', checked: false },
    ];

    if (INITIAL_STATE) preferences.forEach(pref => (pref.checked = INITIAL_STATE[pref.name]));

    this.setState({
      usernameInput: username,
      preferences,
      canSubmit: preferences.some(pref => pref.checked),
    });
  }

  handlePreferenceChange = (title, checked) => {
    let { preferences } = this.state;

    preferences = preferences.map(pref => (pref.title === title ? { ...pref, checked } : pref));

    this.setState({
      preferences,
      canSubmit: checked || preferences.some(pref => pref.checked),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { updateRequest } = this.props;
    const {
      preferences, usernameInput, passwordInput, password_confirmationInput,
    } = this.state;

    const newPref = {
      frontend: false,
      backend: false,
      mobile: false,
      devops: false,
      management: false,
      marketing: false,
    };

    preferences
      .filter(pref => !!pref.checked)
      .forEach((pref) => {
        newPref[pref.name] = true;
      });

    updateRequest(
      {
        ...(!!usernameInput && { username: usernameInput }),
        ...(!!passwordInput && { password: passwordInput }),
        ...(!!password_confirmationInput && { password_confirmation: password_confirmationInput }),
        preferences: newPref,
      },
      '/',
    );
  };

  render() {
    const {
      usernameInput,
      passwordInput,
      password_confirmationInput,
      preferences,
      canSubmit,
    } = this.state;

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <label htmlFor="name">Nome</label>
            <input
              type="type"
              name="nome"
              placeholder="Digite seu nome"
              value={usernameInput}
              onChange={e => this.setState({ usernameInput: e.target.value })}
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
          <InputGroup>
            <label htmlFor="password_confirmation">Confirmação de senha</label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Sua senha secreta"
              value={password_confirmationInput}
              onChange={e => this.setState({ password_confirmationInput: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <h4>Preferências</h4>
          </InputGroup>
          <CheckGroup>
            {preferences.map(pref => (
              <div className="checkbox" key={pref.title}>
                <input
                  id={pref.title}
                  type="checkbox"
                  name={pref.title}
                  value={pref.checked}
                  checked={pref.checked}
                  onChange={e => this.handlePreferenceChange(pref.title, e.target.checked)}
                />
                <label htmlFor={pref.name} id={`label-${pref.name}`}>
                  {pref.title}
                </label>
              </div>
            ))}
          </CheckGroup>
          <Button type="submit" disabled={!canSubmit}>
            Salvar
          </Button>
        </Form>
      </Container>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    preferences: PropTypes.object,
    username: PropTypes.string.isRequired,
  }).isRequired,

  updateRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
