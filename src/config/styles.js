import {Platform} from 'react-native';
import colors from './colors';

//Default styles for various aspects of the applications
export default {
  colors,
  text:
    //default styles for text
    {
      fontSize: 18,
      fontFamily: 'Poppins',
      color: colors.mediumGray,
      letterSpacing: 1.5,
    },
  background: {
    backgroundColor: colors.white,
  },
};
