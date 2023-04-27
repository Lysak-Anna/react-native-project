import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";

import { styles } from "./Input.styles";

export default function Input({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
  isPassword = false,
  toggleShowPassword,
  show,
}) {
  const [focus, setFocus] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input(focus)}
            placeholder={placeholder}
            placeholderTextColor="#BDBDBD"
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            isPassword={isPassword}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
          {isPassword && (
            <>
              {!show ? (
                <Entypo
                  name="eye-with-line"
                  size={20}
                  color="#1B4371"
                  style={styles.icon}
                  onPress={toggleShowPassword}
                />
              ) : (
                <Entypo
                  name="eye"
                  size={20}
                  color="#1B4371"
                  style={styles.icon}
                  onPress={toggleShowPassword}
                />
              )}
            </>
          )}
        </View>
      )}
    />
  );
}
