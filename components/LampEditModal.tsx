import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, PanResponder, View } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
} from "react-native-paper";
import { useUpdateLampMutation } from "../apis/apis";
const mapImage = require("../assets/부산대맵.png");

const LampEditModal = ({ visible, setVisible, lampData }: any) => {
  const [lampName, setLampName] = useState(lampData?.lampName);
  const [adjoiningPlace, setAdjoiningPlace] = useState(
    lampData?.adjoiningPlace
  );
  const [isNext, setIsNext] = useState(false);

  const imageRef = useRef<View>(null);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [marker, setMarker] = useState<React.ReactNode | null>(null);

  const { mutate: editLamp } = useUpdateLampMutation();

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
    editLamp(
      {
        lampId: lampData?._id,
        lampInfo: {
          lampName,
          location: clickCoordinates,
          adjoiningPlace,
        },
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

  useEffect(() => {
    if (!lampData) return;
    setMarker(
      <View
        style={{
          position: "absolute",
          top: lampData?.location.y,
          left: lampData?.location.x,
        }}
      >
        <IconButton icon="map-marker" size={50} iconColor={"dimgray"} />
      </View>
    );
    setLampName(lampData?.lampName);
  }, [lampData]);

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "#fff" }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Title style={{ fontSize: 16 }}>가로등 수정</Dialog.Title>
        {!isNext ? (
          <>
            <Dialog.Content>
              <TextInput
                style={{ marginBottom: 30 }}
                label="가로등명"
                value={lampName ?? lampData?.lampName}
                onChangeText={(text) => setLampName(text)}
              />
              {/* <TextInput
            label="인접한 장소"
            value={adjoiningPlace ?? lampData?.adjoiningPlace}
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
                수정
              </Button>
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </Portal>
  );
};

export default LampEditModal;
