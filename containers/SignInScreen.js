import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./components/style";

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const SignIn = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
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
        setId(response.data.id);
      } else {
        alert(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Ionicons name="ios-home" size={150} color="white" />
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View>
            <TextInput
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor="#E1E1E1"
              style={[styles.txtWhite, styles.under, styles.input]}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#E1E1E1"
              secureTextEntry={true}
              style={[
                styles.txtWhite,
                styles.under,
                styles.input,
                { marginTop: 59 }
              ]}
              onChangeText={text => {
                setPassword(text);
              }}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#F1485C"
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}
