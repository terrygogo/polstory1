import React from "react";

import { withFormik } from "formik";
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Input,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col
} from "antd";

const MyForm1 = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />
      {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ name: "" }),

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
})(MyForm1);

export default MyEnhancedForm;
