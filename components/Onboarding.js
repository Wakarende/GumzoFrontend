import React, {useState, useRef} from 'react';
import {Screen} from './Screen';
import AppText from './AppText';
// import {FlatList} from 'react-native-gesture-handler';
import {View, Animated, FlatList} from 'react-native';

//local imports
import slides from '../slides';
import OnboardingItem from './OnboardingItem';
import {forHorizontalIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

function Onboarding(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollx = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View>
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
  );
}

export default Onboarding;
