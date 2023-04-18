import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./routing";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto - regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto - medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const routing = useRoute(true);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
}
