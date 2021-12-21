import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/registration/LoginScreen";
import WelcomeScreen from "../screens/registration/WelcomeScreen";
import RegisterScreen from "../screens/registration/RegisterScreen";
import firstTimeRegister from '../screens/registration/firstTimeRegister';
import mainScreen from '../navigator/main';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => 
(
<Stack.Navigator>
<Stack.Screen name = "WelcomeScreen" component = {WelcomeScreen} options = {{headerShown: false}} />
<Stack.Screen name = "LoginScreen" component = {LoginScreen} options = {{headerShown: false}}/>
<Stack.Screen name = "RegisterScreen" component = {RegisterScreen} options = {{headerShown: false}} />
<Stack.Screen name = "firstTimeRegister" component = {firstTimeRegister} options = {{headerShown: false}}/>
<Stack.Screen name = "mainScreen" component = {mainScreen} options = {{headerShown: false}} />
</Stack.Navigator>
)

export default AuthNavigator;