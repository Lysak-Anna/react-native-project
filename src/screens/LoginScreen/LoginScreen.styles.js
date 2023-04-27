import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 132,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto - medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    marginBottom: 33,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  label: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto - regular",
    color: "#fff",
  },
  link: {
    fontSize: 16,
    lineHeight: 18.75,
    fontFamily: "Roboto - regular",
    color: "#1B4371",
    textAlign: "center",
  },
});
