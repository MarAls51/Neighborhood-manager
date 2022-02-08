import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import AppTextInput from "../misc/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase/firebase";
import firebase from "firebase";
import defaultImage from "../../assets/default.jpg";
import md5 from "md5";
import { connect } from "react-redux";
import { fetchGroupEvents } from "../../redux/actions/actions";
import { fetchGroupUsers } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
const defaultImageUri = Image.resolveAssetSource(defaultImage).uri;
const validationSchema = Yup.object().shape({
  groupname: Yup.string().required().min(4).max(15),
  zipcode: Yup.string()
    .required()
    .test("onlyNumbers", "zipcode must be a number", (value) =>
      /^[0-9]*$/.test(value === undefined ? "" : value.toString())
    )
    .min(5)
    .max(5),
});
export function firstTimeRegister({ navigation, user }) {
  const dispatch = useDispatch();
  const handleProfile = async (values) => {
    const groupname = values.groupname;
    const zipCode = values.zipcode;
    const convertMD5 = () => {
      let inputText = toString(zipCode) + groupname;
      let encodedVal = md5(inputText);
      return encodedVal;
    };
    let hashValue = convertMD5();
    firebase.firestore().collection("groups").doc(hashValue).set({
      groupname,
      zipCode,
      profilePictureUID: defaultImageUri,
      admin: auth.currentUser.uid,
    });
    firebase.firestore().collection("users").doc(auth.currentUser.uid).update({
      group: hashValue,
    });
    firebase
      .firestore()
      .collection("groups")
      .doc(hashValue)
      .collection("users")
      .doc(auth.currentUser.uid)
      .set({
        email: user.email,
        profilePictureUID: user.profilePictureUID,
        username: user.username,
        group: hashValue,
        address: null,
      });
    dispatch(fetchGroupUsers(hashValue));
    firebase
      .firestore()
      .collection("groups")
      .doc(hashValue)
      .collection("events")
      .add({
        date: "11",
        info: "some info",
        user: user.username,
        title: "event",
        id: "2351",
        location: "africa",
      });
    dispatch(fetchGroupEvents(hashValue));
    navigation.navigate("CreateGroupProfile", { group: hashValue });
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
          Create A Group
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
          initialValues={{ groupname: "", zipcode: "" }}
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
                placeholder="Your Group Name"
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
              <AppTextInput
                placeholder="Your Group ZipCode"
                style={{
                  borderBottomWidth: 1.0,
                  width: "75%",
                  fontSize: 30,
                  top: 100,
                }}
                value={values.zipcode}
                onBlur={() => setFieldTouched("zipcode")}
                onChangeText={handleChange("zipcode")}
              />
              {touched.zipcode && (
                <Text style={{ color: "red", top: 110, left: 30 }}>
                  {errors.zipcode}{" "}
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
});

export default connect(mapStateToProp)(firstTimeRegister);
