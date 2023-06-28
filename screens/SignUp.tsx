import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import HeaderBar from "../components/HeaderBar";

function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar
        navigation={navigation}
        backScreen={"Start"}
        title={"회원가입"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default SignUp;
