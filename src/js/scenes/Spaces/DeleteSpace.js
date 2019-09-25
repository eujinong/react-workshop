import React, { Component } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import Icon from '../../components/Icon';
import { Icons } from '../../theme/Icons';

class DeleteSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSave() {
    const { spaces } = this.state;
    const { onDeleteSpace, onToggle } = this.props;
    onDeleteSpace(spaces);
    onToggle();
  }

  handleDelete(index) {
    const { spaces } = this.state;
    spaces.splice(index, 1);
    this.setState({
      spaces
    });
  }

  render() {
    const { spaces } = this.state;
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
          Delete Space
        </ModalHeader>
        <ModalBody>
          {
            spaces.map((space, index) => (
              <div className="d-flex align-items-center mb-3" key={index}>
                <div className="space-item mr-3" style={{ width: 100 }}>
                  &#9670;
                  {' '}
                  {space.title}
                  {
                    space.children && (
                      space.children.map((child, key) => (
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

DeleteSpace.defaultProps = {
  isOpen: false,
  onToggle: () => {},
  onDeleteSpace: () => {},
  spaces: []
};

export default DeleteSpace;
