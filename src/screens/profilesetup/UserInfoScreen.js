import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

//Local imports
import AppInput from '../../components/inputs/AppInput';
import AppText from '../../components/text/AppText';
import colors from '../../config/colors';
import PrimaryButton from '../../components/button/PrimaryButton';
import {FormContext} from '../../components/FormContext';
import {Timestamp} from 'firebase/firestore';
import {uploadImageToCloudStorage} from '../../utils/UploadImageToCloudStorage';
//Validation Schema for login form, validates first name, last name and date of birth
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required()
    .label('First Name'),
  lastName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required()
    .label('Last Name'),
  dob: Yup.date().required().label('dob'),
});

//Using the useForm hook for form opeations and validation
function UserInfoScreen({navigation, route}) {
  //user id is extracted from navigation parameters
  const {uid} = route.params;

  //Using FormContext to handle form state
  const {state, dispatch} = useContext(FormContext);

  //Setting up the form validation using react-hook-form
  const {
    control,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //Watch date state
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  //Function that sets showDatePicker to true
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  //Handle date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    //convert date to firestore timestamp
    const timestamp = Timestamp.fromDate(currentDate);
    console.log('Timestamp:' + timestamp);
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'dob', value: timestamp},
    });
  };

  // Watch the values of firstName and lastName fields
  const firstName = watch('firstName');
  const lastName = watch('lastName');

  // Function to update context state and navigate to the next screen
  const handleContinue = () => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'firstName', value: firstName},
    });
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'lastName', value: lastName},
    });
    navigation.navigate('NativeLanguage', {uid});
  };

  //Placeholder image path
  const placeholderImage = require('../../../assets/profileBackground.png');

  //Retrieving the selected image from the context state
  const selectedImage = state.selectedImage;

  //Function to launch image picker and select an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUrl = await uploadImageToCloudStorage(result.assets[0].uri);
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {field: 'selectedImage', value: imageUrl},
      });
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.profileContainer}>
            {/* Profile Picture */}
            <TouchableOpacity onPress={pickImage}>
              {selectedImage ? (
                <ImageBackground
                  source={{uri: selectedImage}}
                  resizeMode="cover"
                  style={styles.profilePicture}>
                  <MaterialCommunityIcons
                    name="camera-account"
                    size={25}
                    style={styles.imagePicker}
                  />
                </ImageBackground>
              ) : (
                <ImageBackground
                  source={placeholderImage}
                  resizeMode="cover"
                  style={styles.profilePicture}>
                  <MaterialCommunityIcons
                    name="camera-account"
                    size={25}
                    style={styles.imagePicker}
                  />
                </ImageBackground>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            {/* First Name */}
            <AppInput
              control={control}
              name="firstName"
              rules={{required: true}}
              placeholder="First Name"
              style={styles.input}
            />
          </View>
          {errors.firstName && <AppText>{errors.firstName.message}</AppText>}
          {/* Last Name */}
          <View style={styles.inputContainer}>
            <AppInput
              control={control}
              name="lastName"
              rules={{required: true}}
              placeholder="Last Name"
              style={styles.input}
            />
          </View>
          {errors.lastName && <AppText>{errors.lastName.message}</AppText>}
          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={openDatePicker} style={styles.calender}>
              {date ? (
                //If date selected, show date selected
                <View style={styles.datPicker}>
                  <AppText style={styles.dob}>{date.toDateString()}</AppText>
                </View>
              ) : (
                //If no date is selected, show a prompt with an icon
                <View style={styles.datePicker}>
                  <MaterialCommunityIcons
                    name="calendar-range"
                    size={30}
                    style={styles.calenderIcon}
                  />
                  <AppText style={styles.dateOfBirth}>Date Of Birth</AppText>
                </View>
              )}
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        </View>
        <View style={styles.button}>
          <PrimaryButton label="Continue" onPress={handleContinue} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calender: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    height: 66,
    borderRadius: 15,
    paddingLeft: 48,
    paddingRight: 12,
    backgroundColor: colors.input,
  },
  calenderIcon: {
    color: colors.lightGray,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  dob: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  dateOfBirth: {
    marginLeft: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  inputContainer: {
    width: '80%',
    marginTop: 24,
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 56,
    marginTop: 43,
  },
  imagePicker: {
    left: 140,
    marginTop: 30,
    bottom: 1,
    color: colors.darkGray,
  },
  profileContainer: {
    position: 'relative',
    width: 200,
    height: 200,
  },
});
export default UserInfoScreen;
