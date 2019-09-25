import React, { Component } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import Icon from '../../components/Icon';
import { Icons } from '../../theme/Icons';

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSave() {
    const { info_types } = this.state;
    const { onDeleteType, onToggle } = this.props;
    onDeleteType(info_types);
    onToggle();
  }

  handleDelete(index) {
    const { info_types } = this.state;
    info_types.splice(index, 1);
    this.setState({
      info_types
    });
  }

  render() {
    const { info_types } = this.state;
    const {
      isOpen, onToggle
    } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={onToggle}
        className="modal-prompt"
      >
        <ModalHeader>
          Delete Info Type
        </ModalHeader>
        <ModalBody>
          {
            info_types.map((info_type, index) => (
              <div className="d-flex align-items-center mb-3" key={index}>
                <div className="space-item mr-3" style={{ width: 100 }}>
                  &#9670;
                  {' '}
                  {info_type.title}
                  {
                    info_type.children && (
                      info_type.children.map((child, key) => (
                        <div className="ml-3" key={key}>
                          &#8627;
                          {child.title}
                          {
                            child.children && (
                              <div>...</div>
                            )
                          }
                        </div>
                      ))
                    )
                  }
                </div>
                <Button
                  type="button"
                  color="secondary"
                  onClick={this.handleDelete.bind(this, index)}
                >
                  Delete
                </Button>
              </div>
            ))
          }
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
            onClick={this.handleSave.bind(this)}
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

Delete.defaultProps = {
  isOpen: false,
  onToggle: () => {},
  onDeleteType: () => {},
  info_types: []
};

export default Delete;
