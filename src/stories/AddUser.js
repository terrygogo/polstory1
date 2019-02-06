import React, { Component } from "react";
import { Card, Button, Row, Col, Modal, Table, Skeleton } from "antd";
import moment, { relativeTimeRounding } from "moment";
import UserEntry from "./UserEntry";
import FormDataPolicy from "./FormDataPolicy";
import "./AddUser.css";
// import { radios } from "@storybook/addon-knobs";
// import { RowSelectionType } from "antd/lib/table";

var uniqid = require("uniqid");
const dateFormat = "YYYY/MM/DD";
class AddUser extends Component {
  state = {
    activerow: 0,
    users: [],
    selected: [{ id: 0 }],
    deleted: [],
    visiable: false,
    dataman: [],
    selectedRowKeys: [0],

    DataPolicyInstance: [
      {
        id: 0,
        name: "일반",
        date: moment("2018/01/01", dateFormat).format("YYYY-DD-MM hh:mm"),
        note: "그냥 자다가 만든것  ",
        policy: {
          datapolicyid: 1,
          policyname: "지온정책",
          closingtime: 3,
          pollingtime: 4,
          securitylevel: 1,
          jionupdate: false,
          systemupdate: 1,
          userpasswordupdate: 3,
          pcvaccine: 1,
          intransmissionpolicy: 1,
          inreceptionpolicy: 2,
          outtransmissionpolicy: 1,
          outreceptionpolicy: 1,
          company: 1
        },
        key: 0
      },
      {
        id: 1,
        name: "테스트",
        date: moment("2018/12/01", dateFormat).format("YYYY-DD-MM hh:mm"),
        note: "누군가가 보고 있다",
        key: 1,
        policy: {
          datapolicyid: 1,
          policyname: "지온정책",
          closingtime: 1,
          pollingtime: 1,
          securitylevel: 1,
          jionupdate: false,
          systemupdate: 1,
          userpasswordupdate: 1,
          pcvaccine: 1,
          intransmissionpolicy: 1,
          inreceptionpolicy: 1,
          outtransmissionpolicy: 1,
          outreceptionpolicy: 1,
          company: 1
        }
      },
      {
        id: 2,
        name: "보조",
        date: moment("2013/01/21", dateFormat).format("YYYY-DD-MM hh:mm"),
        note: "나무아미 타불",
        key: 2,
        policy: {
          datapolicyid: 2,
          policyname: "지온정책",
          closingtime: 2,
          pollingtime: 2,
          securitylevel: 2,
          jionupdate: false,
          systemupdate: 2,
          userpasswordupdate: 2,
          pcvaccine: 2,
          intransmissionpolicy: 2,
          inreceptionpolicy: 2,
          outtransmissionpolicy: 2,
          outreceptionpolicy: 2,
          company: 2
        }
      }
    ]
  };

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
  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {};

  onChange = activeKey => {};
  onSetActivateKey = my => {
    this.setState({ activeKey: my });
  };
  handleAdd = () => {
    const newelement = {
      id: uniqid("maninpolicy-"),
      name: "새거",
      date: moment("2013/01/21", dateFormat),
      note: "나무아미 타불ㅇㅇㅇㅇㅇ",
      key: uniqid("maninpolicy-"),
      policy: {
        datapolicyid: 2,
        policyname: "지온정책",
        closingtime: 2,
        pollingtime: 2,
        securitylevel: 2,
        jionupdate: false,
        systemupdate: 2,
        userpasswordupdate: 2,
        pcvaccine: 2,
        intransmissionpolicy: 2,
        inreceptionpolicy: 2,
        outtransmissionpolicy: 2,
        outreceptionpolicy: 2,
        company: 2
      }
    };
    this.setState(prevState => ({
      DataPolicyInstance: [...prevState.DataPolicyInstance, newelement]
    }));
  };

  handleDelete = () => {
    this.state.selected.map(inx => this.deleteUser(inx.email));
  };
  handleList = () => {
    let newSelectedRowKeys = [];
    newSelectedRowKeys.push(2);
    this.setState({ selectedRowKeys: newSelectedRowKeys });
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

  componentDidMount = () => {
    this.setState({ dataman: this.state.DataPolicyInstance });
    let newSelectedRowKeys = [];
    newSelectedRowKeys.push(0);
    //this.setState({ selectedRowKeys: newSelectedRowKeys });
    // moment.locale("kr");
  };
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    //if (this.props.dog === null) return <Skeleton />;
    const { fetching, dog, error } = this.props;
    // const { cpu, memory, diskIO, fsStat, network, filesystems } = dog;

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
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
        this.setState({ activerow: haba[0].id });

        console.log(selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
      }
    };
    return (
      <Row>
        <Col span={12}>
          <Card key="c" title="Policy Main" style={{ ...this.props.style }}>
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
              rowClassName={(record, index) => {
                if (index === this.state.activerow) return "active-row";
              }}
              rowSelection={rowSelection}
              dataSource={this.state.DataPolicyInstance}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <FormDataPolicy
            name={this.state.selected[0].note}
            values={this.state.selected[0].policy}
          />
        </Col>
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
      </Row>
    );
  }
}

export default AddUser;
