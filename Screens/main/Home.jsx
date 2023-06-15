import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(true);
  return (
    <MainTab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: { height: 60 },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(33,33,33,0.8)",
      })}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={(route) => ({
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity
              onPress={() => {
                setIsFocused(true);
                navigation.navigate("Posts");
              }}
            >
              <View style={styles.icon}>
              <Feather name="grid" size={24} color="rgba(33,33,33,0.8)" />
              </View>
            </TouchableOpacity>
          ),
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
        })}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={({ route }) => ({
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={
                isFocused
                  ? { ...styles.icon, backgroundColor: "#FF6C00" }
                  : styles.icon
              }
            >
              <Feather
                name="plus"
                size={24}
                color={isFocused ? "#FFFFFF" : color}
              />
            </View>
          ),
          headerTitle: "Створити публікацію",
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
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("Posts"), setIsFocused(true);
              }}
            >
              <Feather name="arrow-left" size={24} color="rgba(33,33,33,0.8)" />
            </TouchableOpacity>
          ),
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity
              style={
                !isFocused
                  ? { ...styles.icon, backgroundColor: "#FF6C00" }
                  : styles.icon
              }
              onPress={() => {
                setIsFocused(false), navigation.navigate("Profile");
              }}
            >
              <View>
                <Feather
                  name="user"
                  size={size}
                  color={!isFocused ? "#FFFFFF" : color}
                />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
