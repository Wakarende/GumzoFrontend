import React, {useState, useRef} from 'react';
import {View, Animated, FlatList, StyleSheet} from 'react-native';

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

      <View style={styles.paginatorContainer}>
        <Paginator data={slides} scrollx={scrollx} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paginatorContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Onboarding;
