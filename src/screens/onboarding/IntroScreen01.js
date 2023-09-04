import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Artwork02 from '../../components/artworks/Artwork02';
import {useTheme} from '@react-navigation/native';
import ScreenIndicators from '../../components/ScreenIndicators';
import PrimaryButton from '../../components/button/PrimaryButton';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Local imports
import colors from '../../config/colors';
import {INTRO_SCREEN_01} from '../../utils/constants';
import BackArrow from '../../components/BackArrow';

const IntroScreen01 = ({navigation}) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.colors.card}]}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={styles.rowView}>
        <BackArrow onPress={() => navigation.replace('IntroScreen')} />
      </Animated.View>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={styles.animatedView}>
        <Artwork02 width={300} height={300} />
      </Animated.View>
      <View style={styles.container}>
        <Animated.Text
          entering={FadeInDown.duration(1000).springify()}
          style={styles.title}>
          {INTRO_SCREEN_01.title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(1000).springify()}
          style={styles.description}>
          {INTRO_SCREEN_01.description}
        </Animated.Text>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}>
          <ScreenIndicators count={3} activeIndex={1} />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={styles.center}>
          <PrimaryButton
            label="Next"
            onPress={() => navigation.replace('IntroScreen02')}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  animatedView: {
    paddingHorizontal: 24,
    paddingVertical: 34,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.darkGray,
  },
  description: {
    opacity: 0.5,
    marginTop: 16,
    fontSize: 16,
    color: colors.lightGray,
  },
  center: {
    alignItems: 'center',
  },
});

export default IntroScreen01;
