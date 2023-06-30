import React from "react";
import { Appbar } from "react-native-paper";

function HeaderBar({ navigation, backScreen, title }: any) {
  return (
    <Appbar
      mode="center-aligned"
      style={{ marginTop: 15 }}
      safeAreaInsets={{ top: 30 }}
    >
      <Appbar.BackAction onPress={() => navigation.navigate(backScreen)} />
      <Appbar.Content title={title} />
    </Appbar>
  );
}

export default HeaderBar;
