import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import AppTextInput from "../misc/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "firebase";
import { connect } from "react-redux";
import { fetchGroupEvents} from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(4).max(15),
  info: Yup.string().required().min(4).max(50),
//   location: Yup.string().required().min(4).max(20),
//   duration: Yup.string().required().min(4).max(20),
});

export function createListing({ navigation, user }) {
  const dispatch = useDispatch();
  const handleProfile = async (values) => {
      const title = values.title
      const info = values.info
     // const location = values.location
     // const duration = values.duration
    firebase
      .firestore()
      .collection("groups")
      .doc(user.group)
      .collection("events")
      .add({
        info: info,
        user: user.username,
        title: title,
        // location: location
      });
    dispatch(fetchGroupEvents(user.group))
    navigation.navigate("eventScreen");
  };
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
          Create Listing
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
          initialValues={{ title: "", info: "", location: "" }}
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
                placeholder="Your Title"
                style={{
                  borderBottomWidth: 1.0,
                  width: "75%",
                  fontSize: 30,
                  margin: 80,
                  top: 40,
                }}
                value={values.title}
                onBlur={() => setFieldTouched("title")}
                onChangeText={handleChange("title")}
              />
              {touched.title && (
                <Text style={{ color: "red", bottom: 40, left: 30 }}>
                  {errors.title}{" "}
                </Text>
              )}
              {/* <AppTextInput
                placeholder="location"
                style={{
                  borderBottomWidth: 1.0,
                  width: "75%",
                  fontSize: 30,
                  top: 100,
                }}
                value={values.info}
                onBlur={() => setFieldTouched("location")}
                onChangeText={handleChange("location")}
              />
              {touched.info && (
                <Text style={{ color: "red", top: 110, left: 30 }}>
                  {errors.info}{" "}
                </Text>
              )}               */}
              <AppTextInput
              placeholder="info"
              style={{
                borderBottomWidth: 1.0,
                width: "75%",
                fontSize: 30,
                margin: 80,
                top: 40,
              }}
              value={values.info}
              onBlur={() => setFieldTouched("info")}
              onChangeText={handleChange("info")}
            />
            {touched.location && (
              <Text style={{ color: "red", bottom: 40, left: 30 }}>
                {errors.location}{" "}
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
    backgroundColor: "plum",
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

export default connect(mapStateToProp)(createListing);