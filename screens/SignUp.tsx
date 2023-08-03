import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Checkbox,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import HeaderBar from "../components/HeaderBar";

function SignUp({ navigation }: any) {
  const [id, setId] = useState({ value: "", error: "" });
  const [pw, setPw] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [code, setCode] = useState({ value: "", error: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [pwSecureTextEntry, setPwSecureTextEntry] = useState(true);
  const pwRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const codeRef = useRef<any>(null);

  const handleSubmitButtonPress = () => {
    const isInValid = false; // TODO 유효성 검사

    if (isInValid) return;

    navigation.navigate("SignIn");
  };

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
            returnKeyType="next"
            value={pw.value}
            onChangeText={(text) => setPw({ value: text, error: "" })}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
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
        <View>
          <TextInput
            ref={emailRef}
            label="이메일"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            onSubmitEditing={() => {
              codeRef.current.focus();
            }}
            error={Boolean(email.error)}
          />
          <HelperText type="error" visible={Boolean(email.error)}>
            {email.error}
          </HelperText>
        </View>
        <View>
          <TextInput
            ref={codeRef}
            label="닉네임"
            returnKeyType="done"
            value={code.value}
            onChangeText={(text) => setCode({ value: text, error: "" })}
            onSubmitEditing={handleSubmitButtonPress}
            error={Boolean(code.error)}
          />
          <HelperText type="error" visible={Boolean(code.error)}>
            {code.error}
          </HelperText>
        </View>
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>관리자</Text>
          <Checkbox
            status={isAdmin ? "checked" : "unchecked"}
            onPress={() => {
              setIsAdmin((prev) => !prev);
            }}
          />
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

export default SignUp;
