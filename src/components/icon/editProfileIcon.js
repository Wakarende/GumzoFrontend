import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../config/colors';

function EditButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name="square-edit-outline"
        size={25}
        color={colors.grannySmithApple}
      />
    </TouchableOpacity>
  );
}

export default EditButton;
