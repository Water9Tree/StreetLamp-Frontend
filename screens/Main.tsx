import React, { useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { IconButton, SegmentedButtons, Text } from "react-native-paper";
import MapMarker from "../components/MapMarker";
import MainHeaderBar from "../components/MainHeaderBar";
import { useGetLampsQuery } from "../apis/apis";
import { LampStatus } from "../apis/dto";
const mapImage = require("../assets/부산대맵.png");

function Main({ navigation }: any) {
  const [status, setStatus] = useState("all");
  const [selectedLampId, setSelectedLampId] = useState<string>();

  const { data: lampInfos } = useGetLampsQuery({
    status: status === "all" ? null : (status as LampStatus),
  });

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
      <MainHeaderBar navigation={navigation} />
      <SegmentedButtons
        style={{ marginVertical: 20, marginHorizontal: 15, zIndex: 10 }}
        value={status}
        onValueChange={(value) => {
          // TODO 상태에 따른 API 받아오기
          setStatus(value);
        }}
        buttons={statusButtons}
      />
      <ImageBackground
        source={mapImage}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          height: 400 * (5 / 4),
          marginHorizontal: 15,
          position: "relative",
        }}
      >
        {lampInfos &&
          lampInfos.map((lampInfo: any) => {
            return (
              <MapMarker
                key={lampInfo._id}
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
