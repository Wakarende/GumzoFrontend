//Third-party imports
import React from "react";
import Constants from "expo-constants"; // Provides system information such as the status bar height
import { SafeAreaView, StyleSheet } from "react-native"; // SafeAreaView is a UI component to render content within the safe area boundaries of a device,
import { View } from "react-native";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

//StyleSheet for creating styles
const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
