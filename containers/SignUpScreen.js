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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./components/style";

export default function SignUpScreen({ setToken, setId }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SignUp = async () => {
    try {
      if (confirm === password) {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email,
            username,
            name,
            description,
            password
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        setToken(response.data.token);
        setId(response.data.id);
        setImmediate(response.data.id);
      } else {
        alert("Les mots de passe doivent être identique");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <Text style={[styles.txtWhite, { fontSize: 24 }]}>
          Rejoignez-nous !
        </Text>

        <View style={styles.input}>
          <TextInput
            placeholder="email"
            style={[styles.under, styles.txtWhite, { marginTop: 60 }]}
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="username"
            style={[styles.under, styles.txtWhite, { marginTop: 36 }]}
            onChangeText={text => {
              setUsername(text);
            }}
          />
          <TextInput
            placeholder="name"
            style={[styles.under, styles.txtWhite, { marginTop: 24 }]}
            onChangeText={text => {
              setName(text);
            }}
          />
          <TextInput
            placeholder="présentez-vous en quelques mots..."
            multiline={true}
            style={[styles.txtWhite, styles.txtBox, { marginTop: 29 }]}
            onChangeText={text => {
              setDescription(text);
            }}
          ></TextInput>
          <TextInput
            placeholder="mot de passe"
            secureTextEntry={true}
            style={[styles.under, styles.txtWhite, { marginTop: 35 }]}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <TextInput
            placeholder="confirmer le mot de passe"
            secureTextEntry={true}
            style={[styles.under, styles.txtWhite, { marginTop: 36 }]}
            onChangeText={text => {
              setConfirm(text);
            }}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="white"
            style={{ marginTop: 20 }}
          />
        ) : (
          <TouchableOpacity
            style={[styles.button, { marginTop: 61 }]}
            title="Sign up"
            onPress={async () => {
              setIsLoading(true);
              SignUp();
              setIsLoading(false);
            }}
          >
            <Text style={[styles.txtPink, { fontSize: 24 }]}>S'inscrire</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text
            style={[
              styles.txtWhite,
              { marginTop: 45, textDecorationLine: "underline" }
            ]}
          >
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
