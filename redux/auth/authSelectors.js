export const selectIsAuth = (state) => state.auth.isAuth;
export const selectId = (state) => state.auth.id;
export const selectUser = (state) => ({
  username: state.auth.username,
  email: state.auth.email,
  id: state.auth.id,
});