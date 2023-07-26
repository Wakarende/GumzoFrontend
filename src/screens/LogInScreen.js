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

import Artwork03 from '../components/artworks/Artwork03';
import {LOG_IN_SCREEN} from '../utils/constants';
import PrimaryButton from '../components/PrimaryButton';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from '../../firebaseConfig';
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
import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import colors from '../config/colors';

//Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const LogInScreen = ({navigation}) => {
  const theme = useTheme();
  const dimensions = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = data => {
    const {email, password} = data;

    const authInstance = getAuth(firebaseApp);
    signInWithEmailAndPassword(authInstance, email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        // Fetch additional user details from Firestore
        const db = getFirestore(firebaseApp);
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
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
            height: 52,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => navigation.replace('IntroScreen02')}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.lightGray}
            />
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
          <Animated.Text
            entering={FadeInDown.delay(100).duration(1000).springify()}
            style={styles.description}>
            {LOG_IN_SCREEN.description}
          </Animated.Text>

          <View style={styles.formContainer}>
            {/* Email Input Method */}
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              style={styles.animatedViewEmail}>
              <AppInput
                control={control}
                name="email"
                rules={{required: true}}
                placeholder="Your Email"
                style={styles.input}
              />
              {errors.email && <AppText>{errors.email.message}</AppText>}
              <MaterialCommunityIcons
                name="email"
                size={24}
                color={theme.colors.text}
                style={styles.icon}
              />
            </Animated.View>
            {/* Password Input Field */}
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              style={styles.animatedViewPassword}>
              <AppInput
                control={control}
                name="password"
                rules={{required: true}}
                placeholder="Your Password"
                secureTextEntry
                style={styles.input}
              />
              {errors.password && <AppText>{errors.password.message}</AppText>}
              <MaterialCommunityIcons
                name="lock"
                size={24}
                color={theme.colors.text}
                style={styles.icon}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}>
              {/* Submit Button */}
              <PrimaryButton
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

const styles = StyleSheet.create({
  animatedViewPassword: {
    position: 'relative',
    width: '100%',
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
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkGray,
    paddingLeft: 48,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.input,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: 12,
    top: 12,
    opacity: 0.5,
  },
  registerLink: {
    color: colors.grannySmithApple,
  },
});
export default LogInScreen;
