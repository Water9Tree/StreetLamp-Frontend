import React, { useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { lampInfos } from "../apis/mock";
import MapMarker from "../components/MapMarker";
const mapImage = require("../assets/부산대맵.png");

function Main() {
  const [selectedLampId, setSelectedLampId] = useState<number>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={mapImage}
        resizeMode="contain"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {lampInfos.map((lampInfo) => {
          return (
            <MapMarker
              key={lampInfo.lampId}
              lampInfo={lampInfo}
              selectedLampId={selectedLampId}
              setSelectedLampId={setSelectedLampId}
            />
          );
        })}
      </ImageBackground>
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
