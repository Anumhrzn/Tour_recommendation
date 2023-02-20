import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import COLORS from "../../const/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import places from "../../const/places";

const { width } = Dimensions.get("screen");
const SearchScreen = ({ navigation }) => {
  const ListCategories = () => {};
  const Card = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("DetailsScreen", place)}
      >
        <ImageBackground style={style.cardImage} source={place.image}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {place.name}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Icon name="sort" size={28} color={COLORS.white} />
        <Icon name="notifications-none" size={28} color={COLORS.white} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            zIndex: 10,
            backgroundColor: COLORS.primary,
            height: 80,
            paddingHorizontal: 20,
          }}
        >
          <View>
            <View style={style.inputContainer}>
              <TextInput
                placeholder="Search place"
                style={{ color: COLORS.black, flex: 1 }}
              />
              <TouchableOpacity onPress={""}>
                <Icon name="search" size={28} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={style.sectionTitle}>Place that you searched for</Text>
        
        <Text style={style.sectionTitle}>Similar other places</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    marginTop: -30,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "relative",
    top: 30,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
    justifyContent: "space-between",
    zIndex: 10,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 0,
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 0,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
    zIndex: 0,
  },
});

export default SearchScreen;
