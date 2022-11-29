import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import { useState } from "react";
import COLORS from "../../const/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import QuestionsScreen from "./QuestionsScreen";
import { addUser } from "../../services/Queries";

const LoginScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  const handleLogin = () => {
    if (username === "") {
      setErrors(["Username cannot be empty"]);
    } else {
      setLoading(true);
      addUser(username)
        .then((val) => {
          if (val) {
            ToastAndroid.show("User already exist!!", ToastAndroid.SHORT);
          } else {
            navigation.navigate("QuestionsScreen");
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  };

  const handleChange = (val) => {
    if (errors.length !== 0) {
      setErrors([]);
    }
    setUsername(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your username"
          style={{ color: COLORS.black, flex: 1 }}
          value={username}
          onChangeText={handleChange}
        />
      </View>
      {errors.map((e) => (
        <Text key={e} style={{ color: COLORS.red }}>
          {e}
        </Text>
      ))}
      <TouchableOpacity onPress={handleLogin}>
        {isLoading ? (
          <Text>Loading..</Text>
        ) : (
          <View style={styles.button}>
            <Text style={{ fontWeight: "bold", color: COLORS.white }}>
              Login
            </Text>
          </View>
        )}
      </TouchableOpacity>
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
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
  },
  inputContainer: {
    height: 50,
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 70,
    elevation: 12,
  },
});

export default LoginScreen;
