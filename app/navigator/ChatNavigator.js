import React,{  } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firstTimeChatScreen from '../screens/registration/firstTimeChatScreen';
import messages from '../screens/groupChat/messages'; 
import createGroup from '../screens/groupScreens/createGroup'
import CreateGroupProfile from "../screens/groupScreens/CreateGroupProfile";
import loginGroup from '../screens/groupScreens/loginGroup';
import contacts from '../screens/groupChat/contacts'
import { connect } from 'react-redux'

const Stack = createNativeStackNavigator();
export const chatNavigator = (props) => {
const users = props.user
if (!users)
{
  return null
}
return((users.group === null) ? 
  <Stack.Navigator>
    <Stack.Screen name = "firstTimeChatScreen" component = {firstTimeChatScreen} options = {{headerShown: false}} />
    <Stack.Screen name = "createGroup" component = {createGroup} options = {{headerShown: false}}/>
    <Stack.Screen name = "CreateGroupProfile" component={CreateGroupProfile} options = {{headerShown: false}}/>
    <Stack.Screen name = "loginGroup" component={loginGroup} options = {{headerShown: false}}/>
    <Stack.Screen name = "messages" component = {messages} options = {{headerShown: false}}/>
    <Stack.Screen name = "contacts" component = {contacts} options = {{headerShown: false}}/>
  </Stack.Navigator> 
  : 
  <Stack.Navigator>
  <Stack.Screen name = "contacts" component = {contacts} options = {{headerShown: false}}/>
  <Stack.Screen name = "messages" component = {messages} options = {{headerShown: false}}/>
  </Stack.Navigator>)
  }

const mapStateToProp = (store) => ({
  user: store.userState.currentUser
})

export default connect(mapStateToProp)(chatNavigator);
