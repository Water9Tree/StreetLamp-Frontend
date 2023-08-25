import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./screens/Start";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Main from "./screens/Main";
import Notification from "./screens/Notification";
import Setting from "./screens/Setting";
import axios from "axios";
import { API_URL } from "@env";
import { QueryClient, QueryClientProvider } from "react-query";

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 10000;

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Start"
          >
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Setting" component={Setting} />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
