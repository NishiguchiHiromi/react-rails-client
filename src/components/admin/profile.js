import React from 'react';
import {
  useAuthProvider, useNotify, useRefresh, useRedirect,
  useGetOne, useUpdate, TextInput, ImageInput, SimpleForm, required, Title, ImageField,
} from 'react-admin';
import {
  Card, CardContent,
} from '@material-ui/core';
import { getBase64 } from 'shared/util';

const Profile = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const authProvider = useAuthProvider();
  const { loginUserInfo } = authProvider;

  const { data: user } = useGetOne('users', loginUserInfo.id);
  const [profileUpdate, { loading }] = useUpdate('users');

  const basePath = 'profile';
  const redirect = useRedirect();
  const save = async (data) => {
    const { avatar } = data;
    if (avatar) {
      const file = avatar.rawFile;
      if (file) {
        const base64 = await getBase64(file);
        data.uploaded_base64 = { base64, file_name: avatar.title };
      }
      delete data.avatar;
    } else {
      data.delete_avatar = true;
    }
    profileUpdate(
      {
        payload: { id: data.id, data },
      },
      {
        onSuccess: ({ data: userData }) => {
          authProvider.setLoginUserInfo(userData);
          notify('ra.notification.updated', 'info', { smart_count: 1 });
          redirect('/');
          refresh();
        },
        onFailure: (error) => {
          notify(
            typeof error === 'string'
              ? error
              : error.message || 'ra.notification.http_error',
            'warning',
          );
        },
      },
    );
    // dataProvider.update('users', { id: data.id, data })
    //   .then((res) => {
    //     const userData = res.data;
    //     authProvider.setLoginUserInfo(userData);
    //     setUser(userData);
    //     notify('ra.notification.updated', 'info', { smart_count: 1 });
    //     redirect('/');
    //     refresh();
    //   }).catch((error) => {
    //     console.log('profile error', [error]);
    //     notify(
    //       typeof error === 'string'
    //         ? error
    //         : error.message || 'ra.notification.http_error',
    //       'warning',
    //     );
    //   });
  };
  return (
    <Card>
      <Title title="プロフィール" />
      <CardContent>
        <SimpleForm
          basePath={basePath}
          record={user || loginUserInfo}
          save={save}
        >
          <TextInput source="name" validate={required()} />
          <ImageInput source="avatar" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
      </CardContent>
    </Card>
  );
};
export default Profile;
