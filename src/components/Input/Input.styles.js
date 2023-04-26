export const styles = {
  container: {
    position: "relative",
  },
  input: (focus) => ({
    borderWidth: 1,
    borderColor: focus ? "#FF6C00" : "#E8E8E8",
    backgroundColor: focus ? "#FFF" : "#F6F6F6",
    borderRadius: 8,
    height: 50,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 18.75,
    fontFamily: "Roboto - regular",
    color: "#212121",
  }),
  icon: {
    position: "absolute",
    top: 14,
    right: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    alignSelf: "stretch",
    marginTop: -15,
  },
};
