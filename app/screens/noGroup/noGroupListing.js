import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function chatscreen() {
  return (
    <View style={{ alignItems: "center", flex: 1, backgroundColor: "plum" }}>
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
        <Text
          iterationCount="infinite"
          style={{
            padding: 20,
            fontStyle: "italic",
            fontSize: 40,
            bottom: 55,
            fontWeight: "bold",
            top: 20,
          }}
        >
          Join Group
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "#fff",
          alignItems: "center",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: "100%",
        }}
      >
        <Animatable.Text
          animation="shake"
          style={{ fontSize: 40, fontStyle: "italic", top: 230 }}
        >
          You are not in a group
        </Animatable.Text>
      </View>
    </View>
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
  registerButton: {
    width: "65%",
    height: 100,
    backgroundColor: "#00bfff",
    alignItems: "center",
    padding: 10,
    marginVertical: 40,
    top: 120,
    borderRadius: 30,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    fontStyle: "italic",
    top: 30,
    position: "absolute",
  },
});
