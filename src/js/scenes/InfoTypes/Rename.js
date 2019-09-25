import React, { Component } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, FormFeedback, Label, Input
} from 'reactstrap';
import Icon from '../../components/Icon';
import { Icons } from '../../theme/Icons';

class Rename extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      info_types: [],
      type: {}
    };
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { type, info_types } = nextProps;
    this.setState({
      type,
      info_types
    });
  }

  handleChange(e) {
    const { type } = this.state;
    type.title = e.target.value;
    type.name = e.target.value;
    this.setState({
      type
    });
  }

  handleSubmit() {
    const { errors, info_types, type } = this.state;
    const { onToggle } = this.props;
    if (!type) {
      errors.type_name = 'Info Type Name is required!';
      this.setState({
        errors
      });
    } else {
      this.setState({
        errors: {},
        info_types
      });
      onToggle();
    }
  }

  render() {
    const { type, errors } = this.state;
    const {
      isOpen, onToggle
    } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={onToggle}
        className="modal-rename-space"
      >
        <ModalHeader>
          Rename Info Type
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Info Type Name</Label>
            <Input
              type="text"
              name="type_name"
              value={type.title}
              onChange={this.handleChange.bind(this)}
              invalid={!!errors.type_name && !type.title}
            />
            <FormFeedback>{errors.type_name && !type.title ? errors.type_name : ''}</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            className="mr-3"
            onClick={onToggle}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={this.handleSubmit.bind(this)}
          >
            Save
          </Button>
        </ModalFooter>
        <div
          className="modal-close"
          role="presentation"
          onClick={onToggle}
        >
          <Icon source={Icons.iconClose} />
        </div>
      </Modal>
    );
  }
}

Rename.defaultProps = {
  isOpen: false,
  onToggle: () => {},
  info_types: [],
  type: {}
};

export default Rename;
