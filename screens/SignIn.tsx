import React, { useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";
import { useSignInMutation } from "../apis/apis";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function SignIn({ navigation }: any) {
  const [id, setId] = useState({ value: "", error: "" });
  const [pw, setPw] = useState({ value: "", error: "" });
  const [pwSecureTextEntry, setPwSecureTextEntry] = useState(true);
  const pwRef = useRef<any>(null);

  const { mutate: signIn } = useSignInMutation();

  const handleSubmitButtonPress = () => {
    const isInValid = false; // TODO 유효성 검사

    if (isInValid) return;
    registerForPushNotificationsAsync().then((token) => {
      if (!token) return;
      console.log(token);
      signIn(
        {
          loginId: id.value,
          password: pw.value,
          expoToken: token,
        },
        {
          onSuccess: () => {
            navigation.navigate("Main");
          },
        }
      );
    });
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "3cea164c-9ab8-4864-8f69-9da259f778c7",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
