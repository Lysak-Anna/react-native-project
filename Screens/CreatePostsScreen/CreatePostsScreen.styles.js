import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 32,
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
    marginBottom: 8,
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
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
    fontFamily: "Roboto - medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
});
