import React from "react";
import { Appbar } from "react-native-paper";

function MainHeaderBar({ navigation }: any) {
  return (
    <Appbar
      mode="center-aligned"
      style={{ marginTop: 15 }}
      safeAreaInsets={{ top: 20 }}
    >
      <Appbar.Content title="" />
      <Appbar.Action
        icon="bell-outline"
        onPress={() => navigation.navigate("Notification")}
      />
      <Appbar.Action
        icon="cog"
        onPress={() => navigation.navigate("Setting")}
      />
    </Appbar>
  );
}

export default MainHeaderBar;
