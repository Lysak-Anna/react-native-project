import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../../routing";
import { isLoggedIn } from "../../redux/auth/authOperations";
import { selectIsAuth } from "../../redux/auth/authSelectors";

export default function Main() {
  const dispatch = useDispatch();
  const user = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const routing = useRoute(user);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
