import React from "react";

import {
  withFormik,
  setFieldValue,
  setFieldTouched,
  Field,
  ErrorMessage
} from "formik";
import {
  Form,
  Row,
  Col,
  Collapse,
  Drawer,
  Slider,
  InputNumber,
  DatePicker,
  Input,
  Switch,
  Select,
  TreeSelect,
  Card,
  Button
} from "antd";

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const genFormEntries = (
  key,
  objs,
  setFieldValue,
  setFieldTouched,
  DataPolicyFileds,
  props
) => {
  if (objs.type === "string")
    return (
      <Form.Item
        {...formItemLayout}
        key={key}
        label={objs.label}
        help={objs.help_text}
      >
        <Input
          placeholder="Basic usage"
          value={props.values[key]}
          onChange={event => {
            setFieldValue(key, event.target.value);
          }}
          onBlur={() => setFieldTouched(key)}
          onPressEnter={props.handleSubmit}
          name={key}
          disabled={objs.read_only}
        />
        <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
      </Form.Item>
    );
  else if (objs.type === "choice")
    return (
      <Form.Item
        {...formItemLayout}
        key={key}
        label={objs.label}
        help={objs.help_text}
      >
        <Select
          defaultValue="Lucy"
          value={props.values[key]}
          onChange={event => {
            setFieldValue(key, event);
          }}
          onBlur={() => setFieldTouched(key)}
          name={key}
        >
          {objs.choices.map((value, ndx) => (
            <Option key={ndx} value={value.value}>
              {value.display_name}
            </Option>
          ))}
        </Select>

        <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
      </Form.Item>
    );
  else if (objs.type === "boolean")
    return (
      <Form.Item
        {...formItemLayout}
        key={key}
        label={objs.label}
        help={objs.help_text}
      >
        <Switch
          placeholder="Basic usage"
          value={props.values[key]}
          onChange={event => {
            setFieldValue(key, event);
          }}
          onBlur={() => setFieldTouched(key)}
          name={key}
          defaultChecked
        />

        <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
      </Form.Item>
    );
  else if (objs.type === "field")
    return (
      <Form.Item
        {...formItemLayout}
        key={key}
        label={objs.label}
        help={objs.help_text}
        required={objs.required}
      >
        {" "}
        <Row gutter={8}>
          <Col span={12}>
            <Select
              defaultValue="Lucy"
              value={props.values[key]}
              onChange={event => {
                setFieldValue(key, event);
              }}
              onBlur={() => setFieldTouched(key)}
              name={key}
            >
              {DataPolicyFileds[key + "meta"].map((value, ndx) => (
                <Option key={ndx} value={value.id}>
                  {value.name + " / " + value.date}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Button onClick={this.FieldView} id={props.values[key]} value={key}>
              {"View"}
            </Button>
          </Col>
        </Row>
        <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
        {this.state.visible && this.state.drawer === key ? (
          <Drawer
            width={480}
            title={objs.label}
            placement="right"
            closable={false}
            onClose={e => {
              this.onCloseDrawer(e, key);
            }}
            visible={this.state.visible}
          >
            {this.UpStory(key, this.props.values[key])}
          </Drawer>
        ) : null}
      </Form.Item>
    );
};

export default genFormEntries;
