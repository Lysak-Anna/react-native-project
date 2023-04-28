import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./ProfileScreen.styles";
import { selectUser } from "./../../redux/auth/authSelectors";
import { changeAvatar, logOut } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import { pickImage } from "../../firebase/methods/pickImage";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const { id, avatar, username } = useSelector(selectUser);

  const [posts, setPosts] = useState([]);
  const [photo, setPhoto] = useState("");

  const getPosts = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", id));

    onSnapshot(q, async (querySnapshot) => {
      const posts = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const coll = collection(db, `posts/${doc.id}/comments`);
          const snapshot = await getCountFromServer(coll);

          return {
            ...doc.data(),
            postId: doc.id,
            commentCount: snapshot.data().count,
          };
        })
      );

      setPosts(posts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const newAvatar = async () => {
    await pickImage(setPhoto);
    dispatch(changeAvatar(photo));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={"stretch"}
        source={require("../../../assets/background/Photo.png")}
        style={styles.image}
      >
        <View style={styles.profileContainer}>
          <View style={{ marginBottom: 40 }}>
            <View style={styles.imgContainer}>
              {avatar && (
                <Image style={styles.avatar} source={{ uri: avatar }} />
              )}
              <TouchableOpacity style={styles.icon} onPress={newAvatar}>
                <MaterialIcons name="close" size={20} color="#E8E8E8" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(logOut())}
              style={{ marginLeft: "auto", marginTop: -40 }}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{username}</Text>
          {posts && (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.postId}
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
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.postId,
                          uri: item.photo,
                        })
                      }
                    >
                      <EvilIcons
                        name="comment"
                        size={30}
                        color="#BDBDBD"
                        style={styles.commentIcon}
                      />
                      <Text style={styles.count}>{item.commentCount}</Text>
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
