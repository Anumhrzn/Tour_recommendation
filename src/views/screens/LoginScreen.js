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
// import QuestionsScreen from "./QuestionsScreen";
import { addUser } from "../../services/Queries";

const LoginScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  // const [userid, setUserid] = useState("");
  const [errors, setErrors] = useState([]);

  const handleLogin = () => {
    if (username === "") {
      setErrors(["Username cannot be empty"]);
    } else {
      setLoading(true);
      addUser(username)
        .then((val) => {
          console.log(val);
          if (val) {
            ToastAndroid.show("User already exists!!", ToastAndroid.SHORT);
          } else {
            navigation.navigate("QuestionsScreen");
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
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Username
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your username"
          style={{ color: COLORS.black, flex: 1 }}
          value={username}
          onChangeText={handleChange}
        />
      </View>
      <View>
        <Text style={styles.text}>
          Password
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your password"
          style={{ color: COLORS.black, flex: 1 }}
          // value={userid}
          // onChangeText={(userid) => setUserid(userid)}
        />
      </View>
      {/* {errors.map((e) => (
        <Text key={e} style={{ color: COLORS.red }}>
          {e}
        </Text>
      ))} */}
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
      <View>
        <Text style={styles.qtext}>
          Don't have an account yet?
        </Text>
      </View>
      <TouchableOpacity onPress={() => {
            navigation.navigate("Register");
          }}>
         <View style={styles.button}>
            <Text style={{ fontWeight: "bold", color: COLORS.white }}>
              Register
            </Text>
          </View>  
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
    // marginRight: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: "center"
  },
  inputContainer: {
    height: 50,
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    top: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 12,
  },
  text: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: "baseline"
  },
  qtext: {
    marginTop: 150,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: "baseline"
  }

});

export default LoginScreen;
