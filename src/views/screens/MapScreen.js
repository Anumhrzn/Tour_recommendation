import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { datas } from "../../const/data";
import { useState } from "react";
import COLORS from "../../const/colors";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

export const MapScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filterResults = datas.filter(
      (data) => data.tags.amenity === searchText
    );
    setSearchResults(filterResults);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 27.7172,
          longitude: 85.324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        {searchResults.map((data) => (
          <Marker
            key={data.id}
            coordinate={{ latitude: data.lat, longitude: data.lon }}
            title={data.tags.name}
            description="Description"
            // image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0P6n6x2zAyrg4r_gU7DzWxzM-_fyg8brA7NV_4jcAHQ&s"
          />
        ))}
      </MapView>
      <View style={styles.inputContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // position: "relative",
  },
  inputContainer: {
    height: 50,
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
  },
  map: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
});
