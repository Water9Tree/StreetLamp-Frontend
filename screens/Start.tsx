import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

function Start({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          marginTop: -30,
        }}
      >
        <Icon
          color="indigo"
          size={70}
          source="floor-lamp-torchiere-outline"
        ></Icon>
        <Text
          style={{ color: "indigo", fontWeight: "700" }}
          variant="headlineLarge"
        >
          PNU 가로등
        </Text>
      </View>
      <Text variant="titleLarge">모니터링 서비스</Text>
      <View
        style={{
          position: "absolute",
          bottom: 160,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          style={{ marginRight: 10 }}
          labelStyle={{ fontSize: 16 }}
          mode="outlined"
          onPress={() => navigation.navigate("SignUp")}
        >
          회원가입
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate("SignIn")}
        >
          로그인
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Start;
