import React from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../const/colors";
import places from "../../const/places";
import StarRating from "react-native-star-rating-widget";


const UserprofileScreen = ({ navigation }) => {
    const [recommendationPlaces, setRecommendationPlaces] = useState([]);
    const Card = ({ place }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DetailsScreen", place)}
          >
            <ImageBackground style={styles.cardImage} source={place.image}>
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
   
    return(
        <View style={styles.maincontainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titlebar}>
                    <Icons 
                        name="arrow-back" size={28} color= {COLORS.primary} onPress={navigation.goBack}
                    ></Icons>    
                    <Icons name="more-vert" size={28} color= {COLORS.primary}></Icons>
                </View>
                <View style={{alignSelf: "center"}}>
                    <View style={styles.profile} >
                        <Image source={require("../../assets/profile.jpg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                </View>
                <View style={styles.infocontainer}>
                    <Text style={[styles.text, {fontWeight: "200", fontSize: 36}]}>username</Text>
                    <Text style={[styles.text, {color: COLORS.primary, fontSize: 16}]}>identity</Text>
                </View>
                <View style={styles.statscontainer}>
                    <View style={styles.statsbox}>
                        <Text style={[styles.text, {fontSize: 24}]}>24</Text>
                        <Text style={[styles.text, styles.subtext]}>Reviews</Text>
                    </View>
                    <View style={[styles.statsbox, {borderColor: COLORS.primary, borderLeftWidth: 1, borderRightWidth: 1}]}>
                        <Text style={[styles.text, {fontSize: 24}]}>345</Text>
                        <Text style={[styles.text, styles.subtext]}>Followers</Text>
                    </View>
                    <View style={styles.statsbox}>
                        <Text style={[styles.text, {fontSize: 24}]}>151</Text>
                        <Text style={[styles.text, styles.subtext]}>Following</Text>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={styles.sectionTitle}>My Favorites</Text>
                    <View>
                        <FlatList
                            contentContainerStyle={{ paddingLeft: 20 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={places}
                            renderItem={({ item }) => <Card place={item} />}
                        />
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={styles.sectionTitle}>Ratings and Reviews</Text>
                    <View style={styles.reviewbox}>
                        <Text style={styles.placetitle}>Pashupatinath Temple</Text>
                        <View style={styles.ratingContainer}>
                          <StarRating
                            maxStars={5}
                            rating='4'
                            starSize={20}
                          /> 
                        </View>
                        <Text style={{marginHorizontal: 20}}>20 Dec, 2021</Text>
                        <Text style={styles.review}>It is one of the best place for Hindu people and impressive architecture structure of the temple on pagoda style. it is also a place which make you more emotional while saw cremation on the bank of Bagmati river.</Text>
                    </View>
                    <View style={styles.reviewbox}>
                        <Text style={styles.placetitle}>Chandragiri Hills</Text>
                        <View style={styles.ratingContainer}>
                          <StarRating
                            maxStars={5}
                            rating='4.5'
                            starSize={20}
                          />
                        </View>
                        <Text style={{marginHorizontal: 20}}>20 Dec, 2021</Text>
                        <Text style={styles.review}>I highly recommend this place. Go there by a cable car, watch the sunset and then spend a night in a superb Chandragiri Hills Resort, It’s not the cheapest hotel but really worth the price.</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    maincontainer: {
      flexDirection: "column",
      width: "100%",
      height: "100%",
      justifyContent: "center",
    },
    titlebar: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 35,
        marginTop: 24,
        marginHorizontal: 16, 
    },
    text: {
        fontWeight: 'bold',
        color: COLORS.black,
    },
    subtext: {
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: "500",
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    profile: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
    },
    infocontainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16,
    },
    statscontainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
    },
    statsbox: {
        alignItems: "center",
        flex: 1,
    },
    mediaimagecontainer: {
        width: 100,
        height: 100,
        borderRadius: 10,
        overflow: "hidden",
        marginHorizontal: 10,
    },
    cardImage: {
        height: 220,
        width: 200,
        marginRight: 20,
        padding: 10,
        overflow: "hidden",
        borderRadius: 10,
        zIndex: 0,
        marginTop: 10,
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 22,
        borderColor: COLORS.primary,
        borderBottomWidth: 1,
    },
    placetitle: {
      color: COLORS.black,
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 10,
      marginHorizontal: 20,
    },
    reviewbox: {
      borderWidth: 1, 
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 10,
      borderColor: COLORS.primary,
    },
    review: {
      color: COLORS.black,
      fontSize: 16,
      marginHorizontal: 20,
      
    },
    ratingContainer: {
      marginHorizontal: 10,
      height: 20,
    },
    
});
export default UserprofileScreen;
