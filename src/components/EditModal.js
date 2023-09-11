import React, {useState} from 'react';
import {Modal, View, TextInput, StyleSheet} from 'react-native';

//local imports
import AppText from './AppText';
import colors from '../config/colors';
import PrimaryButton from './button/PrimaryButton';

function EditModal({
  isVisible,
  onClose,
  initialValue,
  onSave,
  data,
  onUpdate,
  sectionTitle,
}) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleUpdate = () => {
    onUpdate(inputValue);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <AppText style={styles.title}>Edit Profile</AppText>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          multiline={true}
          numberOfLines={4}
          style={styles.modalTextInput}
        />
        <PrimaryButton
          label="Update"
          onPress={handleUpdate}
          style={styles.button}
        />
        <PrimaryButton label="Close" onPress={onClose} style={styles.button} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: colors.white,
  },
  modalTextInput: {
    width: '80%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 900,
    color: colors.darkGray,
    position: 'absolute',
    top: 10,
  },
});

export default EditModal;
