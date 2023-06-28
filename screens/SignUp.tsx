import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";

function SignUp({ navigation }) {
  const [id, setId] = useState({ value: "", error: "" });
  const [pw, setPw] = useState({ value: "", error: "" });

  return (
    <View style={styles.container}>
      <HeaderBar
        navigation={navigation}
        backScreen={"Start"}
        title={"회원가입"}
      />
      <View style={{ padding: 25, marginTop: 40 }}>
        <View>
          <TextInput
            label="아이디"
            returnKeyType="next"
            value={id.value}
            onChangeText={(text) => setId({ value: text, error: "" })}
            error={Boolean(id.error)}
          />
          <HelperText type="error" visible={Boolean(id.error)}>
            {id.error}
          </HelperText>
        </View>
        <View>
          <TextInput
            label="비밀번호"
            returnKeyType="done"
            value={pw.value}
            onChangeText={(text) => setPw({ value: text, error: "" })}
            error={Boolean(pw.error)}
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
          />
          <HelperText type="error" visible={Boolean(pw.error)}>
            {pw.error}
          </HelperText>
        </View>
      </View>
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
