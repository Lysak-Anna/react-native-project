import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import NestedPostsScreen from "../NestedPostsScreen/NestedPostsScreen";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authOperations";

const Tab = createBottomTabNavigator();

export default function PostsScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingRight: 50,
          paddingLeft: 50,
        },
        tabBarItemStyle: {
          width: 70,
          height: 40,
          borderRadius: 20,
        },

        tabBarActiveBackgroundColor: "#FF6C00",
      }}
      backBehavior="history"
    >
      <Tab.Screen
        name="Posts"
        component={NestedPostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "#FFF" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => dispatch(logOut())}
              style={{ marginRight: 16 }}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
            fontFamily: "Roboto - medium",
          },
        }}
      />
      <Tab.Screen
        name="Create post"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="plus"
              size={24}
              color={focused ? "#FFF" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 20 }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
            fontFamily: "Roboto - medium",
          },

          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "#FFF" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
