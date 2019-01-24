import React from "react";
import moment, { relativeTimeRounding } from "moment";
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
import { AST_ObjectSetter } from "terser";
import { object } from "@storybook/addon-knobs";
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

const tailFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const InTransPolicySchema = {
  intransid: {
    type: "integer",
    required: false,
    read_only: true,
    label: "Intransid"
  },
  usetransmission: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "파일반출",
    help_text: "파일반출기능 사용여부입니다."
  },
  useexternalservice: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "외부서비스연계",
    help_text: "외부서비스연계 사용여부입니다."
  },
  useapprove: {
    type: "choice",
    required: false,
    read_only: false,
    label: "승인단계",
    help_text: "승인기능 사용여부입니다.",
    choices: [
      {
        value: 0,
        display_name: "사용안함"
      },
      {
        value: 1,
        display_name: "1단계"
      },
      {
        value: 2,
        display_name: "2단계"
      }
    ]
  },
  useclipboard: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "클립보드반출",
    help_text: "클립보드반출기능 사용여부입니다."
  },
  usecertifiate: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "공인인증서반출",
    help_text: "공인인증서반출기능 사용여부입니다."
  },
  usewebproxy: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "웹사이트연계",
    help_text: "URL연계기능 사용여부입니다."
  },
  usemail: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "메일반출",
    help_text: "메일반출기능 사용여부입니다."
  },
  infilespolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "파일반출 세부정책"
  },
  inexternalservicepolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "외부서비스연계 세부정책"
  },
  inapprovepolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "승인단계 세부정책"
  },
  inclipboardpolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "클립보드반출 세부정책"
  },
  inwebproxypolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "웹사이트연계 세부정책"
  },
  insendmailpolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "메일반출 세부정책"
  }
};

const InTransPolicyFileds = {
  infilespolicymeta: [
    { id: 0, name: "fil", infilespolicy: null, date: "1234" },
    { id: 1, name: "file1", infilespolicy: null, date: "123456" }
  ],
  inexternalservicepolicymeta: [
    { id: 0, name: "extse0", inexternalservicepolicy: null, date: "222" },
    { id: 1, name: "extse1", inexternalservicepolicy: null, date: "333" },
    { id: 2, name: "extse2", inreceptionpolicy: null, date: "3333" }
  ],
  inapprovepolicymeta: [
    { id: 0, name: "app", inapprovepolicy: null, date: "331313" },
    { id: 1, name: "app1", inapprovepolicy: null, date: "12313" }
  ],
  inclipboardpolicymeta: [
    { id: 0, name: "cliop", inclipboardpolicy: null, date: "123123" },
    { id: 1, name: "clip1", inclipboardpolicy: null, date: "123123123" }
  ],
  inwebproxypolicymeta: [
    { id: 0, name: "webprx", inwebproxypolicy: null, date: "5555" },
    { id: 1, name: "webprx1", inwebproxypolicy: null, date: "6666" }
  ],
  insendmailpolicymeta: [
    { id: 0, name: "sendm", insendmailpolicy: null, date: "7777" },
    { id: 1, name: "sendm1", insendmailpolicy: null, date: "8888" }
  ]
};

class MyFormM extends React.Component {
  static defaultProps = {
    onCChange: () => {}
  };
  handleChangeit = e => {
    this.props.onCChange(e);
  };

  buildFormEntries = (key, objs, setFieldValue, setFieldTouched) => {
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
            value={this.props.values[key]}
            onChange={event => {
              setFieldValue(key, event.target.value);
            }}
            onBlur={() => setFieldTouched(key)}
            onPressEnter={this.props.handleSubmit}
            name={key}
          />
          <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
        </Form.Item>
      );
    else if (objs.type === "integer")
      return (
        <Form.Item
          {...formItemLayout}
          key={key}
          label={objs.label}
          help={objs.help_text}
        >
          <InputNumber
            placeholder="Basic usage"
            value={this.props.values[key]}
            onChange={event => {
              setFieldValue(key, event.target.value);
            }}
            onBlur={() => setFieldTouched(key)}
            onPressEnter={this.props.handleSubmit}
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
            value={this.props.values[key]}
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
            value={this.props.values[key]}
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
    else if (objs.type === "field") {
      /*
      const ssss = InTransPolicyFileds[key + "meta"];
      ssss.map((value, ndx) => (
        <Option key={ndx} value={value.id}>
          {value.name + " / " + value.date}
        </Option>
      )); */
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
                value={this.props.values[key]}
                onChange={event => {
                  setFieldValue(key, event);
                }}
                onBlur={() => setFieldTouched(key)}
                name={key}
              >
                {InTransPolicyFileds[key + "meta"].map((value, ndx) => (
                  <Option key={ndx} value={value.id}>
                    {value.name + " / " + value.date}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
          <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
        </Form.Item>
      );
    }
  };
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      name
    } = this.props;

    return (
      <Row type="flex">
        <Col span={24}>
          <Card
            size="small"
            title={name}
            extra={<a href="#">More</a>}
            style={{ width: 800 }}
          >
            <Form onSubmit={handleSubmit} type="flex">
              {Object.keys(InTransPolicySchema).map((oneKey, i) => {
                return this.buildFormEntries(
                  oneKey,
                  InTransPolicySchema[oneKey],
                  setFieldValue,
                  setFieldTouched
                );
              })}
              <Form.Item {...tailFormItemLayout}>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const dateFormat = "YYYY/MM/DD";
const MyEnhancedForm = withFormik({
  mapPropsToValues: props => ({
    intransid: 1,
    usetransmission: true,
    useexternalservice: true,
    useapprove: 1,
    useclipboard: true,
    usecertifiate: true,
    usewebproxy: true,
    usemail: true,
    infilespolicy: 1,
    inexternalservicepolicy: 1,
    inapprovepolicy: 1,
    inclipboardpolicy: 1,
    inwebproxypolicy: 3,
    insendmailpolicy: 2
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    // if (!values.name) {
    //   errors.name = "Required";
    //}

    return errors;
  },
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm"
})(MyFormM);

export default MyEnhancedForm;
