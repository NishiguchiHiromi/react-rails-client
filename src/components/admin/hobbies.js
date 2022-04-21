import * as React from 'react';
import {
  List, SimpleList, Edit, Create,
  Datagrid, EditButton,
  TextField, EmailField, UrlField,
  SimpleForm, ReferenceInput, TextInput, SelectInput, NumberInput,
  Filter,
} from 'react-admin';

export const HobbyList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const HobbyEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const HobbyCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
