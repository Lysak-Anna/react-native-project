import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "./ModalContent.styles";

export default function ModalContent({ openGallery, openCamera, onClose }) {
  const WIDTH = Dimensions.get("window").width;

  return (
    <View style={{ ...styles.container, width: WIDTH - 32 }}>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <AntDesign name="close" size={20} color="#212121" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.text}>Open gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.text}>Take a photo</Text>
      </TouchableOpacity>
    </View>
  );
}
