import React, { useState, useEffect } from "react";
import {
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import styles from "./components/style";

export default function ProfileScreen({ userToken, setToken, userId }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken
          }
        }
      );
      setUser(response.data);
      setEmail(response.data.email);
      setName(response.data.name);
      setDescription(response.data.description);
      setUsername(response.data.username);
      console.log(userId);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const updateUser = async () => {
    const sendData = await axios.put(
      `https://express-airbnb-api.herokuapp.com/user/update/${userId}`,
      {
        email,
        username,
        name,
        description
      },
      {
        headers: {
          Authorization: "Bearer " + userToken
        }
      }
    );
  };

  const updatePicture = async () => {
    // Permissions
    const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // Chose camera or camera roll
    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      // Send the file
      const uri = pickerResult.uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();

      formData.append("photo", {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`
      });

      const options = {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + userToken,
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      };

      try {
        console.log(1);
        console.log(userId);

        const sendPicture = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/upload_picture/${userId}`,
          options
        );
        console.log(2);
        setUser(sendPicture.data);
        console.log(sendPicture.data);
      } catch (error) {
        console.log(3);
        alert(error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginTop: 20 }}
        />
      ) : (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              updatePicture();
            }}
          >
            {user.photo && user.photo.length > 0 ? (
              <Image
                source={{ uri: user.photo[0].url }}
                style={styles.userAvatar}
              />
            ) : (
              <Ionicons name={"ios-person"} size={100} color={"grey"} />
            )}
          </TouchableOpacity>

          <View style={styles.input}>
            <TextInput
              value={username}
              style={[styles.underProf, styles.txtBlack, { marginTop: 21 }]}
              onChangeText={text => {
                setUser(text);
              }}
            />
            <TextInput
              value={email}
              style={[styles.underProf, styles.txtBlack, { marginTop: 21 }]}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <TextInput
              value={name}
              style={[styles.underProf, styles.txtBlack, { marginTop: 21 }]}
              onChangeText={text => {
                setName(text);
              }}
            />
            <TextInput
              value={description}
              multiline={true}
              style={[styles.txtBlack, styles.txtBox, { marginTop: 36 }]}
              onChangeText={text => {
                setDescription(text);
              }}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={[styles.button, { marginTop: 19 }]}
            title="Mettre à jour"
            onPress={async () => {
              setIsLoading(true);
              updateUser();
              setIsLoading(false);
            }}
          >
            <Text style={[styles.txtPink, { fontSize: 24 }]}>
              Mettre à jour
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={[styles.btnSignout, { marginTop: 19 }]}
        title="Se déconnecter"
        onPress={async () => {
          setToken(null);
        }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}
