import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

function SignUp({ navigation }) {
  return (
    <View>
      <Appbar mode="center-aligned" safeAreaInsets={{ top: 20 }}>
        <Appbar.BackAction onPress={() => navigation.navigate("Start")} />
        <Appbar.Content title="회원가입" />
      </Appbar>
    </View>
  );
}

export default SignUp;
