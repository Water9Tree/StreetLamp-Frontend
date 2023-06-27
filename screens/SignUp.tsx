import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";

function SignUp({ navigation }) {
  return (
    <View>
      <HeaderBar
        navigation={navigation}
        backScreen={"Start"}
        title={"회원가입"}
      />
    </View>
  );
}

export default SignUp;
