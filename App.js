import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import { MapScreen } from "./src/views/screens/MapScreen";
import LoginScreen from "./src/views/screens/LoginScreen";
import QuestionsScreen from "./src/views/screens/QuestionsScreen";
import SearchScreen from "./src/views/screens/SearchScreen";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
