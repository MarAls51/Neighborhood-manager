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
import { useDispatch } from "react-redux";
import { fetchGroupUsers } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
let lastSnapshotTime = new Date();

const FlatListBasics = ({ navigation, user, users }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(null);
  useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .doc(user.group ? user.group : "user not logged")
      .get()
      .then((snapshot) => {
        setGroupName(snapshot.data().groupname);
      });
    firebase
      .firestore()
      .collection("groups")
      .doc(user.group)
      .collection("users")
      .onSnapshot(() => {
        let snapshotStartedTime = new Date();
        if (snapshotStartedTime - lastSnapshotTime < 8.64e7) {
          return;
        }
        lastSnapshotTime = snapshotStartedTime;
        dispatch(fetchGroupUsers(user.group));
      });
  }, []);
  if (users === null) {
    return <></>;
  }
  const Item = ({ title, profilePicture }) => (
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
      <Text style={{ fontStyle: "normal", fontSize: 30, top: 20 }}>
        {title}
      </Text>
      <Image
        source={{ uri: profilePicture }}
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          borderRadius: 100,
          right: 170,
          bottom: 30,
        }}
      ></Image>
    </View>
  );
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
            right: 80,
            top: 15,
          }}
        >
          Your Group
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
            navigation.navigate("messages");
          }}
        >
          <Text style={styles.text}>Enter Room</Text>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            style={{ left: 160, bottom: 16 }}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        extraData={users}
        renderItem={({ item }) => (
          <Item title={item.username} profilePicture={item.profilePictureUID} />
        )}
        keyExtractor={(item) => item.email}
      />
    </SafeAreaView>
  );
};

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
    backgroundColor: "#00bfff",
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
  users: store.userState.usersG,
});
export default connect(mapStateToProp)(FlatListBasics);
