import React, { Component } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, FormFeedback, Input, Label
} from 'reactstrap';
import { Formik } from 'formik';
import Icon from '../../components/Icon';
import { Icons } from '../../theme/Icons';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      info_types: []
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      info_types: props.info_types
    });
  }

  handleSubmit(values) {
    const { errors, info_types } = this.state;
    const { onAddType, onToggle } = this.props;
    if (!values.type_name) {
      errors.type_name = 'Info Type Name is required!';
      this.setState({
        errors
      });
    } else {
      info_types.push({ title: values.type_name, name: values.type_name });
      this.setState({
        errors: {},
        info_types
      });
      onAddType(info_types);
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
          Add Info Type
        </ModalHeader>
        <Formik
          initialValues={{
            type_name: ''
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
                  <Label>Info Type Name</Label>
                  <Input
                    type="text"
                    name="type_name"
                    value={values.type_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    invalid={!!errors.type_name && !values.type_name}
                  />
                  <FormFeedback>{errors.type_name && !values.type_name ? errors.type_name : ''}</FormFeedback>
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

Add.defaultProps = {
  isOpen: false,
  onToggle: () => {},
  onAddTyp: () => {},
  info_types: []
};

export default Add;
