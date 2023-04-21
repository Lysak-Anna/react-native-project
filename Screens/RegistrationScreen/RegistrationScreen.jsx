import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { styles } from "./RegistrationScreen.styles";
import { validation } from "../../helpers/fieldsValidation";

export default function RegistrationScreen({ navigation }) {
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

  const onSubmit = (data) => {
    console.log(data);
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
            <ScrollView style={styles.form}>
              <View style={styles.imgContainer}>
                <TouchableOpacity style={styles.icon}>
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
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
