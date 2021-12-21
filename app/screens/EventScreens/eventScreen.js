import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { fetchGroupEvents } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
let lastSnapshotTime = new Date();
const FlatListBasics = ({ navigation, user, eventsItem }) => {
    const dispatch = useDispatch()
   useEffect(() => {
   firebase
   .firestore()
   .collection("groups")
   .doc(user.group)
   .collection("events")
   .onSnapshot(() => {
     let snapshotStartedTime = new Date();
     if (snapshotStartedTime - lastSnapshotTime < 3000) {
       return;
     }
     lastSnapshotTime = snapshotStartedTime;
     dispatch(fetchGroupEvents(user.group));
   });
}, []);
  const Item = ({ title, info }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "lightgrey",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        height: 90,
        width: "100%",
      }}
    >
      <Text style={{ fontStyle: "normal", fontSize: 40, top: 20 }}>
        {title}
      </Text>
      <Text style={{ fontStyle: "normal", fontSize: 20, top: 20 }}>
        {info}
      </Text>
    </View>
  );
  if (eventsItem === null) {
    return (
        <View style = {{alignItems: 'center',flex: 1,backgroundColor: "lightgreen"}}>
            <View style = {{width : "100%",height : 180, alignItems: "center",justifyContent: 'center', fontWeight : 30,flex: 1}}>
            <Text  iterationCount="infinite" style = {{padding: 20, fontStyle: 'italic',fontSize: 40, bottom: 55, fontWeight: 'bold', top: 20}}>Events</Text>
        </View>
            <View style = {{flex: 3, backgroundColor: "#fff",alignItems: "center",borderTopLeftRadius: 10, borderTopRightRadius: 10, width: '100%'}}>
                <Text animation = "shake" style = {{fontSize: 40,fontStyle:'italic',top: 230}}>
                    No Current Events
                </Text>
            </View>
        </View>
            )}
  else 
  {
  return (
<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#fff",
          height: 90,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 40,
            fontWeight: "bold",
            right: 60,
            top: 15,
          }}
        >
          Group Events
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#fff",
          height: 90,
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            navigation.navigate("createEvent");
          }}
        >
          <Text style={styles.text}>Create Event</Text>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            style={{ left: 165, bottom: 16 }}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={eventsItem}
        renderItem={({ item }) => <Item title={item.title} info={item.info} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  registerButton: {
    width: "94%",
    borderRadius: 30,
    height: 70,
    backgroundColor: "lightgreen",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    right: 100,
    top: 15,
  },
});

const mapStateToProp = (store) => ({
  user: store.userState.currentUser,
  eventsItem: store.userState.events,
});

export default connect(mapStateToProp)(FlatListBasics);
