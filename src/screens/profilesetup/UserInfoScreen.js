import React, {useState, useCallback, pi} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
//Local imports
import AppInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import PrimaryButton from '../../components/PrimaryButton';
import ImagePickerModal from '../../components/ImagePickerModal';

//Validation Schema for login form, validates email and password
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

const image = require('../../../assets/profileBackground.png');
//Using the useForm hook for form opeations and validation
function UserInfoScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //IMAGE PICKER
  // eslint-disable-next-line prettier/prettier

  const placeholderImage = require('../../../assets/profileBackground.png');
  // eslint-disable-next-line no-bitwise, prettier/prettier, no-undef
  // const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
  // //Image picker
  // const [pickerResponse, setPickerResponse] = useState(null);
  // const [visible, setVisible] = useState(false);

  // const onImageLibraryPress = useCallback(() => {
  //   const options = {
  //     selectionLimit: 1,
  //     mediaType: 'photo',
  //     includeBase64: false,
  //   };
  //   ImagePicker.launchImageLibrary(options, response =>
  //     setPickerResponse(response),
  //   );
  // }, []);

  // const onCameraPress = useCallback(() => {
  //   const options = {
  //     saveToPhotos: true,
  //     mediaType: 'photo',
  //     includeBase64: false,
  //   };
  //   ImagePicker.launchCamera(options, response => setPickerResponse(response));
  // }, []);

  // const uri = pickerResponse?.assets?.[0]?.uri;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.profileContainer}>
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
            {/*  {image && (
              <ImageBackground resizeMode="cover" style={styles.profilePicture}>
                <MaterialCommunityIcons
                  name="camera-account"
                  size={25}
                  style={styles.imagePicker}
                />
              </ImageBackground>
            )} */}
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
  );
}

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
