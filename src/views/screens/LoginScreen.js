import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import user from "../../const/user";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import COLORS from "../../const/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
// import QuestionsScreen from "./QuestionsScreen";
import { loginUser } from "../../services/Queries";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const LoginScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [userid, setUserid] = useState("");
  const [errors, setErrors] = useState([]);

  const handleLogin = () => {
    if (username === "" || password === "") {
      setErrors(["Username or password cannot be empty"]);
    } else {
      setLoading(true);
      loginUser(username, password)
        .then((val) => {
          console.log(val);
          if (val) {
            user.username = val.name;
            user.userid = val.id;
            ToastAndroid.show("Login Successful !!", ToastAndroid.SHORT);
            navigation.navigate("HomeScreen");
          } else {
            ToastAndroid.show(
              "Incorrect username or password!!",
              ToastAndroid.SHORT
            );
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
    console.log("print here");
  };

  const handleChange = (val) => {
    if (errors.length !== 0) {
      setErrors([]);
    }
    setUsername(val);
  };

  return (
    <View style={styles.maincontainer}>
      <Text style={styles.mainheader}>Welcome Back!</Text>
      <View>
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter your username"
          value={username}
          onChangeText={handleChange}
        />
      </View>

      <View>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword} //right={<TextInput.Icon name="eye-off-outline"/>}
        />
        {errors.map((e) => (
          <Text key={e} style={{ color: COLORS.red, marginHorizontal: 55 }}>
            {e}
          </Text>
        ))}
        {/* <TouchableOpacity onPress={handleLogin}>
          {isLoading ? (
            <Text>Loading..</Text>
          ) : (
            <View style={styles.button}>
              <Text style={{ fontWeight: "bold", color: COLORS.white }}>
                Login
              </Text>
            </View>
          )}a
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ fontWeight: "bold", color: COLORS.white }}>Login</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.qtext}>Don't have an account yet?</Text>
        <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.navtext}>Register</Text>
        </Pressable>
      </View>

      {/* <TouchableOpacity onPress={handleLogin}>
        {isLoading ? (
          <Text>Loading..</Text>
        ) : (
          <View style={styles.button}>
            <Text style={{ fontWeight: "bold", color: COLORS.white }}>
              Login
            </Text>
          </View>
        )}
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    // alignItems: "center",
    justifyContent: "center",
  },
  mainheader: {
    height: "10%",
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
    marginHorizontal: 70,
    marginTop: 100,
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
  inputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 20,
    elevation: 5,
  },
  text: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 30,
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "baseline",
  },
  ptext: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 140,
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "baseline",
  },
  qtext: {
    marginTop: 150,
    fontWeight: "bold",
    fontSize: 14,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 100,
  },
  navtext: {
    color: COLORS.primary,
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 14,
    marginHorizontal: 150,
    // marginTop: 20,
  },
});

export default LoginScreen;
