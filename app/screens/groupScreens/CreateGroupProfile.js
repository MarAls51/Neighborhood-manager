import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import { fetchUser } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
export function firstTimeRegister({ route }) {
  const dispatch = useDispatch();
  let uid = route.params.group;
  const [image, setImage] = useState(null);
  useEffect(() => {
    info();
    async function info() {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Settings");
      }
    }
  }, []);
  const PickImage = async ({ navigation }) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      const profilePictureUID = result.uri;
      firebase.firestore().collection("groups").doc(uid).update({
        profilePictureUID,
      });
      dispatch(fetchUser());
    }
  };
  return (
    <View style={{ alignItems: "center", flex: 1, backgroundColor: "#ffff00" }}>
      <View
        style={{
          width: "100%",
          height: 180,
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 30,
          flex: 1,
        }}
      >
        <Animatable.Image
          animation="bounce"
          style={styles.logo}
          source={require("../../assets/logo1.png")}
        />
        <Text
          style={{
            padding: 20,
            fontStyle: "italic",
            fontSize: 30,
            bottom: 55,
            fontWeight: "bold",
          }}
        >
          Set Group Photo
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          width: "100%",
          paddingVertical: 50,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: 300,
            height: 300,
            backgroundColor: "#d3d3d3",
            alignItems: "center",
            top: 60,
            left: 60,
            borderRadius: 40,
          }}
          onPress={PickImage}
        >
          <Image
            source={require("../../assets/pic.png")}
            style={{ top: 80, height: 120, width: 120, resizeMode: "contain" }}
          ></Image>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                alignItems: "center",
                width: 300,
                height: 300,
                backgroundColor: "#d3d3d3",
                alignItems: "center",
                borderRadius: 40,
                bottom: 120,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerButton: {
    width: "100%",
    height: 90,
    backgroundColor: "#00bfff",
    alignItems: "center",
    top: 550,
    position: "absolute",
  },
  text: {
    color: "#fff",
    fontSize: 40,
    fontStyle: "italic",
    top: 15,
  },
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

export default connect(mapStateToProp)(firstTimeRegister);
