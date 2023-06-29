import React, { useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { darkLampInfos, lampInfos, lightLampInfos } from "../apis/mock";
import MapMarker from "../components/MapMarker";
const mapImage = require("../assets/부산대맵.png");

function Main() {
  const [status, setStatus] = useState("all");
  const [selectedLampId, setSelectedLampId] = useState<number>();

  const statusButtons = [
    {
      value: "all",
      label: "전체",
    },
    {
      value: "light",
      label: "밝음",
    },
    {
      value: "dark",
      label: "어두움",
    },
  ];

  return (
    <View style={styles.container}>
      <SegmentedButtons
        style={{ top: 60, zIndex: 10 }}
        value={status}
        onValueChange={(value) => {
          // TODO 상태에 따른 API 받아오기
          setStatus(value);
        }}
        buttons={statusButtons}
      />
      <ImageBackground
        source={mapImage}
        resizeMode="contain"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {status === "all" &&
          lampInfos.map((lampInfo) => {
            return (
              <MapMarker
                key={lampInfo.lampId}
                lampInfo={lampInfo}
                selectedLampId={selectedLampId}
                setSelectedLampId={setSelectedLampId}
              />
            );
          })}
        {status === "light" &&
          lightLampInfos.map((lampInfo) => {
            return (
              <MapMarker
                key={lampInfo.lampId}
                lampInfo={lampInfo}
                selectedLampId={selectedLampId}
                setSelectedLampId={setSelectedLampId}
              />
            );
          })}
        {status === "dark" &&
          darkLampInfos.map((lampInfo) => {
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
