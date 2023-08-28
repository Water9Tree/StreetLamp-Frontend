import * as React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { Badge, IconButton } from "react-native-paper";
import { LampInfo } from "../apis/dto";

interface MapMarkerProps {
  lampInfo: LampInfo;
  selectedLampId?: string;
  setSelectedLampId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const MapMarker = ({
  lampInfo,
  selectedLampId,
  setSelectedLampId,
}: MapMarkerProps) => {
  enum statusColor {
    "light" = "yellow",
    "normal" = "darkgray",
    "dark" = "gray",
  }

  return (
    <View
      style={{
        position: "absolute",
        top: lampInfo.location.y * (5 / 4) + 16,
        left: lampInfo.location.x * (5 / 4) + 6,
      }}
    >
      <TouchableOpacity
        hitSlop={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
        onPress={() => setSelectedLampId(lampInfo._id)}
      >
        <IconButton
          icon="map-marker"
          size={50}
          iconColor={
            selectedLampId === lampInfo._id ? "indigo" : "mediumslateblue"
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
