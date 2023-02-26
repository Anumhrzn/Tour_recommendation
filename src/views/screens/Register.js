import React from "react";
import {
    View,
    Text,
    StyleSheet,
  } from "react-native";

const Register = ({ navigation }) => {
  return (
    <View style= {styles.container}>
        <View>
            <Text>You are welcome to Register</Text>
        </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

});

export default Register;