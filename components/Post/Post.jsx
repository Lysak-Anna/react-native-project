import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MapScreen from "../../Screens/MapScreen/MapScreen";
import CommentsScreen from "./../../Screens/CommentsScreen/CommentsScreen";
const NestedScreen = createNativeStackNavigator();
export default function Post({ image, title, navigation }) {
  return (
    <>
      <NestedScreen.Navigator>
        <NestedScreen.Screen name="Comment" component={CommentsScreen} />
        <NestedScreen.Screen name="Map" component={MapScreen} />
      </NestedScreen.Navigator>
      <View>
        <Image source={image} />
        <Text>{title}</Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Comment")}>
            <EvilIcons name="comment" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
