import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Modal,
  Keyboard,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./CreatePostsScreen.styles";
import { useEffect, useState } from "react";

import { db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

import ModalContent from "../../components/ModalContent/ModalContent";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";
import { uploadPhoto } from "../../firebase/methods/uploadPhoto";
import { pickImage } from "../../firebase/methods/pickImage";

import { ActivityIndicator } from "react-native";

export default function CreatePostsScreen({ navigation }) {
  const { id, email, username, avatar } = useSelector(selectUser);

  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [camera, setCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const openGallery = async () => {
    await pickImage(setPhoto);
    setModalVisible(false);
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      setCamera(false);
    }
  };
  const openCamera = () => {
    setModalVisible(false);
    setPhoto(null);
    setCamera(true);
  };

  const uploadPost = async (location) => {
    const url = await uploadPhoto(photo, "images");

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo: url,
        title,
        place,
        location,
        userId: id,
        email,
        username,
        avatar,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onSubmit = async () => {
    if (!title || !photo || !place) {
      setError("Please, fill in all fields");
      return;
    }
    try {
      setIsLoading(true);

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      await uploadPost(coords);
      navigation.navigate("Posts");
      setTitle("");
      setPhoto("");
      setPlace("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Modal
          transparent={true}
          anymationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ModalContent
            openGallery={openGallery}
            openCamera={openCamera}
            onClose={() => setModalVisible(false)}
          />
        </Modal>
        <View style={styles.cameraWrapper}>
          {camera && (
            <Camera
              style={styles.camera}
              ref={(ref) => {
                setCameraRef(ref);
              }}
              type={type}
            >
              <TouchableOpacity
                style={styles.toggleCamera}
                onPress={toggleCameraType}
              >
                <AntDesign name="sync" size={18} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          )}
          {photo && <Image source={{ uri: photo }} style={styles.camera} />}
          {!camera ? (
            <TouchableOpacity
              style={styles.button(photo)}
              onPress={() => setModalVisible(true)}
            >
              {photo ? (
                <Entypo name="edit" size={24} color="#BDBDBD" />
              ) : (
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={photo ? "#FFF" : "#BDBDBD"}
                />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={takePhoto} style={styles.button(photo)}>
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={photo ? "#FFF" : "#BDBDBD"}
              />
            </TouchableOpacity>
          )}
        </View>

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
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#FF6C00"
            style={{ marginTop: 32 }}
          />
        ) : (
          <TouchableOpacity
            style={styles.createButton(title && photo && place)}
            onPress={onSubmit}
          >
            <Text style={styles.createText(title && photo && place)}>
              Create
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
