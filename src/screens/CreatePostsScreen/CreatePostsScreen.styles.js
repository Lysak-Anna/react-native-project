import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 32,
    paddingBottom: 34,
    paddingLeft: 16,
    paddingRight: 16,
  },
  cameraWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginBottom: 32,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    objectFit: "cover",
  },
  toggleCamera: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 16,
    left: 16,
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#FFF",
  },
  button: (photo) => ({
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: photo ? "rgba(255, 255, 255, 0.3)" : "#FFF",
    width: 60,
    height: 60,
    borderRadius: 50,
  }),
  text: {
    fontFamily: "Roboto - regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingBottom: 15,

    marginBottom: 32,
    fontFamily: "Roboto - medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  createButton: (props) => ({
    backgroundColor: props ? "#FF6C00" : "#F6F6F6",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
  }),
  createText: (props) => ({
    textAlign: "center",
    color: props ? "#FFF" : "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto - regular",
  }),
  deleteButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",

    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  locationIcon: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -3,
      },
      android: {
        top: 3,
      },
    }),
  },
});
