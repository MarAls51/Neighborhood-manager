import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firstTimeChatScreen from "../screens/registration/firstTimeChatScreen";
import chatTalk from "../screens/groupChat/messages";
const Stack = createNativeStackNavigator();
export const chatNavigator = (props) => {
  {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="firstTimeChatScreen"
          component={firstTimeChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chatTalk"
          component={chatTalk}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
};

export default chatNavigator;
