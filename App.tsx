import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./screens/Start";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Start"
        >
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
