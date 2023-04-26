import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./CommentsScreen.styles";
import { TouchableOpacity } from "react-native";
import { db } from "../../firebase/config";
import { selectUser } from "./../../redux/auth/authSelectors";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import { convertDate } from "../../helpers/convertDate";
import { Keyboard } from "react-native";
import { KeyboardAvoidingView } from "react-native";

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
        created: Timestamp.fromDate(new Date()),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getComments = async () => {
    const q = query(collection(db, `posts/${postId}/comments`));
    await onSnapshot(q, (querySnapshot) => {
      const comments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        commentId: doc.id,
      }));
      setComments(comments);
      console.log(comments);
      console.log(convertDate(comments[1].created.toDate()));
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri }} />
        {comments.length > 0 && (
          <SafeAreaView>
            <FlatList
              data={comments}
              keyExtractor={(item) => item.commentId}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row", marginBottom: 24 }}>
                  <Image style={styles.avatar} source={{ uri: item.avatar }} />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.comment}</Text>
                    <Text style={styles.data}>
                      {/* {new Date(item.created.seconds)} */}
                    </Text>
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
    </TouchableWithoutFeedback>
  );
}
