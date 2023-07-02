import React from 'react';

//Local imports
import AppButton from '../AppButton';
function SubmitButton({title, onPress}) {
  return <AppButton title={title} onPress={onPress} />;
}

export default SubmitButton;
