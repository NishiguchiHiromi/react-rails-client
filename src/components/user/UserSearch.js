import { Form, withFormik } from 'formik';
import React from 'react';
import Yup from 'config/yup.custom';
import {
  Check, Input, Radio, Select, MultiSelect,
} from 'shared/Form';

const UserSearchTemplate = ({ formItems, values, setFieldValue }) => {
  const addDeptIds = () => {
    const newFieldValues = [...values.departments_id_in];
    newFieldValues.push(undefined);
    setFieldValue('departments_id_in', newFieldValues);
  };

  const deleteDeptIds = (index) => {
    const newFieldValues = [...values.departments_id_in];
    newFieldValues.splice(index, 1);
    setFieldValue('departments_id_in', newFieldValues);
  };
  return (
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
      <div>
        <MultiSelect
          name="departments_id_in"
          data={formItems.department}
          deleteHandler={deleteDeptIds}
          blank
          renderSelectBoxLayout={({ index, SelectBox, deleteHandler }) => (
            <div key={index}>
              {SelectBox}
              {!!index && <button type="button" onClick={deleteHandler}>削除</button>}
            </div>
          )}
        />
        <button type="button" onClick={addDeptIds}>追加</button>
      </div>
      <button type="submit">検索</button>
    </Form>
  );
};

const UserSearch = withFormik({
  mapPropsToValues: () => ({
    name_cont: '',
    gender_eq: '',
    blood_type_eq: '',
    hobbies_id_in: '',
    departments_id_in: [],
  }),
  validationSchema: () => (
    Yup.object().shape({
      departments_id_in: Yup.array().unique(),
    })),
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
