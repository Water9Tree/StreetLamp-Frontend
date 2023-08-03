import axios from "axios";
import React, { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

const LampAddModal = ({ visible, setVisible }: any) => {
  const [lampName, setLampName] = useState("");
  const [adjoiningPlace, setAdjoiningPlace] = useState("");

  const hideDialog = () => {
    axios
      .post("/lamps", {
        lampName,
        location: {
          x: 30,
          y: 200,
        },
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
        <Dialog.Title style={{ fontSize: 16 }}>가로등 추가</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={{ marginBottom: 30 }}
            label="가로등명"
            value={lampName}
            onChangeText={(text) => setLampName(text)}
          />
          <TextInput
            label="인접한 장소"
            value={adjoiningPlace}
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
            추가
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LampAddModal;
