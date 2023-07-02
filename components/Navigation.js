import React from "react";
import { StyleSheet } from "react-native";
import Screen from "./Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Navigation(props) {
  return (
    <Screen>
      <MaterialCommunityIcons name="home-outline" size={30} />
      <MaterialCommunityIcons name="chat-outline" size={30} />
      <MaterialCommunityIcons name="handshake-outline" size={30} />
      <MaterialCommunityIcons name="account-outline" size={30} />
    </Screen>
  );
}

const styles = StyleSheet.create({});
export default Navigation;
