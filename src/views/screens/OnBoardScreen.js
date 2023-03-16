import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";

import COLORS from "../../const/colors";
const OnBoardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={style.container}
        source={require("../../assets/boudha.jpg")}
      >
        <View style={style.layer}></View>
        <View style={style.details}>
          <Text style={style.txt}>Discover</Text>
          <Text style={style.txt}>Kathmandu with us</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <View style={style.btn}>
              <Text style={style.btntxt}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <View style={style.btn}>
              <Text style={style.btntxt}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  details: {
    height: "50%",
    bottom: 0,
    position: "absolute",
    paddingHorizontal: 50,
  },
  btn: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "transparent",
  },
  layer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.black,
    opacity: 0.5,
  },
  txt: {
    color: COLORS.white,
    fontSize: 35,
    fontWeight: "bold",
  },
  btntxt: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
export default OnBoardScreen;
