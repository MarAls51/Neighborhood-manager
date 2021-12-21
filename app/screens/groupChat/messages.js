import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { StyleSheet, Text, View, Image,SafeAreaView} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { auth } from "../firebase/firebase";
import firebase from "firebase";
import { connect } from "react-redux";
export function chatscreen(props) {
  const users = props.user;
  if (!users) {
    return null;
  }
  let uid = users.group;
  const [groupPhoto, setGroupPhoto] = useState(null)
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .doc(uid)
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    firebase.firestore().collection("groups").doc(uid).collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
  const [profileName, setProfileName] = useState(null);
  firebase
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
        setProfileName(snapshot.data().username);
      } else {
        console.log("does not exist");
      }
    });
  const [profileAvatar, setProfileAvatar] = useState(null);
  firebase
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
        setProfileAvatar(snapshot.data().profilePictureUID);
      } else {
        console.log("does not exist");
      }
    });
  firebase
    .firestore()
    .collection("groups")
    .doc(users.group ? users.group : "user not logged")
    .get()
    .then((snapshot) => {
      setGroupPhoto(snapshot.data().profilePictureUID);
    });
    //<Image source = {{uri: groupPhoto}}style={{backgroundColor: 'blue' }}></Image>
  return (
<SafeAreaView style = {{alignItems: 'center',flex: 1,backgroundColor: "#fff"}}>
    <View style = {{width : "100%",height : 180,justifyContent: 'center', fontWeight : 30,flex: 1}}>
    <Image source = {{uri: groupPhoto}}style={{padding: 20, width: "100%", height: 230, top: 20}}></Image>
</View>
    <View style = {{flex: 3, backgroundColor: "#fff",borderTopLeftRadius: 45, borderTopRightRadius: 45, width: '100%'}}>
    <GiftedChat
          messages={messages}
          renderUsernameOnMessage={true}
          onSend={(messages) => onSend(messages)}
          showAvatarForEveryMessage={true}
          showUserAvatar={true}
          user={{
            name: profileName,
            _id: auth?.currentUser?.email,
            avatar: profileAvatar,
          }}
        />
    </View>
</SafeAreaView>
  );
}


const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
    alignItems: "center",
    resizeMode: "contain",
    top: 90,
  },
});

const mapStateToProp = (store) => ({
  user: store.userState.currentUser,
});

export default connect(mapStateToProp)(chatscreen);
