import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { LightTheme } from "@theme/themes";
// ? Screens
import DetailScreen from "@screens/detail/DetailScreen";
import Login from "@screens/authstack/login/Login";
import Register from "@screens/authstack/register/Register";
import Chatlist from "@screens/appstack/chat/chatlist/Chatlist";
import Chatscreen from "@screens/appstack/chat/chatscreen/Chatscreen";
import BooksListApp from "@screens/appstack/todo/Todo";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { themes } from "assets/theme";
import Icon from "react-native-dynamic-vector-icons";
import HomeScreen from "@screens/home/HomeScreen";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const token = useSelector((state) => state.token);
  console.log("🚀 ~ Navigation ~ token:", token?.token);

  useEffect(() => {
    AsyncStorage.getItem("USERID")
      .then((result) => {
        const userID = JSON.parse(result).userId;
        console.log("userID", userID);
      })
      .catch((error) => {
        console.log("Error retrieving user ID from AsyncStorage:", error);
      });
  }, []);

  const renderTabIcon = ({ route, focused, color, size }) => {
    let iconName = "home";
    switch (route.name) {
      case SCREENS.HOME:
        iconName = focused ? "home" : "home-outline";
        break;
      case SCREENS.SEARCH:
        iconName = focused ? "search" : "search-outline";
        break;
      case SCREENS.NOTIFICATION:
        iconName = focused ? "notifications" : "notifications-outline";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    return (
      <Icon name={iconName} type="Ionicons" size={40} color={color} />
    );
  };

  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon({ route, focused, color, size }),
        })}
        tabBarOptions={{
          activeTintColor: themes?.colors?.bgBlue,
          inactiveTintColor: "gray",
          style: {
            backgroundColor: themes?.colors?.bgBlue,
          },
        }}
      >
        <Tab.Screen name={SCREENS.CHATLIST} component={Chatlist} />
        <Tab.Screen name={SCREENS.CHATSCREEN} component={Chatscreen} />
        <Tab.Screen name={SCREENS.TODO} component={BooksListApp} />
        <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token?.token ? (
          <>
            {/* <Stack.Screen name={SCREENS.SPLASHSCREEN} component={SplashScreen} /> */}
            <Stack.Screen name={SCREENS.LOGIN} component={Login} />
            <Stack.Screen name={SCREENS.REGISTER} component={Register} />
            <Stack.Screen name={SCREENS.DETAIL} component={DetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="TabNavigation" component={renderTabNavigation} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
