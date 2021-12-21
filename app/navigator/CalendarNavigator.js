import React,{  } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import noGroup from '../screens/noGroup/noGroup';
import eventScreen from '../screens/EventScreens/eventScreen';
import createEvent from '../screens/EventScreens/createEvent';
import { connect } from 'react-redux'
const Stack = createNativeStackNavigator();
export const chatNavigator = (props) => {
{
  const users = props.user
return((users.group === null) ? 
  <Stack.Navigator>
    <Stack.Screen name = "noGroup" component = {noGroup} options = {{headerShown: false}} />
  </Stack.Navigator> 
  : 
  <Stack.Navigator>
  <Stack.Screen name = "eventScreen" component = {eventScreen} options = {{headerShown: false}} />
  <Stack.Screen name = "createEvent" component = {createEvent} options = {{headerShown: false}} />
  </Stack.Navigator>)
}
}

const mapStateToProp = (store) => ({
  user: store.userState.currentUser
})

export default connect(mapStateToProp)(chatNavigator);