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
  Drawer,
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
import FormFileExportPolicy from "./FormFileExportPolicy";
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
    {
      id: 0,
      name: "일반",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "main policy "
    },
    {
      id: 1,
      name: "보조",
      component: FormFileExportPolicy,
      date: moment("2018/01/18", dateFormat),
      note: "sub policy "
    },
    {
      id: 2,
      name: "특수",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "backup policy "
    }
  ],
  inexternalservicepolicymeta: [
    {
      id: 0,
      name: "일반",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "main policy "
    },
    {
      id: 1,
      name: "보조",
      component: FormFileExportPolicy,
      date: moment("2018/01/18", dateFormat),
      note: "sub policy "
    },
    {
      id: 2,
      name: "특수",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "backup policy "
    }
  ],
  inapprovepolicymeta: [
    {
      id: 0,
      name: "일반",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "main policy "
    },
    {
      id: 1,
      name: "보조",
      component: FormFileExportPolicy,
      date: moment("2018/01/18", dateFormat),
      note: "sub policy "
    },
    {
      id: 2,
      name: "특수",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "backup policy "
    }
  ],
  inclipboardpolicymeta: [
    {
      id: 0,
      name: "일반",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "main policy "
    },
    {
      id: 1,
      name: "보조",
      component: FormFileExportPolicy,
      date: moment("2018/01/18", dateFormat),
      note: "sub policy "
    },
    {
      id: 2,
      name: "특수",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "backup policy "
    }
  ],
  inwebproxypolicymeta: [
    {
      id: 0,
      name: "일반",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "main policy "
    },
    {
      id: 1,
      name: "보조",
      component: FormFileExportPolicy,
      date: moment("2018/01/18", dateFormat),
      note: "sub policy "
    },
    {
      id: 2,
      name: "특수",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "backup policy "
    }
  ],
  insendmailpolicymeta: [
    {
      id: 0,
      name: "일반",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "main policy "
    },
    {
      id: 1,
      name: "보조",
      component: FormFileExportPolicy,
      date: moment("2018/01/18", dateFormat),
      note: "sub policy "
    },
    {
      id: 2,
      name: "특수",
      component: FormFileExportPolicy,
      date: moment("2018/01/01", dateFormat),
      note: "backup policy "
    }
  ]
};

class MyFormM extends React.Component {
  state = { visible: false, drawer: null };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  onCloseDrawer = (e, key) => {
    console.log(key);
    this.setState({
      visible: false,
      drawer: null
    });
  };
  FieldView = e => {
    console.log(e.target.value, e.target.id);
    this.setState({
      visible: true,
      drawer: e.target.value
    });
  };
  static defaultProps = {
    onCChange: () => {}
  };
  handleChangeit = e => {
    this.props.onCChange(e);
  };
  UpStory = (key, ndx) => {
    // Correct! JSX type can be a capitalized variable.
    const componet = InTransPolicyFileds[key + "meta"][ndx];

    const SpecificStory = componet.component;
    if (SpecificStory === undefined) {
      console.log(key);
    }
    return <SpecificStory />;
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
              <Button
                onClick={this.FieldView}
                id={this.props.values[key]}
                value={key}
              >
                View
              </Button>
            </Col>
          </Row>
          <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
          {this.state.visible && this.state.drawer === key ? (
            <Drawer
              width={440}
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
            style={{ width: 600 }}
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
