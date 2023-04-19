import { TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./CreatePostsScreen.styles";
import { useEffect, useState } from "react";
export default function CreatePostsScreen() {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        {!photo ? (
          <Camera
            style={styles.camera}
            ref={(ref) => {
              setCameraRef(ref);
            }}
            type={type}
          ></Camera>
        ) : (
          <Image source={{ uri: photo }} style={styles.camera} />
        )}
        <TouchableOpacity
          style={styles.button(photo)}
          onPress={async () => {
            if (cameraRef) {
              const { uri } = await cameraRef.takePictureAsync();
              await MediaLibrary.createAssetAsync(uri);
              setPhoto(uri);
            }
          }}
        >
          <MaterialIcons
            name="photo-camera"
            size={24}
            color={photo ? "#FFF" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </View>
      {photo ? (
        <TouchableOpacity onPress={() => setPhoto(null)}>
          <Text style={styles.text}>Edit photo</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.text}>Take a photo</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#BDBDBD"
      />
    </View>
  );
}
