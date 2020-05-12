import { Form, withFormik } from 'formik';
import React from 'react';
import Yup from '../config/yup.custom';
import {
  Check, Input, Radio, Select,
} from '../shared/Form';

const UserFormTemplate = ({ formItems, isSubmitting }) => (
  <Form>
    <div>
      <Input type="text" name="name" placeholder="氏名" />
    </div>
    <div>
      <Input type="email" name="mail" placeholder="メールアドレス" />
    </div>
    <div>
      <Radio name="gender" data={formItems.gender} />
    </div>
    <div>
      <Select name="blood_type" data={formItems.blood_type} blank />
    </div>
    <div>
      <Check name="hobby_ids" data={formItems.hobby} />
    </div>
    <div>
      <Input type="password" name="password" placeholder="パスワード" />
    </div>
    <div>
      <Input type="password" name="password_confirmation" placeholder="パスワード(確認用)" />
    </div>
    <button type="submit" disabled={isSubmitting}>
      登録
    </button>
  </Form>
);

const UserForm = withFormik({
  mapPropsToValues: ({ user }) => {
    const {
      name, mail, gender, blood_type, hobby_ids,
    } = user || {};
    return {
      name: name || '',
      mail: mail || '',
      gender: gender || '',
      blood_type: blood_type || '',
      hobby_ids: hobby_ids || [],
      password: '',
      password_confirmation: '',
    };
  },
  validationSchema: ({ isNewUser }) => (
    Yup.object().shape({
      name: Yup.string().required(),
      mail: Yup.string().email().required(),
      gender: Yup.number().required(),
      blood_type: Yup.number().required(),
      hobby_ids: Yup.array(),
      password: ((v) => (isNewUser ? v.required() : v))(Yup.string().min(8)),
      password_confirmation: ((v) => (isNewUser ? v.required() : v))(
        Yup.string().min(8).oneOf([Yup.ref('password')], 'パスワードが一致しません'),
      ),
    })),
  handleSubmit: (values,
    {
      props: { user, registerUser },
      setErrors,
      setSubmitting,
    }) => {
    registerUser({ ...user, ...values })
      .catch((e) => {
        console.error(e, e.message, e.response, e.response.data);
        if (e.response.status === 422) {
          setErrors(e.response.data.error);
          setSubmitting(false);
        }
      });
  },
  enableReinitialize: true,
})(UserFormTemplate);
export default UserForm;
