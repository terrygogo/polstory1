import React from "react";
import moment, { relativeTimeRounding } from "moment";
import { withFormik, setFieldValue, Field, ErrorMessage } from "formik";
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

class MyForm extends React.Component {
  static defaultProps = {
    onCChange: () => {}
  };
  handleChangeit = e => {
    this.props.onCChange(e);
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
              <Form.Item {...formItemLayout} label="E-mail">
                <Input
                  placeholder="Basic usage"
                  value={values["name"]}
                  onChange={event => {
                    setFieldValue("name", event.target.value);
                  }}
                  onBlur={() => setFieldTouched("name")}
                  onPressEnter={handleSubmit}
                  name="name"
                />
                <ErrorMessage name="name">
                  {msg => <div>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item {...formItemLayout} label="E-mail">
                <Slider
                  min={0}
                  max={20}
                  onChange={(event, dd) => {
                    setFieldValue("sld", event);
                    this.props.onCChange(event);
                  }}
                  onBlur={() => setFieldTouched("sld")}
                  value={values["sld"]}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="날짜를 입력하세요">
                <DatePicker
                  placeholder="Basic usage"
                  value={values["date"]}
                  onChange={(event, dd) => setFieldValue("date", event)}
                  onBlur={() => setFieldTouched("date")}
                  onPressEnter={handleSubmit}
                  name="date"
                />
                <ErrorMessage name="date">
                  {msg => <div>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item {...formItemLayout}>
                <Button htmlType="submit">Submit</Button>
                <DisplayFormikState {...this.props} />
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
    name: props.name,
    sld: parseInt(props.sld),
    date: moment("2018/01/01", dateFormat)
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm"
})(MyForm);

export const DisplayFormikState = props => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem"
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);
export default MyEnhancedForm;
