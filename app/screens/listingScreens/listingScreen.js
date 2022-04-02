import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
const height = Dimensions.get("window").height;
export function Map({ listings, navigation }) {
  const Item = ({ title, longitude, latitude, info }) => (
    (
      <MapView.Marker
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={title}
        description={info}
      />
    )
  );
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        loadingEnabled={true}
        region={{
          latitude: 51,
          longitude: -122,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
      >
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            navigation.navigate("addNewListing");
          }}
        >
          <Text style={styles.text}>Create Listing</Text>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            style={{ left: 160, bottom: 16 }}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <FlatList
          data={listings}
          extraData={listings}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              logitude={item.longitude}
              latitude={item.latitude}
              description={item.info}
            />
          )}
          keyExtractor={(item) => item.info}
        />
      </MapView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  map: {
    height,
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
    backgroundColor: "plum",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    right: 85,
    top: 15,
  },
});

const mapStateToProp = (store) => ({
  listings: store.userState.listings,
});

export default connect(mapStateToProp)(Map);
