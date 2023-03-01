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
import HomeScreen from "./HomeScreen";

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
  // const handleRatingChange = (rating) => {
  //   setUserRating(rating);
  // };

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
      {/* <View style={styles.inputContainer}>
        <Text style={{ color: COLORS.black, flex: 1 }}>User rating:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => handleRatingChange(i)}>
              <Text style={{ color: i <= userRating ? COLORS.yellow : COLORS.grey }}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View> */}

      {/* <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your userid"
          style={{ color: COLORS.black, flex: 1 }}
          value={userid}
          onChangeText={(userid) => setUserid(userid)}
        />
      </View> */}
      {errors.map((e) => (
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
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
    marginHorizontal: 30,
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
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
