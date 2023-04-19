import { View } from "react-native";
import Post from "../../components/Post/Post";
export default function PostsScreen({ navigation }) {
  return (
    <View style={{ marginHorizontal: 16 }}>
      <Post navigation={navigation} />
    </View>
  );
}
