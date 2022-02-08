import React from "react";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import createBottomTabNavigator from "react-navigation/bottom-tabs";

const Stack = createBottomTabNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
