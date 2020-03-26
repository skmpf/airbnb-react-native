import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useActionSheet } from "@expo/react-native-action-sheet";

import styles from "./components/style";

export default function ProfileScreen({ setToken, setId }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const { showActionSheetWithOptions } = useActionSheet();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");
    const response = await axios.get(
      `https://express-airbnb-api.herokuapp.com/user/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    setUser(response.data);
    setEmail(response.data.email);
    setName(response.data.name);
    setDescription(response.data.description);
    setUsername(response.data.username);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateUser = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");
    const sendData = await axios.put(
      `https://express-airbnb-api.herokuapp.com/user/update/${id}`,
      {
        email,
        username,
        name,
        description
      },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
  };

  const handleImagePicked = useCallback(async pickerResult => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");

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

    try {
      const sendPicture = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/upload_picture/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  });

  const _onOpenActionSheet = () => {
    const options = ["Prendre une photo", "Bibliothèque photo", "Annuler"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        // Action depending on the button index selected
        if (buttonIndex === 0) {
          // take a picture with camera
          takePicture();
        }
        if (buttonIndex === 1) {
          // get a photo from library
          getFromLibrary();
        }
      }
    );
  };

  const takePicture = async () => {
    const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // action only if user allows permission to camera AND camera roll
    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });
      // console.log(pickerResult);
      handleImagePicked(pickerResult);
    }
  };

  const getFromLibrary = async () => {
    const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // action only if user allows permission to camera roll
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });
      // console.log(pickerResult);
      handleImagePicked(pickerResult);
    }
  };

  return (
    <View style={[{ flex: 1, alignItems: "center" }, styles.backWhite]}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#F1485C"
          style={{ height: "100%" }}
        />
      ) : (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              // _onOpenActionSheet();
              getFromLibrary();
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
                setUsername(text);
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
              numberOfLines={8}
              maxLength={200}
              style={[styles.txtBlack, styles.profileBox, { marginTop: 36 }]}
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
          <TouchableOpacity
            style={[styles.btnSignout, { marginTop: 19 }]}
            title="Se déconnecter"
            onPress={async () => {
              setId(null);
              setToken(null);
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>Se déconnecter</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
