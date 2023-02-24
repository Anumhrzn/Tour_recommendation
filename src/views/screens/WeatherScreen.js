import {
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
  _Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import COLORS from "../../const/colors";

const openWeatherKey = "bea6e27c01ba8b40b29fc55a918cb0e0";

const WeatherScreen = () => {
  const [forecast, setforecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);
    //permissson to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisson to access location was denied");
    }

    //get the current location
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    //fetches the weather data from the openweathermap api
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${openWeatherKey}&units=metric`
      // `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );

    const data = await response.json(); //convert response to json
    console.log(data);

    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
    } else {
      setforecast(data);
    }
    setRefreshing(false);
  };
  useEffect(() => {
    loadForecast();
  }, []);

  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  console.log(forecast);
  const current = forecast["name"];
  console.log(current);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadForecast()}
          />
        }
        style={{ marginTop: 50 }}
      >
        <Text style={styles.title}>Current Weather</Text>
        <Text
          style={{ alignItems: "center", textAlign: "center", fontSize: 16 }}
        >
          Your Location : {current}
        </Text>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${forecast["weather"][0]["icon"]}@4x.png`,
            }}
          ></Image>
          <Text style={styles.currentTemp}>
            {Math.round(forecast["main"]["temp"])}ºC
          </Text>
        </View>

        <Text style={styles.description}>
          {forecast["weather"][0]["description"]}
        </Text>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            {/* <Image source={require('..assets/temp.png')}> */}
            <Text style={styles.currentTemp}>
              {forecast["main"]["feels_like"]}
            </Text>
            <Text style={styles.currentTemp}>
              {forecast["main"]["humidity"]}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a0b9bd",
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
  },
  current: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  largeIcon: {
    width: 250,
    height: 190,
  },
  currentTemp: {
    textAlign: "center",
    fontSize: 30,
  },
  description: {
    textAlign: "center",
    fontSize: 25,
  },
});
