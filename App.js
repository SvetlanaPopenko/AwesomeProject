import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const routing = useRoute(true);

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
