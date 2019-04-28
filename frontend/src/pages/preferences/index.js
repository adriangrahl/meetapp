import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as AuthActions } from '../../store/ducks/auth';
import {
  Container, Form, CheckGroup, Button,
} from './styles';

class Preferences extends Component {
  state = {
    preferences: [],
    canSubmit: false,
  };

  componentDidMount() {
    const preferences = [
      { name: 'frontend', title: 'Front-end' },
      { name: 'backend', title: 'Back-end' },
      { name: 'mobile', title: 'Mobile' },
      { name: 'devops', title: 'DevOps' },
      { name: 'management', title: 'Gestão' },
      { name: 'marketing', title: 'Marketing' },
    ];

    this.setState({ preferences });
  }

  handleChange = (title, checked) => {
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
    const { preferences } = this.state;

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

    updateRequest({ preferences: newPref }, '/');
  };

  render() {
    const {
      user: { username },
    } = this.props;

    const { preferences, canSubmit } = this.state;

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h2>{`Olá, ${username}`}</h2>
          <p>
            Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para
            selecionarmos os melhores meetups para você:
          </p>
          <h4>Preferências</h4>
          <CheckGroup>
            {preferences.map(pref => (
              <div className="checkbox" key={pref.title}>
                <input
                  id={pref.title}
                  type="checkbox"
                  name={pref.title}
                  value={pref.checked}
                  checked={pref.checked}
                  onChange={e => this.handleChange(pref.title, e.target.checked)}
                />
                <label htmlFor={pref.name} id={`label-${pref.name}`}>
                  {pref.title}
                </label>
              </div>
            ))}
          </CheckGroup>
          <Button type="submit" disabled={!canSubmit}>
            Continuar
          </Button>
        </Form>
      </Container>
    );
  }
}

Preferences.propTypes = {
  user: PropTypes.shape({
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
)(Preferences);
