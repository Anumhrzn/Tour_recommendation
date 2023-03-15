import react from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { Marker, Polyline } from "react-native-maps";
import MapView from "react-native-maps";

import { datas } from "../../const/data";
import { useState, useEffect } from "react";
import COLORS from "../../const/colors";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { directionConstants } from "../../const/dummy-contants";
import { getDistance } from "../../services/Queries";

const NavigationScreen = ({ navigation, route }) => {
  const place = route.params;
  const [destination, setDestination] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: place.coordinates.latitude,
    longitude: place.coordinates.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    // setMapRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
    getDistance(place.coordinates).then((val) => {
      if (val) {
        setDestination(val);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {destination ? (
        <MapView
          initialRegion={{
            latitude: 27.7172,
            longitude: 85.324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
          region={mapRegion}
        >
          {/* <Marker coordinate={mapRegion} title="Your current location"></Marker> */}
          <Marker
            coordinate={{
              latitude: 27.6756,
              longitude: 85.3459,
            }}
          />
          <Marker coordinate={place.coordinates} />
          <Polyline
            coordinates={destination.path}
            strokeColor="#4a80f5" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={["#7F0000"]}
            strokeWidth={6}
          />
        </MapView>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
    </View>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    height: 50,
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
  },
  map: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
});
