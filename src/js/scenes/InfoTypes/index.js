import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Button
} from 'reactstrap';
import Add from './Add';
import Delete from './Delete';
import Rename from './Rename';

import Type from '../../components/types';

class InfoTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      selectType: {},
      isOpenAdd: false,
      isOpenDelete: false,
      isOpenRename: false
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.location.state && props.location.state.selected) {
      this.setState({
        item: {
          ...props.location.state.selected,
          info_types: [
            {
              uid: props.location.state.selected.infoTypeUid,
              name: props.location.state.selected.infoTypeName,
              title: props.location.state.selected.infoTypeName
            }
          ]
        }
      });
    } else {
      this.setState({
        item: {
          info_types: []
        }
      });
    }
  }

  handleToggleAdd() {
    const { isOpenAdd } = this.state;
    this.setState({
      isOpenAdd: !isOpenAdd
    });
  }

  handleToggleDelete() {
    const { isOpenDelete } = this.state;
    this.setState({
      isOpenDelete: !isOpenDelete
    });
  }

  handleToggleRename(value) {
    const { isOpenRename } = this.state;
    this.setState({
      isOpenRename: !isOpenRename
    });
    if (!isOpenRename) {
      this.setState({
        selectType: value && value.node
      });
    }
  }

  handleAdd(value) {
    const { item } = this.state;
    item.info_types = value;
    this.setState({
      item
    });
  }

  handleDelete(value) {
    const { item } = this.state;
    item.info_types = value;
    this.setState({
      item
    });
  }

  handleMove(info_types) {
    const { item } = this.state;
    item.info_types = info_types;
    this.setState({
      item
    });
  }

  handleBack() {
    const { item } = this.state;
    this.props.history.push('/', { updateInfoTypes: item });
  }

  render() {
    const {
      isOpenAdd, isOpenDelete, isOpenRename, selectType, item
    } = this.state;

    return (
      <Container>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-4">Edit InfoType</h4>
            <div>
              <Button
                type="button"
                color="primary"
                onClick={this.handleBack.bind(this)}
              >
                &#10226; Back Home
              </Button>
            </div>
          </div>
          <div className="spaces-work" style={{ height: '80vh' }}>
            <Type
              selected={item}
              info_types={item.info_types && item.info_types.length > 0 ? item.info_types : []}
              onAddType={this.handleToggleAdd.bind(this, item)}
              onDeleteType={this.handleToggleDelete.bind(this, item)}
              onRenameType={this.handleToggleRename.bind(this)}
              onMovedType={this.handleMove.bind(this)}
            />
          </div>
          <Add
            isOpen={isOpenAdd}
            onToggle={this.handleToggleAdd.bind(this)}
            onAddType={this.handleAdd.bind(this)}
            info_types={item.info_types && item.info_types.length > 0 ? item.info_types : []}
          />
          <Delete
            isOpen={isOpenDelete}
            onToggle={this.handleToggleDelete.bind(this)}
            onDeleteType={this.handleDelete.bind(this)}
            info_types={item.info_types && item.info_types.length > 0 ? item.info_types : []}
          />
          <Rename
            isOpen={isOpenRename}
            onToggle={this.handleToggleRename.bind(this)}
            info_types={item.info_types && item.info_types.length > 0 ? item.info_types : []}
            type={selectType}
          />
        </div>
      </Container>
    );
  }
}

export default withRouter(InfoTypes);
