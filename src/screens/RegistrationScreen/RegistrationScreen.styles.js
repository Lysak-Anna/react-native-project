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
    overflow: "visible",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    paddingBottom: 66,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imgContainer: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
  icon: {
    position: "absolute",
    bottom: 16,
    right: -12,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto - medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    marginBottom: 33,
    marginTop: 32,
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
