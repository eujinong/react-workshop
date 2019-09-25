import React, {
  Component
} from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      item: props.item
    });
  }

  render() {
    const { item } = this.state;
    const { onSelect } = this.props;
    return (
      <tr onClick={onSelect}>
        <td>{item.teach_org_id}</td>
        <td>{item.Id}</td>
        <td>{item.fileName}</td>
        <td>{}</td>
        <td>
          {}
        </td>
        <td>{item.infoTypeName}</td>
        <td>
          {

          }
        </td>
        <td>{}</td>
        <td>{}</td>
      </tr>
    );
  }
}

Item.defaultProps = {
  item: {},
  onSelect: () => {}
};

export default Item;
