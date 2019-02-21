import React, { Component } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Modal,
  Tree,
  Skeleton,
  Tabs,
  Collapse,
  Icon
} from "antd";
import UserEntry from "./UserEntry";

import "./AddUser.css";

// import { radios } from "@storybook/addon-knobs";
// import { RowSelectionType } from "antd/lib/table";
import FormDataPolicy from "./FormDataPolicy";
import FormInTransPolicy from "./FormInTransmissionPolicy";
import FormFileExportPolicy from "./FormFileExportPolicy";
import AddUser from "./AddUser";
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

const components = {
  main: AddUser,
  sub1: FormInTransPolicy,
  sub2: FormFileExportPolicy
};

const { TreeNode } = Tree;
const treeData = [
  {
    title: "망연계 전송정책",
    key: "top",
    children: [
      {
        title: "일반",
        key: "top1"
      },
      {
        title: "세부정책",
        key: "sub1",
        children: [
          {
            title: "내부망 반출정책",
            key: "sub11",
            children: [
              { title: "일반", key: "top11" },
              {
                title: "세부정책",
                key: "sub111",
                children: [
                  { title: "파일전송", key: "top111" },
                  { title: "외부서비스연계", key: "top112" },
                  { title: "승인절차", key: "top113" },
                  { title: "클립보드", key: "top114" },
                  { title: "URL연계", key: "0top115" },
                  { title: "내부메일반출", key: "top116" }
                ]
              }
            ]
          },
          {
            title: "내부망 반입정책",
            key: "sub12",
            children: [
              { title: "일반", key: "top12" },
              {
                title: "세부정책",
                key: "sub121",
                children: [{ title: "내부망수신 메일정책", key: "top121" }]
              }
            ]
          },
          {
            title: "외부망 반출정책",
            key: "sub21",
            children: [
              { title: "일반", key: "top21" },
              {
                title: "세부정책",
                key: "sub211",
                children: [
                  { title: "파일반입", key: "top211" },
                  { title: "외부서비스 연계", key: "top212" },
                  { title: "승인절차", key: "top213" },
                  { title: "클립보드반입", key: "top214" },
                  { title: "메일반입", key: "top215" }
                ]
              }
            ]
          },
          {
            title: "내부망 반입정책",
            key: "sub22",
            children: [
              { title: "일반", key: "top22" },
              {
                title: "세부정책",
                key: "sub221",
                children: [{ title: "내부망수신 메일정책", key: "top221" }]
              }
            ]
          }
        ]
      }
    ]
  }
];


function Story(mimi) {
  // Correct! JSX type can be a capitalized variable.
  let SpecificStory = null;
  switch (mimi) {
    case "top1":
      SpecificStory = components.main;
      break;
    case "top11":
      SpecificStory = components.sub1;
      break;
    case "top12":
      SpecificStory = components.sub2;
      break;
    default:
      SpecificStory = components.main;
  }
  return <SpecificStory />;
}

class PolicyPane extends Component {
  state = {
    expandedKeys: ["top1", "sub1"],
    autoExpandParent: true,

    selectedKeys: ["top1"]
  };

  onExpand = expandedKeys => {
    console.log("onExpand", expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onCheck = checkedKeys => {
    console.log("onCheck", checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    var vv = "";
    vv = selectedKeys[0];
    console.log("onSelect", info);
    console.log("onSelecti", selectedKeys);
    if (!vv.startsWith("sub")) this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      var kk = "normal";
      if (item.title === "세부정책") kk = "lighter";
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            style={{
              fontWeight: kk
            }}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          {...item}
          style={{
            fontWeight: kk
          }}
        />
      );
    });

  render() {
    return (
      <Row>
        <Col xs={24} sm={6} md={6} lg={4} xl={4}>
          <Tree
            showLine
            defaultExpandAll={true}
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
            defaultSelectedKeys={["top1"]}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </Col>
        <Col xs={24} sm={18} md={18} lg={20} xl={20}>
          {Story(this.state.selectedKeys[0])}
        </Col>
      </Row>
    );
  }
}

export default PolicyPane;
