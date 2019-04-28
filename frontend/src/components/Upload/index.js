import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { DropContainer, UploadMessage } from './styles';

export default class Upload extends Component {
  state = {};

  static propTypes = {
    optionalContent: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
  };

  renderDragMessage = (isDragActive, isDragReject) => {
    const { optionalContent } = this.props;

    if (optionalContent) return optionalContent;

    if (!isDragActive) {
      return (
        <UploadMessage type="regular">
          <i className="fa fa-camera" />
        </UploadMessage>
      );
    }

    if (isDragReject) {
      return <UploadMessage type="danger">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  };

  render() {
    const { onUpload } = this.props;

    return (
      <Dropzone accept="image/*" onDropAccepted={onUpload}>
        {({
          getRootProps, getInputProps, isDragActive, isDragReject,
        }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {this.renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}
