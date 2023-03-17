import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";

import { addUser } from "../../services/Queries";
import COLORS from "../../const/colors";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleRegister = () => {
    if (username === "") {
      setErrors(["Username cannot be empty"]);
    } else {
      setLoading(true);
      addUser(username, password)
        .then((val) => {
          console.log(val);
          if (val) {
            ToastAndroid.show("User already exists !!", ToastAndroid.SHORT);
          } else {
            navigation.navigate("LoginScreen");
            ToastAndroid.show("Successfully registered !!", ToastAndroid.SHORT);
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  };

  const handleEmail = () => {
    if (email === "") {
      setErrors(["Username cannot be empty"]);
    } else {
      setLoading(true);
      addUser(email)
        .then((val) => {
          console.log(val);
          if (val) {
            ToastAndroid.show("User already exists!!", ToastAndroid.SHORT);
          } else {
            navigation.navigate("LoginScreen");
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  };

  const handleChange = (val) => {
    if (errors.length !== 0) {
      setErrors([]);
    }
    setUsername(val);
    setEmail(val);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainheader}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        // value={password}
        // onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={{ fontWeight: "bold", color: COLORS.white }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  mainheader: {
    height: "10%",
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
    marginHorizontal: 100,
    marginTop: 100,
  },
  input: {
    width: "80%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    width: "50%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
