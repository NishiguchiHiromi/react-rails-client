import { Form, withFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import Yup from '../config/yup.custom';
import { Input } from '../shared/Form';

const LoginForm = ({ errors, touched, isSubmitting }) => (
  <>
    <Form>
      <Input
        type="email"
        name="mail"
        placeholder="メールアドレス"
        errors={errors}
        touched={touched}
      />
      <Input
        type="password"
        name="password"
        placeholder="パスワード"
        errors={errors}
        touched={touched}
      />
      <button type="submit" disabled={isSubmitting}>
        ログイン
      </button>
    </Form>
    <Link to="/public">Public Page</Link>
  </>
);

const Login = withFormik({
  // デフォルト値
  mapPropsToValues({ mail, password }) {
    return {
      mail: mail || '',
      password: password || '',
    };
  },
  // バリデーション
  validationSchema: Yup.object().shape({
    mail: Yup.string().required(),
    password: Yup.string().required(),
  }),
  // submit時のアクション
  handleSubmit(
    { mail, password },
    {
      props: { login }, setErrors, setSubmitting,
    },
  ) {
    login({ mail, password }).catch((res) => {
      setErrors({ mail: res.response.data.message, password: '' });
      setSubmitting(false);
    });
  },
})(LoginForm);
export default Login;
