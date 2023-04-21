import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

export default function Home({ navigation }) {
  return (
    <>
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
        initialRouteName="Posts"
        backBehavior="history"
      >
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign
                name="appstore-o"
                size={24}
                color={focused ? "#FFF" : "rgba(33, 33, 33, 0.8)"}
              />
            ),
            headerShown: false,
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
          }}
        />
      </Tab.Navigator>
    </>
  );
}
