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
import AddUser from "./AddUser";
// import { radios } from "@storybook/addon-knobs";
// import { RowSelectionType } from "antd/lib/table";
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

const { TreeNode } = Tree;
const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" }
        ]
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" }
        ]
      },
      {
        title: "0-0-2",
        key: "0-0-2"
      }
    ]
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" }
    ]
  },
  {
    title: "0-2",
    key: "0-2"
  }
];

class PolicyPane extends Component {
  state = {
    expandedKeys: ["0-0-0", "0-0-1"],
    autoExpandParent: true,

    selectedKeys: ["0-0-0"]
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
    console.log("onSelect", info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    return (
      <Tree
        showIcon
        defaultExpandAll
        switcherIcon={<Icon type="down" />}
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
        defaultSelectedKeys={["0-0-0"]}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}

export default PolicyPane;
