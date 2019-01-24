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
  filesid: {
    type: "integer",
    required: false,
    read_only: true,
    label: "Filesid"
  },
  maximumfilesize: {
    type: "choice",
    required: false,
    read_only: false,
    label: "첨부파일 최대크기",
    help_text: "전체파일의 전송 가능한  최대용량입니다.",
    choices: [
      {
        value: 0,
        display_name: "제한없음"
      },
      {
        value: 1,
        display_name: "10 M"
      },
      {
        value: 2,
        display_name: "100 M"
      },
      {
        value: 3,
        display_name: "1 G"
      }
    ]
  },
  onetimefilesize: {
    type: "choice",
    required: false,
    read_only: false,
    label: "1회전송 파일크기 합",
    help_text: "1회 전송 가능한 최대용량입니다.",
    choices: [
      {
        value: 0,
        display_name: "제한없음"
      },
      {
        value: 1,
        display_name: "10 M"
      },
      {
        value: 2,
        display_name: "100 M"
      },
      {
        value: 3,
        display_name: "1 G"
      }
    ]
  },
  maximumfiles: {
    type: "choice",
    required: false,
    read_only: false,
    label: "파일갯수",
    help_text: "1회 전송시 최대 파일 갯수 입니다.",
    choices: [
      {
        value: 0,
        display_name: "제한없음"
      },
      {
        value: 1,
        display_name: "5 개"
      },
      {
        value: 2,
        display_name: "10 개"
      }
    ]
  },
  reasonlength: {
    type: "choice",
    required: false,
    read_only: false,
    label: "전송사유 길이",
    help_text: "전송사유 최대길이 입니다.",
    choices: [
      {
        value: 0,
        display_name: "제한없음"
      },
      {
        value: 1,
        display_name: "5 글자 이상"
      },
      {
        value: 2,
        display_name: "10 글자 이상"
      }
    ]
  },
  checkcompressfile: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "압축파일 검사",
    help_text: "압축파일을 검사합니다."
  },
  sendfolder: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "폴더전송",
    help_text: "폴더를 전송 합니다."
  },
  whiteextension: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "전송가능 확장자",
    help_text: "전송 가능한 확장자입니다."
  },
  blackextension: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "전송불가 확장자",
    help_text: "전송 불가능한 확장자입니다."
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
    filesid: 1,
    maximumfilesize: 2,
    onetimefilesize: 2,
    maximumfiles: 1,
    reasonlength: 2,
    checkcompressfile: true,
    sendfolder: false,
    whiteextension: true,
    blackextension: false
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
