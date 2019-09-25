import React, {
  Component, Fragment
} from 'react';
import {
  Button
} from 'reactstrap';
import SortableTree from 'react-sortable-tree';

class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info_types: [],
      rename: false
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const { info_types } = props;
    if (info_types.length > 0) {
      for (let i = 0; i < info_types.length; i++) {
        const info_type = info_types[i];
        if (!info_type.title) {
          info_type.title = info_type.name;
        }
      }
      this.setState({
        info_types
      });
    } else {
      this.setState({
        info_types
      });
    }
  }

  handleRename() {
    const { rename } = this.state;
    this.setState({
      rename: !rename
    });
  }

  handleChangeTreeData(value) {
    this.setState({
      info_types: value
    });
  }

  render() {
    const { info_types, rename } = this.state;
    const {
      selected, onAddType, onDeleteType, onRenameType, onMovedType
    } = this.props;
    return (
      <Fragment>
        {
          rename ? (
            <SortableTree
              treeData={info_types}
              onChange={this.handleChangeTreeData.bind(this)}
              generateNodeProps={rowInfo => ({
                buttons: [
                  <Button
                    type="button"
                    color="link"
                    className="btn btn-outline-success"
                    style={{
                      verticalAlign: 'middle',
                      border: 'none'
                    }}
                    onClick={() => onRenameType(rowInfo)}
                  >
                    Edit
                  </Button>
                ]
              })}
            />
          ) : (
            <SortableTree
              treeData={info_types}
              onChange={this.handleChangeTreeData.bind(this)}
            />
          )
        }
        {
          selected && selected.Id && (
            <div className="action-buttons">
              <Button
                type="button"
                color="primary"
                className="mb-2"
                style={{ width: 90 }}
                onClick={onAddType}
              >
                Add
              </Button>
              <Button
                type="button"
                color="primary"
                className="mb-2"
                style={{ width: 90 }}
                onClick={onDeleteType}
              >
                Delete
              </Button>
              <Button
                type="button"
                color="primary"
                className="mb-2"
                style={{ width: 90 }}
                onClick={this.handleRename.bind(this)}
              >
                Rename
              </Button>
              <Button
                type="button"
                color="primary"
                className="mb-2"
                style={{ width: 90 }}
                onClick={() => onMovedType(info_types)}
              >
                Move
              </Button>
            </div>
          )
        }
      </Fragment>
    );
  }
}

Type.defaultProps = {
  selected: {},
  info_types: [],
  onAddType: () => {},
  onDeleteType: () => {},
  onRenameType: () => {},
  onMovedType: () => {}
};

export default Type;
