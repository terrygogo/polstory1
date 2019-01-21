import React from "react";
import moment from "moment";
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

const { MonthPicker, RangePicker } = DatePicker;
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
const MyForm2 = ({
  values,
  errors,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
  name
}) => (
  <Row type="flex" justify="center" align="middle">
    <Col span={18}>
      <Card
        size="small"
        title={name}
        extra={<a href="#">More</a>}
        style={{ width: 600 }}
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
              onChange={event => setFieldValue("name", event.target.value)}
              onBlur={() => setFieldTouched("name")}
              onPressEnter={handleSubmit}
              name="name"
            />
            <ErrorMessage name="name">{msg => <div>{msg}</div>}</ErrorMessage>
          </Form.Item>
          <Form.Item {...formItemLayout} label="E-mail">
            <Slider
              min={1}
              max={20}
              onChange={(event, dd) => setFieldValue("sld", event)}
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
            <ErrorMessage name="date">{msg => <div>{msg}</div>}</ErrorMessage>
          </Form.Item>
          <Form.Item {...formItemLayout}>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  </Row>
);
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
})(MyForm2);

export default MyEnhancedForm;
