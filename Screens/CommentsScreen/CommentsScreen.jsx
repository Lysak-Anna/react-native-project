import { View, Image, Text, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./CommentsScreen.styles";
import { TouchableOpacity } from "react-native";
import { db } from "../../firebase/config";
import { selectUser } from "./../../redux/auth/authSelectors";
import { useSelector } from "react-redux";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { avatar, username } = useSelector(selectUser);
  const { postId, uri } = route.params;

  const createComment = async () => {
    try {
      const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
        comment,
        username,
        avatar,
        created: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getComments = async () => {
    const querySnapshot = await getDocs(
      collection(db, `posts/${postId}/comments`)
    );
    const comments = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      commentId: doc.id,
    }));
    setComments(comments);
    console.log(comments);
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri }} />
      {comments.length > 0 && (
        <SafeAreaView>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.commentId}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", marginBottom: 24 }}>
                <Image style={styles.avatar} />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.comment}</Text>
                  {/* <Text style={styles.data}>{item.created}</Text> */}
                </View>
              </View>
            )}
          />
        </SafeAreaView>
      )}

      <View style={{ position: "relative", marginTop: "auto" }}>
        <TextInput
          style={styles.input}
          placeholder="Comment..."
          placeholderTextColor={"#BDBDBD"}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={createComment}>
          <Feather name="arrow-up" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
// const year = currentDate.getFullYear();
// const month = currentDate.getMonth() + 1; // adding 1 because getMonth() returns 0-based month index
// const day = currentDate.getDate();
// const hours = currentDate.getHours();
// const minutes = currentDate.getMinutes();
// const seconds = currentDate.getSeconds();

// const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
