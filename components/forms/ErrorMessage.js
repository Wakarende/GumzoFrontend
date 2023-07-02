//Third party imports
import React from 'react';
import {StyleSheet} from 'react-native';

//Local imports
import AppText from '../AppText';
import colors from '../../config/colors';

function ErrorMessage({error, visible}) {
  //Check to see if error is undefined.
  if (!error) return null;
  return <AppText style={styles.error}>{[error, visible]}</AppText>;
}

const styles = StyleSheet.create({
  error: {color: 'red'},
});
export default ErrorMessage;
