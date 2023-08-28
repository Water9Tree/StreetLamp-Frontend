import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
} from "react-native-paper";
import { useCreateLampMutation } from "../apis/apis";
import { ImageBackground, PanResponder, View } from "react-native";
const mapImage = require("../assets/부산대맵.png");

const LampAddModal = ({ visible, setVisible }: any) => {
  const [lampName, setLampName] = useState("");
  const [adjoiningPlace, setAdjoiningPlace] = useState();
  const [isNext, setIsNext] = useState(false);

  const { mutate: createLamp } = useCreateLampMutation();
  const imageRef = useRef<View>(null);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [marker, setMarker] = useState<React.ReactNode | null>(null);

  const handlePress = (event: any) => {
    event.persist(); // Preserve the event
    if (imageRef.current) {
      imageRef.current.measure((fx, fy, width, height, px, py) => {
        const x = event.nativeEvent.pageX - px;
        const y = event.nativeEvent.pageY - py;
        setClickCoordinates({ x: x - 50, y: y - 50 });
        console.log(x, y);
        setMarker(
          <View
            style={{
              position: "absolute",
              top: y - 50,
              left: x - 50,
            }}
          >
            <IconButton
              icon="map-marker"
              size={50}
              iconColor={"gray"}
              disabled
            />
          </View>
        );
      });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        handlePress(evt);
      },
    })
  ).current;

  const hideDialog = () => {
    createLamp(
      {
        lampName,
        location: clickCoordinates,
        adjoiningPlace,
      },
      {
        onSuccess: () => {
          setVisible(false);
        },
      }
    );
  };
  const hideDialog2 = () => {
    setVisible(false);
    setIsNext(false);
  };

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "#fff" }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Title style={{ fontSize: 16 }}>가로등 추가</Dialog.Title>
        {!isNext ? (
          <>
            <Dialog.Content>
              <TextInput
                style={{ marginBottom: 30 }}
                label="가로등명"
                onChangeText={(text) => setLampName(text)}
              />
              {/* <TextInput
            label="인접한 장소"
            onChangeText={(text) => setAdjoiningPlace(text)}
          /> */}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog2}>취소</Button>
              <Button
                onPress={() => {
                  setIsNext(true);
                }}
                mode="contained"
                style={{ paddingHorizontal: 6 }}
              >
                다음
              </Button>
            </Dialog.Actions>
          </>
        ) : (
          <>
            <Dialog.Content>
              <View
                {...panResponder.panHandlers}
                ref={imageRef}
                collapsable={false}
              >
                <ImageBackground
                  source={mapImage}
                  resizeMode="cover"
                  style={{ position: "relative", height: 400 }}
                >
                  {marker}
                </ImageBackground>
              </View>
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
          </>
        )}
      </Dialog>
    </Portal>
  );
};

export default LampAddModal;
