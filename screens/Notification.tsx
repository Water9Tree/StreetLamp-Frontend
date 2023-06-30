import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";
import { notificationList } from "../apis/mock";

const Notification = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} backScreen={"Main"} title={"알림"} />
      <List.Section style={{ marginVertical: 20 }}>
        {notificationList.map((notification) => (
          <List.Item
            style={{
              backgroundColor: notification.isNotRead ? "beige" : "white",
              height: 60,
              paddingHorizontal: 15,
            }}
            titleStyle={{
              fontSize: 18,
            }}
            key={notification.id}
            title={notification.content}
            left={() => (
              <List.Icon
                color={notification.isNotRead ? "crimson" : ""}
                icon="bell-outline"
              />
            )}
          />
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Notification;
