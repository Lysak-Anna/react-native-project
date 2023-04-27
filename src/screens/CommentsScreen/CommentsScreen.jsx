import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { styles } from "./CommentsScreen.styles";
import { db } from "../../firebase/config";
import { selectUser } from "./../../redux/auth/authSelectors";
import { convertDate } from "../../helpers/convertDate";

export default function CommentsScreen({ route }) {
  const { postId, uri } = route.params;
  const { avatar, username } = useSelector(selectUser);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const createComment = async () => {
    try {
      const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
        comment,
        username,
        avatar,
        created: Timestamp.fromDate(new Date()),
      });
      Keyboard.dismiss();
      setComment("");
    } catch (error) {
      setError(error.message);
    }
  };

  const getComments = async () => {
    const q = query(collection(db, `posts/${postId}/comments`));
    onSnapshot(q, (querySnapshot) => {
      const comments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        commentId: doc.id,
      }));
      setComments(comments);
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
          <FlatList
            data={comments}
            keyExtractor={(item) => item.commentId}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection:
                    item.username === username ? "row-reverse" : "row",
                  marginBottom: 24,
                }}
              >
                <View style={styles.avatarWrapper(item.username === username)}>
                  {item.avatar ? (
                    <Image
                      style={styles.avatar}
                      source={{ uri: item.avatar }}
                    />
                  ) : (
                    <FontAwesome name="user-circle" size={28} color="#FF6C00" />
                  )}
                </View>
                <View style={styles.userContainer}>
                  <Text style={styles.username(item.username === username)}>
                    {item.username}
                  </Text>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.comment}</Text>

                    <Text style={styles.data(item.username === username)}>
                      {convertDate(item.created.toDate())}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({
            ios: 100,
          })}
        >
          <View style={{ position: "relative", marginTop: "auto" }}>
            <TextInput
              style={styles.input}
              placeholder="Comment..."
              placeholderTextColor={"#BDBDBD"}
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
            <TouchableOpacity style={styles.sendButton} onPress={createComment}>
              <Feather name="arrow-up" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
