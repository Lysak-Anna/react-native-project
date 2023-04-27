import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  ActivityIndicator,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { signUp } from "../../redux/auth/authOperations";
import { selectIsLoading } from "./../../redux/auth/authSelectors";
import { pickImage } from "../../firebase/methods/pickImage";
import Input from "../../components/Input/Input";
import { styles } from "./RegistrationScreen.styles";
import { validation } from "../../helpers/fieldsValidation";

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);

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

  const onSubmit = async (data) => {
    data.avatar = image;
    dispatch(signUp(data));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/background/Photo.png")}
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
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => pickImage(setImage)}
                >
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
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#FF6C00"
                  style={{ marginTop: 27, marginBottom: 16 }}
                />
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.label}>Sign up</Text>
                </TouchableOpacity>
              )}

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
