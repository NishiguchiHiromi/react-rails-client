import * as React from 'react';
import {
  List, SimpleList, Edit, Create,
  Datagrid,
  TabbedForm, FormTab, TopToolbar,
  EditButton, ShowButton, CloneButton,
  TextField, EmailField, UrlField,
  SimpleForm, ReferenceInput, ReferenceArrayInput, TextInput, PasswordInput, SearchInput, SelectInput, SelectArrayInput, NumberInput, RadioButtonGroupInput, CheckboxGroupInput,
  Filter,
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  number,
  regex,
  email,
  choices,
} from 'react-admin';
import {
  Typography, Button, makeStyles, Chip,
} from '@material-ui/core';

const ENUM = {
  gender: [{ name: '男性', id: 1 }, { name: '女性', id: 2 }, { name: 'その他', id: 3 }],
  blood_type: [{ name: 'A', id: 1 }, { name: 'B', id: 2 }, { name: 'O', id: 3 }, { name: 'AB', id: 4 }],
};

export const UserList = (props) => (
  <List filters={<UserFilter />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="mail" />
      {/* <TextField source="company.name" /> */}
      <EditButton />
      <CloneButton />
    </Datagrid>
  </List>
);

export const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="名前" source="name_cont" alwaysOn resettable />
    <TextInput label="メールアドレス" source="mail_cont" resettable />
    <QuickFilter label="にしぐち" source="name_cont" defaultValue="にしぐち" />
    <RadioButtonGroupInput
      label="性別"
      source="gender_eq"
      choices={ENUM.gender}
    />
    <SelectInput
      label="血液型"
      source="blood_type_eq"
      choices={ENUM.blood_type}
    />
    <ReferenceArrayInput label="部署" source="departments_id_in" reference="departments" sort={{ field: 'order', order: 'ASC' }}>
      <SelectInput optionText="name" />
    </ReferenceArrayInput>
    <ReferenceArrayInput label="趣味" source="hobbies_id_in" reference="hobbies">
      <SelectInput optionText="name" />
    </ReferenceArrayInput>
  </Filter>
);
const useQuickFilterStyles = makeStyles((theme) => ({
  chip: {
    marginBottom: theme.spacing(1),
  },
}));
const QuickFilter = ({ label }) => {
  const classes = useQuickFilterStyles();
  return <Chip className={classes.chip} label={label} />;
};

const validateRequired = [required()];
const validateMail = [email(), required()];
const validatePasswordCofirmation = (value, allValues) => {
  console.log(value, allValues);
  if (allValues.password && allValues.password !== value) {
    return 'not same';
  }
};
export const UserEdit = (props) => console.log(props) || (
  <Edit title={<UserTitle />} actions={<UserEditActions />} aside={<Aside />} {...props}>
    <TabbedForm initialValues={{ hoge: 'hogehogevaluee' }}>
      <FormTab label="summary">
        <TextInput disabled source="id" />
        <TextInput source="name" validate={validateRequired} />
        <TextInput source="kana" />
        <TextInput source="mail" type="email" validate={validateMail} />
        <RadioButtonGroupInput
          label="性別"
          source="gender"
          choices={ENUM.gender}
          validate={validateRequired}
        />
        <SelectInput
          label="血液型"
          source="blood_type"
          choices={ENUM.blood_type}
          validate={validateRequired}
        />
        <ReferenceArrayInput label="部署" source="department_ids" reference="departments">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
        <ReferenceArrayInput label="趣味" source="hobby_ids" reference="hobbies">
          <CheckboxGroupInput source="name" optionText="name" />
        </ReferenceArrayInput>
        <PasswordInput source="password" />
        <PasswordInput source="password_confirmation" validate={validatePasswordCofirmation} />
      </FormTab>
      <FormTab label="hoge">
        <>他のタブ〜</>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="kana" />
      <TextInput source="mail" type="email" />
      <NumberInput source="gender" />
      <NumberInput source="blood_type" />
      <TextInput source="password" type="password" />
      <TextInput source="password_confirmation" type="password" />
    </SimpleForm>
  </Create>
);

const UserTitle = ({ record }) => (
  <span>
    User
    {' '}
    {record ? record.name : ''}
  </span>
);

const UserEditActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <Button color="primary" onClick={() => alert('いえい！')}>いえい</Button>
  </TopToolbar>
);

const Aside = () => (
  <div style={{ width: 200, margin: '1em' }}>
    <Typography variant="h6">Post details</Typography>
    <Typography variant="body2">
      Posts will only be published once an editor approves them
    </Typography>
  </div>
);
