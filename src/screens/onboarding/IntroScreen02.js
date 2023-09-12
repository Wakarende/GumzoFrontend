import {View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import PrimaryButton from '../../components/button/PrimaryButton';
import ScreenIndicators from '../../components/ScreenIndicators';
import {INTRO_SCREEN_02} from '../../utils/constants';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

//Local imports
import Artwork04 from '../../components/artworks/Artwork04';
import colors from '../../config/colors';
import BackArrow from '../../components/arrow/BackArrow';

const IntroScreen02 = ({navigation}) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.colors.card}]}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={styles.rowView}>
        <BackArrow
          onPress={() => navigation.replace('IntroScreen01')}
          style={styles.backArrow}
        />
      </Animated.View>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={styles.animatedView}>
        <Artwork04 width={300} height={300} />
      </Animated.View>
      <View style={styles.container}>
        <Animated.Text
          entering={FadeInDown.duration(1000).springify()}
          style={styles.title}>
          {INTRO_SCREEN_02.title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(1000).springify()}
          style={styles.description}>
          {INTRO_SCREEN_02.description}
        </Animated.Text>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}>
          <ScreenIndicators
            count={3}
            activeIndex={2}
            style={styles.screenIndicators}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={styles.centerView}>
          <PrimaryButton
            label="Next"
            onPress={() => navigation.replace('LogInScreen')}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  rowView: {
    paddingHorizontal: 24,
    paddingVertical: 34,
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
  },
  animatedView: {
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
  screenIndicators: {
    backgroundColor: colors.grannySmithApple,
  },
});

export default IntroScreen02;
