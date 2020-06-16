import { Form, withFormik } from 'formik';
import React from 'react';
import {
  Check, Input, Radio, Select,
} from 'shared/Form';

const UserSearchTemplate = ({ formItems }) => (
  <Form>
    <div>
      <Input type="text" name="name_cont" placeholder="氏名" />
    </div>
    <div>
      <Radio name="gender_eq" data={formItems.gender} />
    </div>
    <div>
      <Select name="blood_type_eq" data={formItems.blood_type} blank />
    </div>
    <div>
      <Check name="hobbies_id_in" data={formItems.hobby} />
    </div>
    <button type="submit">検索</button>
  </Form>
);

const UserSearch = withFormik({
  mapPropsToValues: () => ({
    name_cont: '',
    gender_eq: '',
    blood_type_eq: '',
    hobbies_id_in: '',
  }),
  handleSubmit(
    values,
    {
      props: { searchUser },
    },
  ) {
    console.log('search', values);
    searchUser(values);
  },
  enableReinitialize: true,
})(UserSearchTemplate);
export default UserSearch;
