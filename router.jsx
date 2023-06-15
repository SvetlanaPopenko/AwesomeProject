import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import Home from "./Screens/main/Home";

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </HomeStack.Navigator>
  );
};
