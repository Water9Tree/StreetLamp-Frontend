import axios from "axios";
import React, { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

const LampEditModal = ({ visible, setVisible, lampData }: any) => {
  const [lampName, setLampName] = useState(lampData?.lampName);
  const [adjoiningPlace, setAdjoiningPlace] = useState(
    lampData?.adjoiningPlace
  );

  const hideDialog = () => {
    axios
      .patch(`/lamps/${lampData.lampId}`, {
        lampName,
        adjoiningPlace,
      })
      .then(function (response) {
        console.log(response);
        setVisible(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const hideDialog2 = () => {
    setVisible(false);
  };
  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "#fff" }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Title style={{ fontSize: 16 }}>가로등 수정</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={{ marginBottom: 30 }}
            label="가로등명"
            value={lampName ?? lampData?.lampName}
            onChangeText={(text) => setLampName(text)}
          />
          <TextInput
            label="인접한 장소"
            value={adjoiningPlace ?? lampData?.adjoiningPlace}
            onChangeText={(text) => setAdjoiningPlace(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog2}>취소</Button>
          <Button
            onPress={hideDialog}
            mode="contained"
            style={{ paddingHorizontal: 6 }}
          >
            수정
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LampEditModal;
