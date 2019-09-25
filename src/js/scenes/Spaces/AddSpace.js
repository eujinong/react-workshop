import React, { Component } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, FormFeedback, Input, Label
} from 'reactstrap';
import { Formik } from 'formik';
import Icon from '../../components/Icon';
import { Icons } from '../../theme/Icons';

class AddSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      spaces: []
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      spaces: props.spaces
    });
  }

  handleSubmit(values) {
    const { errors, spaces } = this.state;
    const { onAddSpace, onToggle } = this.props;
    if (!values.space_name) {
      errors.space_name = 'Space Name is required!';
      this.setState({
        errors
      });
    } else {
      spaces.push({ title: values.space_name, name: values.space_name });
      this.setState({
        errors: {},
        spaces
      });
      onAddSpace(spaces);
      onToggle();
    }
  }

  render() {
    const { errors } = this.state;
    const {
      isOpen, onToggle
    } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={onToggle}
        className="modal-add-space"
      >
        <ModalHeader>
          Add Space
        </ModalHeader>
        <Formik
          initialValues={{
            space_name: ''
          }}
          onSubmit={this.handleSubmit.bind(this)}
          render={({
            values,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <FormGroup>
                  <Label>Space Name</Label>
                  <Input
                    type="text"
                    name="space_name"
                    value={values.space_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    invalid={!!errors.space_name && !values.space_name}
                  />
                  <FormFeedback>{errors.space_name && !values.space_name ? errors.space_name : ''}</FormFeedback>
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
                  type="submit"
                  color="primary"
                >
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        />
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

AddSpace.defaultProps = {
  isOpen: false,
  onToggle: () => {},
  onAddSpace: () => {},
  spaces: []
};

export default AddSpace;
