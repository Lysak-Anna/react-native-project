import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

import { auth, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { signUp } from "../../redux/auth/authOperations";

import Input from "../../components/Input/Input";
import { styles } from "./RegistrationScreen.styles";
import { validation } from "../../helpers/fieldsValidation";

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShow(!show);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadPhoto = async () => {
    console.log(image);
    const avatar = await fetch(image);
    console.log(avatar);
    const blobPhoto = await avatar.blob();
    const photoId = nanoid();
    const imagesRef = ref(storage, `avatars/${photoId}`);
    await uploadBytes(imagesRef, blobPhoto);
    const url = await getDownloadURL(imagesRef);
    console.log("upload");
    return url;
  };

  const onSubmit = async (data) => {
    await dispatch(signUp(data));
    if (image) {
      const avatar = await uploadPhoto();
      await updateProfile(auth.currentUser, {
        photoURL: avatar,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/background/Photo.png")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.select({
              ios: -170,
              android: -100,
            })}
          >
            <View style={styles.form}>
              <View style={styles.imgContainer}>
                {image && (
                  <Image source={{ uri: image }} style={styles.avatar} />
                )}
                <TouchableOpacity style={styles.icon} onPress={pickImage}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Sign up</Text>

              <Input
                control={control}
                placeholder="Username"
                name="username"
                rules={validation.username}
              />
              <Input
                placeholder="Email"
                control={control}
                name="email"
                rules={validation.email}
              />

              <Input
                placeholder="Password"
                control={control}
                name="password"
                rules={validation.password}
                secureTextEntry={show === true ? false : true}
                isPassword={true}
                toggleShowPassword={toggleShowPassword}
                show={show}
              />

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.label}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
