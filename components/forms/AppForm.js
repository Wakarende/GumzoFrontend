import React from 'react';
import {Formik} from 'formik';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {View} from 'react-native';

function AppForm({initialValues, onSubmit, validationSchema, children}) {
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  return (
    <View>
      {React.Children.map(children, child =>
        React.cloneElement(child, {...methods}),
      )}
    </View>
  );
}

export default AppForm;
