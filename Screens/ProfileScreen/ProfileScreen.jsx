import {
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./ProfileScreen.styles";
import { useSelector } from "react-redux";
import { selectUser } from "./../../redux/auth/authSelectors";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const { id, avatar, username } = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    setPosts(posts);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background/Photo.png")}
        style={styles.image}
      >
        <View style={styles.profileContainer}>
          <View style={styles.imgContainer}>
            {avatar && <Image style={styles.avatar} source={{ uri: avatar }} />}
            <TouchableOpacity style={styles.icon}>
              <MaterialIcons name="close" size={20} color="#E8E8E8" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{username}</Text>
          {posts && (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.docId}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 34 }}>
                  <Image style={styles.photo} source={{ uri: item.photo }} />
                  <Text style={styles.title}>{item.title}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Comments", {})}
                    >
                      <EvilIcons name="comment" size={30} color="#BDBDBD" />
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.location,
                          })
                        }
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color="#BDBDBD"
                        />
                        <Text style={styles.place}>{item.place}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
