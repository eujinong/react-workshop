import React, { Component } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, FormFeedback, Label, Input
} from 'reactstrap';
import Icon from '../../components/Icon';
import { Icons } from '../../theme/Icons';

class RenameSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      spaces: [],
      space: {}
    };
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { space, spaces } = nextProps;
    this.setState({
      space,
      spaces
    });
  }

  handleChange(e) {
    const { space } = this.state;
    space.title = e.target.value;
    space.name = e.target.value;
    this.setState({
      space
    });
  }

  handleSubmit() {
    const { errors, spaces, space } = this.state;
    const { onToggle } = this.props;
    if (!space) {
      errors.space_name = 'Space Name is required!';
      this.setState({
        errors
      });
    } else {
      this.setState({
        errors: {},
        spaces
      });
      onToggle();
    }
  }

  render() {
    const { space, errors } = this.state;
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
          Rename Space
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Space Name</Label>
            <Input
              type="text"
              name="space_name"
              value={space.title}
              onChange={this.handleChange.bind(this)}
              invalid={!!errors.space_name && !space.title}
            />
            <FormFeedback>{errors.space_name && !space.title ? errors.space_name : ''}</FormFeedback>
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

RenameSpace.defaultProps = {
  isOpen: false,
  onToggle: () => {},
  spaces: [],
  space: {}
};

export default RenameSpace;
