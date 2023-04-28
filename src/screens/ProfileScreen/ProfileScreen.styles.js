import { Platform } from "react-native";

export const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  image: {
    justifyContent: "center",
    paddingTop: 240,
  },
  profileContainer: {
    overflow: "visible",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 160,
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
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    position: "absolute",
    bottom: 16,
    right: -12,
  },
  name: {
    fontFamily: "Roboto - medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",

    marginBottom: 32,
  },
  photo: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    objectFit: "cover",
    marginBottom: 8,
  },
  title: {
    fontFamily: "Roboto - medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 11,
  },
  place: {
    fontFamily: "Roboto - regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  count: {
    fontFamily: "Roboto - regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentIcon: {
    ...Platform.select({
      android: {
        marginBottom: 6,
      },
    }),
  },
};
