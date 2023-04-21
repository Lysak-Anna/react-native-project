import { View, Image, TouchableOpacity, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function NestedPostsScreen({ navigation }) {
  return (
    <View>
      <Image />
      <Text></Text>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
          <EvilIcons name="comment" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Ionicons name="location-outline" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
