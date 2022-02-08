import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./ChatNavigator";
import ProfileScreen from "./AccountNavigator";
import CalendarScreen from "./CalendarNavigator";
import ListingScreen from "./ListingNavigator";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import navColors from "../const/colors";

// Testing out class based components
const Tab = createBottomTabNavigator();
export class main extends Component {
  constructor(props) {
    super(props);
    this.state = { group: null };
  }

  async componentDidMount() {
    let groupID = firebase
      .firestore()
      .collection("users")
      .doc(
        firebase.auth().currentUser
          ? firebase.auth().currentUser.uid
          : "user not logged"
      )
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          this.setState({ group: snapshot.data().group });
        } else {
          console.log("does not exist");
        }
      });
  }
  render() {
    return this.state.group === undefined ? (
      <></>
    ) : (
      <Tab.Navigator
        screenOptions={{
          justifyContent: "center",
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "black",
          tabBarAllowFontScaling: 10,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            padding: 5,
            backgroundColor: "white",
          },
        }}
      >
        <Tab.Screen
          name="chatScreen"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "account-group" : "account-group-outline"}
                focused={focused}
                color={
                  focused
                    ? navColors.chatColors.ACTIVE_TAB_COLOR
                    : navColors.chatColors.INACTIVE_TAB_COLOR
                }
                size={35}
              ></MaterialCommunityIcons>
            ),
          }}
        >
          {(props) => <ChatScreen {...props} group={this.state.group} />}
        </Tab.Screen>

        <Tab.Screen
          name="calendarScreen"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="calendar"
                focused={focused}
                color={
                  focused
                    ? navColors.calendarColors.ACTIVE_TAB_COLOR
                    : navColors.calendarColors.INACTIVE_TAB_COLOR
                }
                size={35}
              ></AntDesign>
            ),
          }}
        >
          {(props) => <CalendarScreen {...props} group={this.state.group} />}
        </Tab.Screen>
        <Tab.Screen
          name="listingScreen"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <EvilIcons
                name="location"
                focused={focused}
                color={
                  focused
                    ? navColors.listingColors.ACTIVE_TAB_COLOR
                    : navColors.listingColors.INACTIVE_TAB_COLOR
                }
                size={50}
              ></EvilIcons>
            ),
          }}
        >
          {(props) => <ListingScreen {...props} group={this.state.group} />}
        </Tab.Screen>
        <Tab.Screen
          name="profileScreen"
          options={{
            tabBarIcon: ({ color, size, focused, activeTintColor }) => (
              <AntDesign
                name="setting"
                focused={focused}
                color={
                  focused
                    ? navColors.profileColors.ACTIVE_TAB_COLOR
                    : navColors.profileColors.INACTIVE_TAB_COLOR
                }
                size={35}
              ></AntDesign>
            ),
          }}
        >
          {(props) => <ProfileScreen {...props} group={this.state.group} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}

export default main;
