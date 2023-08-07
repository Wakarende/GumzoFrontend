import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from './AppText';
import colors from '../config/colors';

function ImagePickerModal({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
}) {
  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={onClose}
      style={styles.modal}>
      <SafeAreaView>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onImageLibraryPress}>
            <MaterialCommunityIcons
              name="image-area"
              size={40}
              style={styles.buttonIcon}
            />
            <AppText style={styles.buttonText}>Library</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCameraPress}>
            <MaterialCommunityIcons
              name="camera-account"
              size={40}
              style={styles.buttonIcon}
            />
            <AppText style={styles.buttonText}>Camera</AppText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    height: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ImagePickerModal;
