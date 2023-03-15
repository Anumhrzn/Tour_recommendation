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
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getRecommendations } from "../../services/Queries";
import AntDesign from "react-native-vector-icons/AntDesign";
import places from "../../const/places";
import { combineTransition } from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const handleSearch = async () => {
    if (searchText !== "") {
      const results = await getRecommendations(searchText);
      setRecommendations(results);
    }
  };
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
  const RecommendedCard = ({ place }) => {
    return (
      <ImageBackground style={style.rmCardImage} source={{ uri: place.image }}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {place.name}
        </Text>
        <View
          style={{
            Flex: 1,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        ></View>
      </ImageBackground>
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
                value={searchText}
                onChangeText={setSearchText}
              />
              <TouchableOpacity onPress={handleSearch}>
                <Icon name="search" size={28} />
              </TouchableOpacity>
            </View>
            {recommendations.length !== 0 && (
              <View style={style.searchDropdown}>
                <View style={{}}>
                  {recommendations.map((recommendation) => (
                    <Text key={recommendation}>{recommendation}</Text>
                  ))}
                </View>
                <View style={style.closeButton}>
                  <TouchableOpacity onPress={() => setRecommendations([])}>
                    <AntDesign
                      name="close"
                      style={{ color: COLORS.black }}
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
        <ListCategories />
        <View>
          <Text style={style.sectionTitle}>Place that you searched for</Text>
          <Text style={style.sectionTitle}>Recommended Places For You</Text>
        </View>
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
  searchDropdown: {
    width: "100%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    position: "absolute",
    top: 80,
    padding: 20,
    elevation: 12,
    borderWidth: 0.2,
    borderColor: COLORS.grey,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SearchScreen;
