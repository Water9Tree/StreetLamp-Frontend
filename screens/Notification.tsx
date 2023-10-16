import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, List, Switch } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";
import { notificationList } from "../apis/mock";
import { Subscription } from "expo-notifications";
import * as Notifications from "expo-notifications";
import PushConfirmModal from "./PushConfirmModal";
import { useSetNotificationMutation } from "../apis/apis";

const Notification = ({ navigation }: any) => {
  //const [notification, setNotification] = useState<Notifications.Notification>();
  const [notificationList, setNotificationList] = useState<
    { title: string; body: string }[]
  >([]);
  const notificationListener = useRef<Subscription>();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: setNotification } = useSetNotificationMutation();

  const onToggleSwitch = () => {
    if (!isSwitchOn) {
      setIsSwitchOn(true);
      setNotification({ isNotificationEnabled: true });
      return;
    }
    setShowDeleteModal(true);
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        if (
          notification?.request?.content?.title &&
          notification?.request?.content?.body
        ) {
          setNotificationList((prev) => [
            ...prev,
            {
              title: String(notification.request.content.title),
              body: String(notification.request.content.body),
            },
          ]);
        }
      });
  }, [notificationListener]);

  console.log();

  return (
    <ScrollView style={styles.container}>
      <HeaderBar navigation={navigation} backScreen={"Main"} title={"알림"} />
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 15,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>앱 푸시</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      <List.Section style={{ marginVertical: 20 }}>
        {notificationList.map((noti, index) => (
          <List.Item
            style={{
              backgroundColor: "beige",
              height: 60,
              paddingHorizontal: 15,
            }}
            titleStyle={{
              fontSize: 18,
            }}
            key={index}
            title={noti.title}
            description={noti.body}
            left={() => <List.Icon color={"crimson"} icon="bell-outline" />}
          />
        ))}
      </List.Section>
      <PushConfirmModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
        setIsSwitchOn={setIsSwitchOn}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Notification;
