import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Dialog, Portal, Checkbox } from "react-native-paper";
import { useSetNotificationMutation } from "../apis/apis";

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const PushConfirmModal = ({
  visible,
  setVisible,
  setIsSwitchOn,
}: ModalProps) => {
  const hideDialog = () => setVisible(false);

  const { mutate: setNotification } = useSetNotificationMutation();

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "#fff" }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Title style={{ fontSize: 16 }}>
          알림을 끄시겠습니까?
        </Dialog.Title>
        <Dialog.Content>
          <Text>알림을 유지하면 가로등 상태 정보를 받을 수 있습니다.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>알림 유지</Button>
          <Button
            onPress={() => {
              setVisible(false);
              setIsSwitchOn(false);
              setNotification({ isNotificationEnabled: false });
            }}
            mode="contained"
            style={{ paddingHorizontal: 6 }}
          >
            끄기
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PushConfirmModal;
