import React from 'react';
import {View, StyleSheet, Text, Image, useWindowDimensions} from 'react-native';
import slides from '../slides';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';

// const Onboarding = () => {
//   // Use the useWindowDimensions hook
//   const {width, height} = useWindowDimensions();

//   const _renderItem = ({item}) => {
//     return (
//       <View style={styles.slide}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Image
//           source={item.image}
//           style={{width, height: height * 0.6, resizeMode: 'contain'}}
//         />
//         <Text style={styles.text}>{item.description}</Text>
//       </View>
//     );
//   };

//   const _renderNextButton = () => {
//     return (
//       <View style={styles.buttonCircle}>
//         <MaterialCommunityIcons
//           name="chevron-right"
//           color="rgba(255, 255, 255, .9)"
//           size={24}
//         />
//       </View>
//     );
//   };

//   const _renderDoneButton = () => {
//     return (
//       <View style={styles.buttonCircle}>
//         <MaterialCommunityIcons
//           name="checkbox-marked-circle-outline"
//           color="rgba(255, 255, 255, .9)"
//           size={24}
//         />
//       </View>
//     );
//   };

//   return (
//     <AppIntroSlider
//       data={slides}
//       renderItem={_renderItem}
//       renderDoneButton={_renderDoneButton}
//       renderNextButton={_renderNextButton}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   buttonCircle: {
//     width: 40,
//     height: 40,
//     backgroundColor: 'rgba(0, 0, 0, .2)',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'red',
//   },
// });

// export default Onboarding;

// import React from 'react';

function Onboarding(props) {
  return (
    <AppIntroSlider
      data={slides}
      renderItem={({item}) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
}

export default Onboarding;
