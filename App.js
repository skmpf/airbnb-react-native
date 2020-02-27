import React, { useState, useEffect } from "react";
import { AsyncStorage, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";

import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import AroundMe from "./containers/AroundMe";
import Room from "./containers/Room";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator>
                <Tab.Screen name="Home">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Home">
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen name="Room">{() => <Room />}</Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Around me">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Around me">
                        {() => <AroundMe />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Settings">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Settings">
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                      <Stack.Screen name="Profile">
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
