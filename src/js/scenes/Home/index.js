import React, {
  Component
} from 'react';
import { withRouter } from 'react-router-dom';
import {
  connect
} from 'react-redux';
import {
  Container, Row, Col, Form, FormGroup, Input, Button, Table
} from 'reactstrap';
import { Formik } from 'formik';
import Select from 'react-select';
import Item from '../../components/item';
import SelectSpace from './SelectSpace';
import Api from '../../apis/app';
import { Items, PACKAGES, SPACES } from '../../configs/data';
import { InfoType } from '../../configs/enums';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      items: [],
      spaces: [],
      selected: {},
      select_package: {}
    };
  }

  async componentDidMount() {
    this.setState({
      packages: PACKAGES,
      select_package: PACKAGES[0],
      items: Items.filter(item => item.state_id === PACKAGES[0].Id),
      spaces: SPACES
    });

    const data = await Api.get('api/package/list');
    console.log(data);
  }

  componentWillReceiveProps(props) {
    if (props.location.state) {
      if (props.location.state.updateSpaces) {
        this.setState({
          selected: props.location.state.updateSpaces
        });
      }
      if (props.location.state.updateInfoTypes) {
        this.setState({
          selected: props.location.state.updateInfoTypes
        });
      }
    }
  }

  handleSubmit(values) {
    const { select_package, items } = this.state;
    if (values.filter) {
      const searcjQery = values.filter.toLowerCase();
      const displayedItems = items.filter((el) => {
        const searchValue = el.fileName.toLowerCase();
        return searchValue.indexOf(searcjQery) !== -1;
      });
      this.setState({
        items: displayedItems
      });
    } else {
      this.setState({
        items: Items.filter(item => item.state_id === select_package.Id)
      });
    }
  }

  handleSelectItem(item) {
    this.setState({
      selected: item
    });
  }

  handleChangeInfoType(value) {
    const { selected } = this.state;
    selected.infoTypeUid = value.uid;
    selected.infoTypeName = value.name;
    this.setState({
      selected
    });
  }

  handleChangePackage(value) {
    this.setState({
      select_package: value,
      selected: {},
      items: Items.filter(item => item.state_id === value.Id)
    });
  }

  handleCheckSpace(space) {
    const { selected } = this.state;
    if (selected.spaces && selected.spaces.length > 0) {
      selected.spaces.push(space);
    } else {
      selected.spaces = [];
      selected.spaces.push(space);
    }
    this.setState({
      selected
    });
  }

  handleUnCheckSpace(space) {
    const { selected } = this.state;
    if (selected.spaces && selected.spaces.length > 0) {
      const index = selected.spaces.indexOf(space);
      selected.spaces.splice(index, 1);
    } else {
      selected.spaces = [];
    }
    this.setState({
      selected
    });
  }

  handleEditSpaces() {
    const { selected } = this.state;
    if (selected && selected.Id) {
      this.props.history.push('/spaces', { selected });
    } else {
      window.alert('You should select Item in table!');
    }
  }

  handleEditInfoTypes() {
    const { selected } = this.state;
    if (selected && selected.Id) {
      this.props.history.push('/infotypes', { selected });
    } else {
      window.alert('You should select Item in table!');
    }
  }

  render() {
    const {
      items, selected, packages, select_package, spaces
    } = this.state;
    let select_info_type = {};
    if (selected) {
      select_info_type = {
        uid: selected.infoTypeUid,
        name: selected.infoTypeName
      };
    }

    return (
      <Container fluid>
        <Row className="mt-4">
          <Col lg={6}>
            <div className="action-bar">
              <Formik
                initialValues={{
                  filter: ''
                }}
                onSubmit={this.handleSubmit.bind(this)}
                render={({
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit
                }) => (
                  <Form onSubmit={handleSubmit} className="d-flex justify-content-between">
                    <FormGroup className="w-90">
                      <Input
                        type="text"
                        name="filter"
                        value={values.filter}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Button
                        type="submit"
                        color="primary"
                        style={{ width: 80 }}
                      >
                        Filter
                      </Button>
                    </FormGroup>
                  </Form>
                )}
              />
            </div>
            <div className="table-responsive">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>ORGID</th>
                    <th>ITEMID</th>
                    <th>ITEM NAME</th>
                    <th>DIM</th>
                    <th>MATCHED?</th>
                    <th>INFO TYPE</th>
                    <th>SPACES</th>
                    <th>IPACKS</th>
                    <th>UPACK</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    items && items.length > 0 && (
                      items.map((item, index) => (
                        <Item
                          key={index}
                          item={item}
                          onSelect={this.handleSelectItem.bind(this, item)}
                        />
                      ))
                    )
                  }
                </tbody>
              </Table>
            </div>
          </Col>
          <Col lg={6}>
            <div style={{ marginBottom: 48 }}>
              <Select
                classNamePrefix="react-select"
                placeholder="Teach Information"
                value={select_package}
                options={packages}
                indicatorSeparator={null}
                getOptionValue={option => option.Id}
                getOptionLabel={option => option.name}
                onChange={this.handleChangePackage.bind(this)}
              />
            </div>
            <div className="information-pane">
              <div className="info-item">
                <span>OrgId: </span>
                {selected.teach_org_id}
              </div>
              <div className="info-item">
                <span>Item Id: </span>
                {selected.Id}
              </div>
              <div className="info-item">
                <span>Item Name: </span>
                {selected.fileName}
              </div>
              <div className="info-item d-flex justify-content-between align-items-center">
                <div>Information Type: </div>
                <div>
                  <Button
                    type="button"
                    color="link"
                    onClick={this.handleEditInfoTypes.bind(this)}
                  >
                    Edit InfoTypes
                  </Button>
                </div>
              </div>
              <div className="info-item">
                <Select
                  classNamePrefix="react-select"
                  placeholder="Info Type"
                  indicatorSeparator={null}
                  options={InfoType}
                  value={select_info_type}
                  getOptionValue={option => option.uid}
                  getOptionLabel={option => option.name}
                  onChange={this.handleChangeInfoType.bind(this)}
                />
              </div>
              <div className="info-item d-flex justify-content-between algin-items-center">
                <div>Spaces: </div>
                <div>
                  <Button
                    type="button"
                    color="link"
                    onClick={this.handleEditSpaces.bind(this)}
                  >
                    Edit Spaces
                  </Button>
                </div>
              </div>
              <div style={{ height: 500, padding: 20 }} className="spaces-work">
                {
                  spaces && spaces.length > 0 && (
                    spaces.map((space, key) => (
                      <SelectSpace
                        key={key}
                        space={space}
                        item={selected}
                        selected={selected.spaces && selected.spaces.length > 0 && selected.spaces.filter(item => item.uid === space.uid)}
                        onChecked={this.handleCheckSpace.bind(this)}
                        unChecked={this.handleUnCheckSpace.bind(this)}
                      />
                    ))
                  )
                }
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
