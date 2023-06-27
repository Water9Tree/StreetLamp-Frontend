import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

function Start() {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Icon size={70} source="floor-lamp-torchiere-outline"></Icon>
        <Text variant="displaySmall">PNU</Text>
      </View>
      <Text variant="headlineMedium">가로등 모니터링 서비스</Text>
      <View
        style={{
          position: "absolute",
          bottom: 130,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          style={{ marginRight: 10 }}
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          회원가입
        </Button>
        <Button mode="contained-tonal" onPress={() => console.log("Pressed")}>
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
