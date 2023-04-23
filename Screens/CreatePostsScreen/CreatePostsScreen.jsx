import { TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./CreatePostsScreen.styles";
import { useEffect, useState } from "react";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { app } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectId } from "../../redux/auth/authSelectors";

export default function CreatePostsScreen({ navigation }) {
  const id = useSelector(selectId);

  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");

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

      let loc = await Location.requestForegroundPermissionsAsync();
      if (loc.status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };
  const uploadPhoto = async () => {
    const image = await fetch(photo);
    const blobPhoto = await image.blob();
    const photoId = nanoid();
    const imagesRef = ref(storage, `images/${photoId}`);
    await uploadBytes(imagesRef, blobPhoto);
    const url = await getDownloadURL(imagesRef);
    return url;
  };
  const uploadPost = async (location) => {
    const url = await uploadPhoto();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo: url,
        title,
        place,
        location,
        userId: id,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const onSubmit = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    await uploadPost(coords);
    navigation.navigate("Posts");
  };
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
        <TouchableOpacity style={styles.button(photo)} onPress={takePhoto}>
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
        placeholder="Title..."
        placeholderTextColor="#BDBDBD"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <View style={{ position: "relative" }}>
        <Ionicons
          name="location-outline"
          size={24}
          color="#BDBDBD"
          style={styles.locationIcon}
        />
        <TextInput
          style={{ ...styles.input, paddingLeft: 28 }}
          placeholder="Location..."
          placeholderTextColor="#BDBDBD"
          value={place}
          onChangeText={(text) => setPlace(text)}
        />
      </View>
      <TouchableOpacity style={styles.createButton} onPress={onSubmit}>
        <Text style={styles.createText}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton}>
        <AntDesign name="delete" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}
