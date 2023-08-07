import React, {useState} from 'react';
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

//Local imports
import AppInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import PrimaryButton from '../../components/PrimaryButton';

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
function UserInfoScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const placeholderImage = require('../../../assets/profileBackground.png');

  //State to manage the selected image for the profile picture
  const [selectedImage, setSelectedImage] = useState(null);

  //Function to launch image picker and select an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
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
          {/* First Name */}
          <AppInput
            control={control}
            name="firstName"
            rules={{required: true}}
            placeholder="First Name"
            style={styles.input}
          />
          {errors.firstName && <AppText>{errors.firstName.message}</AppText>}
          {/* Last Name */}
          <AppInput
            control={control}
            name="lastName"
            rules={{required: true}}
            placeholder="Last Name"
            style={styles.input}
          />
          {errors.lastName && <AppText>{errors.lastName.message}</AppText>}
        </View>
        <View style={styles.button}>
          <PrimaryButton
            label="Continue"
            onPress={() => navigation.navigate('UserInterests')}
          />
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    // flexDirection: 'row',
  },
  profilePicture: {
    width: 200,
    height: 200,
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkGray,
    paddingLeft: 48,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    borderColor: colors.lightGray,
    borderWidth: 1,
    width: '80%',
  },
  form: {
    flex: 1,
    // justifyContent: 'center',
  },
  button: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imagePicker: {
    left: 140,
    // top: 10,
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
