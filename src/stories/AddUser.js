import React, { Component } from "react";
import { Card, Button, Row, Col, Modal, Table, Skeleton } from "antd";
import moment, { relativeTimeRounding } from "moment";
import UserEntry from "./UserEntry";
import FormDataPolicy from "./FormDataPolicy";
const dateFormat = "YYYY/MM/DD";
class AddUser extends Component {
  state = {
    users: [],
    selected: [],
    deleted: [],
    visiable: false,
    dataman: []
  };

  DataPolicyInstance = [
    {
      id: 0,
      name: "일반",
      date: moment("2018/01/01", dateFormat).format("YYYY-MM-DD hh:mm"),
      note: "그냥 자다가 만든것  ",
      key: 0
    },
    {
      id: 1,
      name: "테스트",
      date: moment("2018/12/01", dateFormat).format("YYYY-MM-DD hh:mm"),
      note: "누군가가 보고 있다",
      key: 1
    },
    {
      id: 2,
      name: "보조",
      date: moment("2013/01/21", dateFormat).format("YYYY-MM-DD hh:mm"),
      note: "나무아미 타불",
      key: 2
    }
  ];

  usercolumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "note",
      dataIndex: "note",
      key: "note"
    }
  ];
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      /*
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      */
    },
    onSelect: (record, selected, selectedRows) => {
      let haba = JSON.parse(JSON.stringify(selectedRows));
      this.setState({ selected: haba });
      console.log(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    }
  };
  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {};

  onChange = activeKey => {};
  onSetActivateKey = my => {
    this.setState({ activeKey: my });
  };
  handleAdd = () => {
    this.setState({
      visible: true
    });
  };

  handleDelete = () => {
    this.state.selected.map(inx => this.deleteUser(inx.email));
  };
  handleList = () => {
    this.fetchImages();
    console.log(this.state.dataman);
  };
  handleEdit = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    console.log("hok " + e);
    this.setState({
      visible: false
    });
    this.props.onRequestDog(e);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  deleteUser = async user => {
    console.log(response);
  };
  updateUser = async user => {
    console.log(response);
  };

  componentDidMount = () => {
    this.setState({ dataman: this.DataPolicyInstance });
    moment.locale("kr");
  };
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    //if (this.props.dog === null) return <Skeleton />;
    const { fetching, dog, error } = this.props;
    // const { cpu, memory, diskIO, fsStat, network, filesystems } = dog;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Card key="c" title="Data Policy Main" style={{ width: 600 }}>
            <Row type="flex" justify="end">
              <Col>
                <Button
                  onClick={this.handleList}
                  icon="team"
                  style={{ marginBottom: 16 }}
                >
                  조회
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={this.handleAdd}
                  icon="user-add"
                  style={{ marginBottom: 16 }}
                >
                  추가
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={this.handleDelete}
                  icon="user-delete"
                  style={{ marginBottom: 16 }}
                >
                  삭제
                </Button>
              </Col>

              <Col>
                <Button
                  onClick={this.handleEdit}
                  icon="edit"
                  style={{ marginBottom: 16 }}
                >
                  변경
                </Button>
              </Col>
            </Row>
            <Table
              columns={this.usercolumn}
              rowSelection={this.rowSelection}
              dataSource={this.state.dataman}
              expandedRowRender={record => (
                <FormDataPolicy name={record.name} />
              )}
              size="small"
            />
            <Modal
              title="Add User"
              centered={true}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              closable={true}
              footer={<span>JionLab</span>}
            >
              <UserEntry regist={this.handleOk} />
            </Modal>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AddUser;
