import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

import styles from "./components/style";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("arno@airbnb-api.com");
  const [password, setPassword] = useState("password01");
  const [isLoading, setIsLoading] = useState(false);

  const SignIn = async () => {
    try {
      const response = await axios.post(
        "https://airbnb-api.herokuapp.com/api/user/log_in",
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.data.token) {
        setToken(response.data.token);
      } else {
        alert(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Ionicons name="ios-home" size={150} color="white" />
        </View>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View>
            <TextInput
              placeholder="Username"
              style={[styles.txtWhite, styles.under]}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={[styles.txtWhite, styles.under, { marginTop: 59 }]}
              onChangeText={text => {
                setPassword(text);
              }}
            />
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="white"
                style={{ marginTop: 20 }}
              />
            ) : (
              <TouchableOpacity
                style={[styles.button, { marginTop: 106 }]}
                title="Sign in"
                onPress={async () => {
                  setIsLoading(true);
                  SignIn();
                  setIsLoading(false);
                }}
              >
                <Text style={[styles.txtPink, { fontSize: 24 }]}>
                  Se connecter
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={[
                  styles.txtWhite,
                  { marginTop: 43, textDecorationLine: "underline" }
                ]}
              >
                Pas de compte ? S'inscrire
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
