import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../const/colors";
import StarRating from "react-native-star-rating-widget";

const DetailsScreen = ({ navigation, route }) => {
  const place = route.params;
  const [rating, setRating] = React.useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7 }} source={place.image}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <Icon name="favorite" color={COLORS.red} size={30} />
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
          <View style={style.iconNavigation}>
            <Icon
              name="navigation"
              color={COLORS.primary}
              size={30}
              onPress={() => {
                navigation.navigate("NavigationScreen", place);
              }}
            />
          </View>
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
        <Text style={{ marginTop: 10, lineHeight: 22 }}>{place.details}</Text>
      </View>
      <View style={style.ratingContainer}>
        <StarRating
          maxStars={5}
          rating={rating}
          setRating={setRating}
          size={35}
        />
      </View>
      <TouchableOpacity
        style={style.submitButton}
        onPress={() => alert(`You have rated ${rating} stars to the place`)}
      >
        <Text style={style.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginLeft:20,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default DetailsScreen;
