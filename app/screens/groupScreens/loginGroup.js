import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import AppTextInput from "../misc/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase/firebase";
import firebase from "firebase";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { fetchGroupUsers } from "../../redux/actions/actions";
import { fetchGroupListings } from "../../redux/actions/actions";
const validationSchema = Yup.object().shape({
  groupname: Yup.string().required().min(32).max(32),
});
export function firstTimeRegister({ navigation, user, usersG, listings }) {
  const dispatch = useDispatch();
  const [theGroup, setTheGroup] = useState(null);
  const handleProfile = async (values) => {
    const groupID = values.groupname;
    await firebase
      .firestore()
      .collection("groups")
      .doc(groupID ? groupID : "user not logged")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          if (snapshot.data().zipCode === user.zipCode) {
            firebase
              .firestore()
              .collection("users")
              .doc(auth.currentUser.uid)
              .update({
                group: groupID,
              });
            firebase
              .firestore()
              .collection("groups")
              .doc(groupID)
              .collection("users")
              .add({
                email: user.email,
                profilePictureUID: user.profilePictureUID,
                username: user.username,
                group: groupID,
                address: null,
              });
            dispatch(fetchGroupUsers(groupID));
            dispatch(fetchGroupListings(groupID));
            dispatch(fetchUser());
          } else {
            console.log(snapshot.data().zipCode, " exit data");
            console.log(user.zipCode, " exit user");
            console.log("does not exist 2");
          }
        } else {
          console.log("does not exist 1");
        }
      });
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
          Join A Group
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
        <Formik
          initialValues={{ groupname: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleProfile(values);
          }}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            values,
            setFieldTouched,
            touched,
          }) => (
            <>
              <AppTextInput
                placeholder="enter groupID"
                style={{
                  borderBottomWidth: 1.0,
                  width: "75%",
                  fontSize: 30,
                  margin: 80,
                  top: 40,
                }}
                value={values.groupname}
                onBlur={() => setFieldTouched("groupname")}
                onChangeText={handleChange("groupname")}
              />
              {touched.groupname && (
                <Text style={{ color: "red", bottom: 40, left: 30 }}>
                  {errors.groupname}{" "}
                </Text>
              )}
              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.4}
                onPress={handleSubmit}
              >
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
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
  usersG: store.userState.usersG,
  listings: store.userState.listings,
});

export default connect(mapStateToProp)(firstTimeRegister);
