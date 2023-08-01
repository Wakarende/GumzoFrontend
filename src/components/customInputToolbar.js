import React from 'react';
import {InputToolbar} from 'react-native-gifted-chat';
import colors from '../config/colors';
function customInputToolbar(props) {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: colors.white,
        borderTopColor: colors.input,
        borderTopWidth: 1,
        marginTop: 10,
        padding: 5,
      }}
    />
  );
}

export default customInputToolbar;
