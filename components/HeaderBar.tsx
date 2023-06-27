import React from "react";
import { Appbar } from "react-native-paper";

function HeaderBar({ navigation, backScreen, title }) {
  return (
    <Appbar mode="center-aligned" safeAreaInsets={{ top: 20 }}>
      <Appbar.BackAction onPress={() => navigation.navigate(backScreen)} />
      <Appbar.Content title={title} />
    </Appbar>
  );
}

export default HeaderBar;
