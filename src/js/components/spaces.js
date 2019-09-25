import React, {
  Component, Fragment
} from 'react';
import {
  Button
} from 'reactstrap';
import SortableTree from 'react-sortable-tree';

class Space extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      rename: false
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const { spaces } = props;
    if (spaces.length > 0) {
      for (let i = 0; i < spaces.length; i++) {
        const space = spaces[i];
        if (!space.title) {
          space.title = space.name;
        }
      }
      this.setState({
        spaces
      });
    } else {
      this.setState({
        spaces
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
      spaces: value
    });
  }

  render() {
    const { spaces, rename } = this.state;
    const {
      selected, onAddSpace, onDeleteSpace, onRenameSpace, onMovedSpace
    } = this.props;
    return (
      <Fragment>
        {
          rename ? (
            <SortableTree
              treeData={spaces}
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
                    onClick={() => onRenameSpace(rowInfo)}
                  >
                    Edit
                  </Button>
                ]
              })}
            />
          ) : (
            <SortableTree
              treeData={spaces}
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
                onClick={onAddSpace}
              >
                Add
              </Button>
              <Button
                type="button"
                color="primary"
                className="mb-2"
                style={{ width: 90 }}
                onClick={onDeleteSpace}
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
                onClick={() => onMovedSpace(spaces)}
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

Space.defaultProps = {
  selected: {},
  spaces: [],
  onAddSpace: () => {},
  onDeleteSpace: () => {},
  onRenameSpace: () => {},
  onMovedSpace: () => {}
};

export default Space;
