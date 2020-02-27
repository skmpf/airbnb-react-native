import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  View
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import MapView from "react-native-maps";

import styles from "./components/style";

function Room() {
  const { params } = useRoute();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [stars, setStars] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room/" + params.roomId
      );
      setData(response.data);

      const stars = [];
      for (let i = 0; i < 5; i++) {
        if (i < response.data.ratingValue) {
          stars.push(
            <Ionicons
              key={i}
              style={{ marginRight: 9 }}
              name="ios-star"
              size={20}
              color="#E2B01C"
            />
          );
        } else {
          stars.push(
            <Ionicons
              key={i}
              style={{ marginRight: 9 }}
              name="ios-star"
              size={20}
              color="#B3B2B3"
            />
          );
        }
      }
      setStars(stars);
      setIsLoading(false);
    };
    fetchData();
    console.log(data);
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginTop: 20 }}
        />
      ) : (
        <SafeAreaView>
          <Image source={{ uri: data.photos[0] }} style={styles.roomPic} />
          <Text style={styles.roomPrice}>{data.price} €</Text>
          <View style={styles.room}>
            <View style={styles.overview}>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizedMode="tail"
                  style={{ fontSize: 16, width: 245, marginRight: 15 }}
                >
                  {data.title}
                </Text>
                <View style={styles.stars}>
                  {stars}
                  <Text style={styles.reviews}>{data.reviews} avis</Text>
                </View>
              </View>
              <Image
                source={{ uri: data.user.account.photos[0] }}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.roomDesc}>{data.description}</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: data.loc[1],
                longitude: data.loc[0],
                latitudeDelta: 0.002,
                longitudeDelta: 0.002
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: data.loc[1],
                  longitude: data.loc[0]
                }}
              />
            </MapView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

export default Room;
