import { useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./RegistrationScreen.styles";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [data, setData] = useState(initialState);
  const onSubmit = () => {
    console.log(data);
    setData(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/background/Photo.png")}
          style={styles.image}
        >
          <View style={styles.form}>
            <Text style={styles.title}>Sign up</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Login"
                  placeholderTextColor="#BDBDBD"
                  value={data.login}
                  onChangeText={(value) =>
                    setData((prevState) => ({ ...prevState, login: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  value={data.email}
                  onChangeText={(value) =>
                    setData((prevState) => ({ ...prevState, email: value }))
                  }
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  value={data.password}
                  onChangeText={(value) =>
                    setData((prevState) => ({ ...prevState, password: value }))
                  }
                  secureTextEntry
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={onSubmit}
            >
              <Text style={styles.label}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
