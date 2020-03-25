import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import MapView from "react-native-maps";
import Carousel from "react-native-snap-carousel";

import styles from "./components/style";

function Room() {
  const { params } = useRoute();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [stars, setStars] = useState();

  const _renderItem = ({ item, index }) => {
    return <Image style={styles.roomPic} source={{ uri: item }} />;
  };

  const deviceWidth = Dimensions.get("window").width;

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
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#F1485C"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView style={[styles.backWhite, { height: "100%" }]}>
          <Carousel
            ref={c => {
              let _carousel = c;
            }}
            data={data.photos}
            renderItem={_renderItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth}
            loop={true}
          />
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default Room;
