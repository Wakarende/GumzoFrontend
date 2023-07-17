// import React, {useState, useRef} from 'react';
// import {View, Animated, FlatList, StyleSheet} from 'react-native';

// //local imports
// import slides from '../slides';
// import OnboardingItem from './OnboardingItem';
// import Paginator from './Paginator';
// import NextButton from './NextButton';

// function Onboarding(props) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const scrollx = useRef(new Animated.Value(0)).current;
//   const viewableItemsChanged = useRef(({viewableItems}) => {
//     setCurrentIndex(viewableItems[0].index);
//   }).current;
//   const slidesRef = useRef(null);
//   const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
//   return (
//     <View style={styles.container}>
//       <View style={{flex: 0.75}}>
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           bounces={false}
//           data={slides}
//           keyExtractor={item => item.id}
//           onScroll={Animated.event(
//             [{nativeEvent: {contentOffset: {x: scrollx}}}],
//             {useNativeDriver: false},
//           )}
//           onViewableItemsChanged={viewableItemsChanged}
//           viewabilityConfig={viewConfig}
//           scrollEventThrottle={32}
//           style={styles.listContainer}
//           ref={slidesRef}
//           renderItem={({item}) => <OnboardingItem item={item} />}
//         />
//       </View>
//       <View style={styles.paginatorContainer}>
//         <Paginator data={slides} scrollx={scrollx} />
//       </View>

//       <View style={styles.buttonContainer}>
//         <NextButton />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   paginatorContainer: {
//     // position: 'absolute',
//     // bottom: 50,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 0.1,
//   },
//   //   listContainer: {
//   //     flex: 0.8,
//   //   },
//   buttonContainer: {
//     padding: 16,
//     flex: 0.15,
//     justifyContent: 'flex-end',
//     marginBottom: 36,
//   },
// });

// export default Onboarding;
import React, {useState, useRef} from 'react';
import {View, Animated, FlatList, StyleSheet, Dimensions} from 'react-native';

//local imports
import slides from '../slides';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';

function Onboarding(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollx = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          data={slides}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollx}}}],
            {useNativeDriver: false},
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
          renderItem={({item}) => <OnboardingItem item={item} />}
        />
      </View>
      <View style={styles.paginatorContainer}>
        <Paginator data={slides} scrollx={scrollx} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    height: Dimensions.get('window').height * 0.75, // 75% of the screen height
  },
  paginatorContainer: {
    height: Dimensions.get('window').height * 0.25, // 25% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Onboarding;
