import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";
import { useSignInMutation } from "../apis/apis";

function SignIn({ navigation }: any) {
  const [id, setId] = useState({ value: "", error: "" });
  const [pw, setPw] = useState({ value: "", error: "" });
  const [pwSecureTextEntry, setPwSecureTextEntry] = useState(true);
  const pwRef = useRef<any>(null);

  const { mutate: signIn } = useSignInMutation();

  const handleSubmitButtonPress = () => {
    const isInValid = false; // TODO 유효성 검사

    if (isInValid) return;

    signIn(
      {
        loginId: id.value,
        password: pw.value,
        expoToken: "",
      },
      {
        onSuccess: () => {
          navigation.navigate("Main");
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        navigation={navigation}
        backScreen={"Start"}
        title={"로그인"}
      />
      <View style={{ padding: 25, marginTop: 40 }}>
        <View>
          <TextInput
            label="아이디"
            returnKeyType="next"
            value={id.value}
            onChangeText={(text) => setId({ value: text, error: "" })}
            onSubmitEditing={() => {
              pwRef.current.focus();
            }}
            error={Boolean(id.error)}
          />
          <HelperText type="error" visible={Boolean(id.error)}>
            {id.error}
          </HelperText>
        </View>
        <View>
          <TextInput
            ref={pwRef}
            label="비밀번호"
            returnKeyType="done"
            value={pw.value}
            onChangeText={(text) => setPw({ value: text, error: "" })}
            onSubmitEditing={handleSubmitButtonPress}
            error={Boolean(pw.error)}
            secureTextEntry={pwSecureTextEntry}
            right={
              <TextInput.Icon
                icon={pwSecureTextEntry ? "eye-off" : "eye"}
                onPress={() => {
                  setPwSecureTextEntry((prev) => !prev);
                }}
              />
            }
          />
          <HelperText type="error" visible={Boolean(pw.error)}>
            {pw.error}
          </HelperText>
        </View>
        <Button mode="contained" onPress={handleSubmitButtonPress}>
          확인
        </Button>
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

export default SignIn;
