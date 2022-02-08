import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import noGroupListing from "../screens/noGroup/noGroupListing";
import { connect } from "react-redux";
import listing from "../screens/listingScreens/listingScreen";
import addNewListing from "../screens/listingScreens/addNewListing";
const Stack = createNativeStackNavigator();
export const chatNavigator = (props) => {
  users = props.user;
  {
    return users.group === null ? (
      <Stack.Navigator>
        <Stack.Screen
          name="noGroupListing"
          component={noGroupListing}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen
          name="listing"
          component={listing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addNewListing"
          component={addNewListing}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
};

const mapStateToProp = (store) => ({
  user: store.userState.currentUser,
});

export default connect(mapStateToProp)(chatNavigator);
