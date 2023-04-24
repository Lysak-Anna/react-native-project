import { View, Image, Text, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./CommentsScreen.styles";
import { TouchableOpacity } from "react-native";
import { db } from "../../firebase/config";
import { selectUser } from "./../../redux/auth/authSelectors";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const { id } = useSelector(selectUser);
  const { postId } = route.params;

  const createComment = async () => {
    try {
      const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
        comment,
        userId: id,
        created: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.photo} />
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.text}></Text>
          <Text style={styles.data}>created</Text>
        </View>
      </View>
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
