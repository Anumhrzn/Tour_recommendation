import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../../const/colors";
import { questions } from "../../const/data";
import AntDesign from "react-native-vector-icons/AntDesign";

const QuestionsScreen = ({ navigation }) => {
  const [answers, setAnswers] = useState([]);
  const [isSelected, setSelected] = useState(false);
  const handleSelection = (selection) => {
    const _answers = answers;
    if (answers.includes(selection)) {
      const index = _answers.indexOf(selection);
      if (index > -1) {
        _answers.splice(index, 1);
      }
      _answers.po;
    } else {
      _answers.push(selection);
    }
    setAnswers(_answers);
    setSelected(!isSelected);
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeButton}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <AntDesign name="close" style={{ color: COLORS.black }} size={22} />
        </TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 22 }}>
        Places to explore 
      </Text>
      <View style={styles.tagsContainer}>
        {questions.map((tag) => (
          <TouchableOpacity
            key={tag}
            onPress={() => {
              handleSelection(tag);
            }}
          >
            <Text
              style={answers.includes(tag) ? styles.tagSelected : styles.tag}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.nextButton}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <AntDesign
            name="arrowright"
            style={{ color: COLORS.white }}
            size={22}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    width: "100%",
    paddingTop: 100,
  },
  tagsContainer: {
    flexDirection: "row",
    paddingTop: 20,
  },
  tag: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.lightGray,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  tagSelected: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.primary,
    margin: 5,
    color: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    color: COLORS.black,
    top: 50,
    right: 30,
  },
  nextButton: {
    position: "absolute",
    bottom: 60,
    right: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
  },
});
export default QuestionsScreen;
