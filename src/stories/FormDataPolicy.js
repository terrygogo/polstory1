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

const DataPolicySchema = {
  datapolicyid: {
    type: "integer",
    required: false,
    read_only: true,
    label: "Datapolicyid"
  },
  policyname: {
    type: "string",
    required: false,
    read_only: false,
    label: "정책명",
    help_text: "정책명입니다.",
    max_length: 255
  },
  closingtime: {
    type: "choice",
    required: false,
    read_only: false,
    label: "자동종료시간",
    help_text: "자동종료 시간입니다.",
    choices: [
      {
        value: 0,
        display_name: "사용안함"
      },
      {
        value: 1,
        display_name: "10 분"
      },
      {
        value: 2,
        display_name: "30 분"
      },
      {
        value: 3,
        display_name: "1 시간"
      },
      {
        value: 4,
        display_name: "사용자정의"
      }
    ]
  },
  pollingtime: {
    type: "choice",
    required: false,
    read_only: false,
    label: "목록갱신주기",
    help_text: "목록갱신 주기입니다.",
    choices: [
      {
        value: 0,
        display_name: "사용안함"
      },
      {
        value: 1,
        display_name: "5 초"
      },
      {
        value: 2,
        display_name: "10 초"
      },
      {
        value: 3,
        display_name: "30 초"
      },
      {
        value: 4,
        display_name: "60 초"
      },
      {
        value: 5,
        display_name: "사용자정의"
      }
    ]
  },
  securitylevel: {
    type: "choice",
    required: false,
    read_only: false,
    label: "보안등급",
    help_text: "보안등급입니다.",
    choices: [
      {
        value: 0,
        display_name: "사용안함"
      },
      {
        value: 1,
        display_name: "무결성"
      },
      {
        value: 2,
        display_name: "무결성+암호화"
      }
    ]
  },
  jionupdate: {
    type: "boolean",
    required: false,
    read_only: false,
    label: "자료반출입",
    help_text: "자료반출입에이전트 업데이트배포 활성화 여부입니다."
  },
  systemupdate: {
    type: "choice",
    required: false,
    read_only: false,
    label: "외부프로그램",
    help_text: "외부프로그램 업데이트배포 활성화 여부 입니다.",
    choices: [
      {
        value: 0,
        display_name: "사용안함"
      },
      {
        value: 1,
        display_name: "DRM 클라이어트"
      },
      {
        value: 2,
        display_name: "DLP 클라이언트"
      },
      {
        value: 3,
        display_name: "PMS 클라이언트"
      },
      {
        value: 4,
        display_name: "매체제어 클라이언트"
      },
      {
        value: 5,
        display_name: "PC보안 클라이언트"
      }
    ]
  },
  userpasswordupdate: {
    type: "choice",
    required: false,
    read_only: false,
    label: "사용자암호",
    help_text: "사용자패스워드 갱신주기입니다.",
    choices: [
      {
        value: 0,
        display_name: "사용안함"
      },
      {
        value: 1,
        display_name: "1주"
      },
      {
        value: 2,
        display_name: "4주"
      },
      {
        value: 3,
        display_name: "8주"
      },
      {
        value: 4,
        display_name: "16주"
      },
      {
        value: 5,
        display_name: "사용자정의"
      }
    ]
  },
  pcvaccine: {
    type: "choice",
    required: false,
    read_only: false,
    label: "PC 백신",
    help_text: "PC백신을 선택입니다.",
    choices: [
      {
        value: 0,
        display_name: "사용안함"
      },
      {
        value: 1,
        display_name: "안랩 V3"
      },
      {
        value: 2,
        display_name: "sofos"
      },
      {
        value: 3,
        display_name: "알약"
      }
    ]
  },
  intransmissionpolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "내부망 반출정책"
  },
  inreceptionpolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "내부망 반입정책"
  },
  outtransmissionpolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "외부망 반출정책"
  },
  outreceptionpolicy: {
    type: "field",
    required: true,
    read_only: false,
    label: "외부망 반입정책"
  },
  company: {
    type: "field",
    required: true,
    read_only: false,
    label: "회사명"
  }
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
    else if (objs.type === "field")
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
            <Form
              onSubmit={handleSubmit}
              type="flex"
              justify="center"
              align="middle"
            >
              {Object.keys(DataPolicySchema).map((oneKey, i) => {
                return this.buildFormEntries(
                  oneKey,
                  DataPolicySchema[oneKey],
                  setFieldValue,
                  setFieldTouched
                );
              })}
              <Form.Item {...formItemLayout}>
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
    company: ["BUSANBANK"]
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
