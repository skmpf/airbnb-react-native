import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function SettingsScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
