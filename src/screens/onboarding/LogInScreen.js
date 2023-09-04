import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  Alert,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';

import Artwork03 from '../../components/artworks/Artwork03';
import {LOG_IN_SCREEN} from '../../utils/constants';
import PrimaryButton from '../../components/button/PrimaryButton';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from '../../../firebaseConfig';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import {useForm} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Local imports
import AppText from '../../components/AppText';
import AppInput from '../../components/inputs/AppInput';
import colors from '../../config/colors';
import BackArrow from '../../components/BackArrow';
//Validation Schema for login form, validates email and password
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const LogInScreen = ({navigation}) => {
  const theme = useTheme();
  const dimensions = useWindowDimensions();

  //Using the useForm hook for form opeations and validation
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //Login handler function using Firebase Authentication
  const handleLogin = data => {
    const {email, password} = data;

    //Initialize an instance of Firebase authentication
    const authInstance = getAuth(firebaseApp);

    //sign in user with email and password using the signInWithEmailandPassword function from Firebase
    signInWithEmailAndPassword(authInstance, email, password)
      .then(async userCredential => {
        //userCredential is the object returned on successful sign in
        const user = userCredential.user;
        // Fetch additional user details from Firestore
        const db = getFirestore(firebaseApp);
        try {
          //construct reference to document in 'users' collection where the document ID is the user's UID
          const docRef = doc(db, 'users', user.uid);

          //Fetch the document from Firestore
          const docSnap = await getDoc(docRef);

          //If document exists, log the document data and welcome user
          if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            Alert.alert(`Welcome ${docSnap.data().username}`);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log('Error getting document:', error);
        }
        navigation.navigate('DashboardScreen');
        // Alert.alert(`Welcome ${user.username}`);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Login failed', error.message);
      });
  };

  return (
    //Avoids the keyboard from covering inputs or buttons
    <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.card,
          minHeight: dimensions.height,
        }}>
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 44,
            height: 52,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => navigation.replace('IntroScreen02')}>
            <BackArrow style={styles.backArrow} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(200).duration(1000).springify()}
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <Artwork03 width={240} height={240} />
        </Animated.View>

        <View style={styles.title}>
          <Animated.Text
            entering={FadeInDown.duration(1000).springify()}
            style={styles.title}>
            {LOG_IN_SCREEN.title}
          </Animated.Text>
          <View style={styles.formContainer}>
            {/* Email Input Method */}
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              style={styles.animatedViewEmail}>
              <AppInput
                control={control}
                name="email"
                icon="email"
                rules={{required: true}}
                placeholder="Your Email"
                style={styles.input}
              />
              {errors.email && <AppText>{errors.email.message}</AppText>}
            </Animated.View>
            {/* Password Input Field */}
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              style={styles.animatedViewPassword}>
              <AppInput
                control={control}
                name="password"
                icon="lock"
                rules={{required: true}}
                placeholder="Your Password"
                secureTextEntry
                style={styles.input}
              />
              {errors.password && <AppText>{errors.password.message}</AppText>}
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}>
              {/* Submit Button */}
              <PrimaryButton
                testID="loginButton"
                label="Log In"
                onPress={handleSubmit(handleLogin)}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}>
              {/* Register Link */}
              <AppText>
                Don't have an account?
                <AppText
                  onPress={() => navigation.navigate('Register')}
                  style={styles.registerLink}>
                  Register here.
                </AppText>
              </AppText>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//Stylesheet
const styles = StyleSheet.create({
  animatedViewPassword: {
    position: 'relative',
    width: '100%',
  },
  backArrow: {
    marginTop: 50,
  },
  container: {},
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.darkGray,
    padding: 24,
  },
  description: {
    opacity: 0.5,
    marginTop: 16,
    fontSize: 16,
    color: colors.lightGray,
  },
  formContainer: {alignItems: 'center', gap: 16, marginTop: 32},
  animatedViewEmail: {position: 'relative', width: '100%'},
  input: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  registerLink: {
    color: colors.grannySmithApple,
  },
});
export default LogInScreen;
