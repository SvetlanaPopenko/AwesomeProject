import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedScreen/DefaultScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";
import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        component={DefaultScreen}
        options={{
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFFFFF",
            shadowColor: "rgba(0,0,0,0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 13.59,
          },
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: "Коментарі",
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFFFFF",
            shadowColor: "rgba(0,0,0,0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 13.59,
          },
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: "Карта",
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFFFFF",
            shadowColor: "rgba(0,0,0,0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 13.59,
          },
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
