import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function Screen({children, style}) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.screen, {paddingTop: insets.top}]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
