//Third-party imports
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";

//Local imports
import defaultStyles from "../config/styles";
function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.lightGray}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[defaultStyles.text, styles.textInput]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    // marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    margin: 10,
  },
  textInput: {
    flex: 1,
    // borderWidth: 1,
  },
});

export default AppTextInput;
