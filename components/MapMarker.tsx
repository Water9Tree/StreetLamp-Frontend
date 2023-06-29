import * as React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { Badge, IconButton } from "react-native-paper";
import { LampInfo } from "../apis/dto";

interface MapMarkerProps {
  lampInfo: LampInfo;
  selectedLampId?: number;
  setSelectedLampId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const MapMarker = ({
  lampInfo,
  selectedLampId,
  setSelectedLampId,
}: MapMarkerProps) => {
  const deviceWidth = Dimensions.get("window").width; // TODO 이미지 너비 기준으로 변경
  enum statusColor {
    "light" = "yellow",
    "dark" = "dimgray",
  }

  return (
    <View
      style={{
        position: "absolute",
        top: deviceWidth / lampInfo.location.y,
        left: deviceWidth / lampInfo.location.x,
      }}
    >
      <TouchableOpacity
        hitSlop={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
        onPress={() => setSelectedLampId(lampInfo.lampId)}
      >
        <IconButton
          icon="map-marker"
          size={50}
          iconColor={
            selectedLampId === lampInfo.lampId ? "indigo" : "mediumslateblue"
          }
        />
        <Badge
          style={{
            position: "absolute",
            top: 10,
            right: 15,
            backgroundColor: statusColor[lampInfo.status],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MapMarker;
