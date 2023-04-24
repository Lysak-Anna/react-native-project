import { View, Image, TouchableOpacity, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { styles } from "./NestedPostsScreen.styles";

export default function NestedPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc._document.data.value.mapValue.fields,
      postId: doc.id,
    }));
    setPosts(posts);
  };
  console.log(posts);
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Image />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.username}>{item.username.stringValue}</Text>
                <Text style={styles.email}>{item.email.stringValue}</Text>
              </View>
            </View>
            <Image
              source={{ uri: item.photo.stringValue }}
              style={styles.photo}
            />
            <Text style={styles.title}>{item.title.stringValue}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.postId })
                }
              >
                <EvilIcons name="comment" size={30} color="#BDBDBD" />
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                  <Text style={styles.place}>{item.place.stringValue}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
