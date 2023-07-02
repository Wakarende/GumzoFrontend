import React from 'react';
//Import that lets you directly access and use the information and functions related to your form.
import {useFormikContext} from 'formik';
//Local Imports
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({name, register, errors, ...otherProps}) {
  return (
    <>
      <AppTextInput {...register(name)} {...otherProps} />
      {errors && (
        <ErrorMessage error={errors[name]?.message} visible={errors[name]} />
      )}
    </>
  );
}

export default AppFormField;
