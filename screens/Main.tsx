import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
const mapImage = require("../assets/부산대맵.png");

function Main() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={mapImage}
        resizeMode="contain"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Main;
