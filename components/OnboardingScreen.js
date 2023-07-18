import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  //   const navigation = useNavigation();

  const DotComponent = ({selected}) => {
    return (
      <View
        className={`w-4 h-4 mx-1 flex items-center justify-center rounded-full ${
          selected ? 'border border-red-400' : ''
        }  p-2`}>
        <View
          className={`w-2 h-2 ${
            selected ? 'bg-red-400' : 'bg-red-200'
          } rounded-full`}></View>
      </View>
    );
  };

  return (
    <View>
      <Onboarding
        onSkip={() => console.log('Home')}
        onDone={() => console.log('Home')}
        DotComponent={DotComponent}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{uri: 'https://via.placeholder.com/1.png/0000/0000'}}
              />
            ),
            title: 'Happy Shopping',
            subtitle:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, voluptate!.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{uri: 'https://via.placeholder.com/1.png/0000/0000'}}
              />
            ),
            title: 'All you need in One PLace',
            subtitle:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, voluptate!.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{uri: 'https://via.placeholder.com/1.png/0000/0000'}}
              />
            ),
            title: 'Happy Sale, Happy Customer',
            subtitle:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, voluptate!.',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default OnboardingScreen;
