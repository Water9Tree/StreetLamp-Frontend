import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";
import { notificationList } from "../apis/mock";
import { Subscription } from "expo-notifications";
import * as Notifications from "expo-notifications";

const Notification = ({ navigation }: any) => {
  //const [notification, setNotification] = useState<Notifications.Notification>();
  const [notificationList, setNotificationList] = useState<
    { title: string; body: string }[]
  >([]);
  const notificationListener = useRef<Subscription>();

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
