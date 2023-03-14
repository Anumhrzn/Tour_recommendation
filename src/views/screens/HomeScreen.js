import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../const/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import places from "../../const/places";
import { useState } from "react";
import { getRecommendations, getUserID } from "../../services/Queries";
import AntDesign from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("screen");
const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [recommendationPlaces, setRecommendationPlaces] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const handleSearch = async () => {
    if (searchText !== "") {
      const results = await getRecommendations(searchText);
      setRecommendations(results);
    }
  };
  const categoryIcons = [
    <Icon
      name="flight"
      size={25}
      color={COLORS.primary}
      onPress={() => {
        navigation.navigate("SearchScreen");
      }}
    />,
    <Icon
      name="beach-access"
      size={25}
      color={COLORS.primary}
      onPress={() => {
        navigation.navigate("WeatherScreen");
      }}
    />,
    <Icon name="near-me" size={25} color={COLORS.primary} />,
    <Icon
      name="place"
      size={25}
      color={COLORS.primary}
      onPress={() => {
        navigation.navigate("MapScreen");
      }}
    />,
  ];
  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

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
      <ImageBackground
        style={style.rmCardImage}
        source={require("../../assets/Swoyambhu.png")}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {place}
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

  // useEffect(() => {
  //   const getRecommendationPlaces = async () => {
  //     const data = await getUserID(20);
  //     //console.log(data);
  //     setRecommendationPlaces([...data]);
  //   };
  //   getRecommendationPlaces();
  // }, []);
  // console.log("rendered");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Icon name="sort" size={28} color={COLORS.white} />
        <Icon
          name="person-pin"
          size={28}
          color={COLORS.white}
          onPress={() => {
            navigation.navigate("UserprofileScreen");
          }}
        />
           
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            zIndex: 10,
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text style={style.headerTitle}>Explore the</Text>
            <Text style={style.headerTitle}>beautiful places</Text>
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
        <Text style={style.sectionTitle}>Popular Attractions</Text>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recommended Places For You</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={recommendationPlaces}
            renderItem={({ item }) => <RecommendedCard place={item} />}
          />
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
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  searchDropdown: {
    width: "100%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    position: "absolute",
    top: 170,
    padding: 20,
    elevation: 12,
    borderWidth: 0.2,
    borderColor: COLORS.grey,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default HomeScreen;
