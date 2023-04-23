import { useFonts } from "expo-font";

import { Provider } from "react-redux";

import { store } from "./redux/store";
import "./firebase/config";

import Main from "./components/Main/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto - regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto - medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
