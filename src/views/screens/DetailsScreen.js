import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../const/colors";
import user from "../../const/user";
import StarRating from "react-native-star-rating-widget";
import { addUserRating, getRatingsByPlaceName } from "../../services/Queries";
import { TextInput } from "react-native-gesture-handler";

const DetailsScreen = ({ navigation, route }) => {
  const place = route.params;
  const [isLoading, setLoading] = useState(false);
  const [rating, setRating] = useState(4);
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState([]);

  const handleRating = (rating) => {
    setRating(rating);
  };
  const handleSubmit = () => {
    setLoading(true);
    const userRating = {
      name: user.username ? user.username : "Guest",
      place_name: place.name,
      rating: rating,
      description: description,
    };
    addUserRating(userRating)
      .then((val) => {
        const newarray = [userRating].concat(ratings);
        setRatings(newarray);
        setDescription("");
        ToastAndroid.show("Successfully added rating", ToastAndroid.SHORT);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const onChange = (newRating) => {
    setRating(newRating);
    // console.log(newRating);
  };

  const getRatings = async () => {
    let results = await getRatingsByPlaceName(place.name);
    setRatings(results.reverse());
    console.log(results);
  };

  useEffect(() => {
    getRatings();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
        {place.id ? (
          <ImageBackground style={{ height: 450 }} source={place.image}>
            <View style={style.header}>
              <Icon
                name="arrow-back-ios"
                size={28}
                color={COLORS.white}
                onPress={navigation.goBack}
              />
            </View>
          </ImageBackground>
        ) : (
          <ImageBackground
            style={{ height: 450 }}
            source={{ uri: place.image }}
          >
            <View style={style.header}>
              <Icon
                name="arrow-back-ios"
                size={28}
                color={COLORS.white}
                onPress={navigation.goBack}
              />
            </View>
          </ImageBackground>
        )}

        <View style={style.detailsContainer}>
          <View style={style.iconContainer}>
            <Icon
              name="navigation"
              color={COLORS.primary}
              size={30}
              onPress={() => {
                navigation.navigate("NavigationScreen", place);
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: -10 }}>
            <Icon name="place" size={28} color={COLORS.primary} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              {place.name}
            </Text>
          </View>

          <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 20 }}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 20,
                color: COLORS.primary,
              }}
            >
              About the place
            </Text>
          </Text>
          <Text style={{ marginTop: 10, lineHeight: 22 }}>
            {place.description}
          </Text>

          <TextInput
            placeholder="Give reviews"
            style={style.input}
            multiline
            onChangeText={(descriptionText) => setDescription(descriptionText)}
          />
          <View style={style.ratingContainer}>
            <StarRating
              maxStars={5}
              rating={rating}
              onStarPress={handleRating}
              onChange={onChange}
              size={35}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator style={style.submitButton} />
          ) : (
            <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
              <Text style={style.submitText}>
                {isLoading ? "loading.." : "SUBMIT"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ fontWeight: "600", fontSize: 20, marginBottom: 20 }}>
            Reviews
          </Text>
          {ratings.length !== 0 &&
            ratings.map((ratingOb) => (
              <View
                style={{
                  marginBottom: 20,
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 0.5,
                  paddingBottom: 10,
                }}
              >
                <Text style={style.text}>{ratingOb.name}</Text>
                {ratingOb.description.length !== 0 && (
                  <Text style={{ paddingTop: 5, paddingBottom: 5 }}>
                    {ratingOb.description}
                  </Text>
                )}
                <StarRating
                  rating={ratingOb.rating}
                  size={8}
                  onStarPress={() => {}}
                  onChange={() => {}}
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontSize: 14,
    alignItems: "baseline",
  },
  iconNavigation: {
    height: 60,
    width: 60,
    position: "absolute",
    top: 5,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 1,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  input: {
    marginTop: 80,
    marginBottom: 0,
    height: 100,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: 100,
    height: 40,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 20,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  ratingContainer: {
    marginTop: 24,
  },
});

export default DetailsScreen;
