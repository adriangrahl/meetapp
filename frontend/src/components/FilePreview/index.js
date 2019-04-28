import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

const FilePreview = ({ url, name, onClick }) => (
  <Container>
    <img src={url} alt={name} />
    <i className="fa fa-trash" aria-hidden="true" onClick={onClick} />
  </Container>
);

FilePreview.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FilePreview;
