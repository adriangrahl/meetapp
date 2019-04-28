import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Flatpickr from 'react-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import moment from 'moment';
import timezone from 'moment-timezone';
import PropTypes from 'prop-types';
import Upload from '../../components/Upload';
import FilePreview from '../../components/FilePreview';

import 'moment/locale/pt-br';

import { Creators as NewMeetupActions } from '../../store/ducks/newMeetup';
import { Creators as UploadActions } from '../../store/ducks/upload';

import {
  Container, Form, InputGroup, CheckGroup, Button,
} from './styles';

class NewMeetup extends Component {
  state = {
    titleInput: '',
    descriptionInput: '',
    locationInput: '',
    dateInput: null,
    topics: [],
    canSubmit: false,
  };

  componentDidMount() {
    const topics = [
      { name: 'frontend', title: 'Front-end' },
      { name: 'backend', title: 'Back-end' },
      { name: 'mobile', title: 'Mobile' },
      { name: 'devops', title: 'DevOps' },
      { name: 'management', title: 'Gestão' },
      { name: 'marketing', title: 'Marketing' },
    ];

    this.setState({ topics });
  }

  handleUpload = (files) => {
    const { uploadRequest } = this.props;
    const file = files[0];

    uploadRequest(file);
  };

  handleTopicChange = (title, checked) => {
    let { topics } = this.state;

    topics = topics.map(t => (t.title === title ? { ...t, checked } : t));

    this.setState({
      topics,
      canSubmit: checked || topics.some(t => t.checked),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { file } = this.props;
    const { id: file_id } = file || {};

    const { newMeetupRequest } = this.props;
    const {
      titleInput: title,
      descriptionInput: description,
      locationInput: location,
      dateInput: date,
      topics,
    } = this.state;

    const arrTopics = {
      frontend: false,
      backend: false,
      mobile: false,
      devops: false,
      management: false,
      marketing: false,
    };

    topics
      .filter(t => !!t.checked)
      .forEach((t) => {
        arrTopics[t.name] = true;
      });

    newMeetupRequest({
      title,
      description,
      location,
      // ...(!!date && { date: timezone.tz(date[0], 'America/Sao_Paulo').format() }),
      date,
      topics: arrTopics,
      ...(!!file_id && { file_id }),
    });
  };

  deleteFileClick = (e) => {
    e.stopPropagation();

    const {
      file: { id },
      uploadDelete,
    } = this.props;

    uploadDelete(id);
  };

  render() {
    const {
      titleInput,
      descriptionInput,
      locationInput,
      dateInput,
      topics,
      canSubmit,
    } = this.state;

    const { file } = this.props;

    const { name: fileName, url } = file || {};

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              name="title"
              placeholder="Digite o título do meetup"
              value={titleInput}
              onChange={e => this.setState({ titleInput: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              name="desctiption"
              placeholder="Descreva seu meetup"
              value={descriptionInput}
              onChange={e => this.setState({ descriptionInput: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="date">Data/hora</label>
            <Flatpickr
              placeholder="Quando o meetup vai acontecer?"
              data-enable-time
              value={dateInput}
              options={{
                dateFormat: 'd \\de M \\de Y à\\s H:i',
                time_24hr: true,
                locale: Portuguese,
                mode: 'single',
              }}
              onChange={(dateInput) => {
                this.setState({
                  dateInput,
                });
              }}
            />
          </InputGroup>
          <InputGroup>
            <h4>Imagem</h4>
            <Upload
              onUpload={this.handleUpload}
              optionalContent={
                url ? (
                  <FilePreview name={fileName} url={url} onClick={this.deleteFileClick} />
                ) : null
              }
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="location">Localização</label>
            <input
              type="text"
              name="location"
              placeholder="Onde seu meetup irá acontecer"
              value={locationInput}
              onChange={e => this.setState({ locationInput: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <h4>Tema do meetup</h4>
          </InputGroup>
          <CheckGroup>
            {topics.map(t => (
              <div className="checkbox" key={t.title}>
                <input
                  id={t.title}
                  type="checkbox"
                  name={t.title}
                  value={t.checked}
                  checked={t.checked}
                  onChange={e => this.handleTopicChange(t.title, e.target.checked)}
                />
                <label htmlFor={t.name} id={`label-${t.name}`}>
                  {t.title}
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

NewMeetup.propTypes = {
  file:
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired || PropTypes.object.isRequired,
  // const { id: file_id } = file || {};

  uploadRequest: PropTypes.func.isRequired,
  newMeetupRequest: PropTypes.func.isRequired,
  uploadDelete: PropTypes.func.isRequired,
};

NewMeetup.defaultProps = {
  file: {},
};

const mapStateToProps = state => ({
  loading: state.newMeetup.loading,
  token: state.auth.token,
  file: state.upload.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...NewMeetupActions,
    ...UploadActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMeetup);
