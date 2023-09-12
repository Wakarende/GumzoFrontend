import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

function EditButtonIcon({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} testID="edit-button">
      <MaterialCommunityIcons
        name="square-edit-outline"
        size={25}
        color={colors.grannySmithApple}
        testID="edit-icon"
      />
    </TouchableOpacity>
  );
}

export default EditButtonIcon;
