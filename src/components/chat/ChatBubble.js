import React from 'react';
import {Bubble} from 'react-native-gifted-chat';

//Local Imports
import colors from '../../config/colors';

const ChatBubble = props => {
  return (
    <Bubble
      {...props}
      textStyle={{
        left: {color: colors.darkGray},
        right: {color: colors.darkGray},
      }}
      wrapperStyle={{
        right: {backgroundColor: colors.grannySmithApple},
      }}
    />
  );
};

export default ChatBubble;
