import React from "react";
import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../components/style";

function Card({ picture, price, title, rating, reviews, avatar }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
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

  return (
    <View style={styles.card}>
      <Image source={{ uri: picture }} style={styles.picture} />
      <Text style={styles.price}>{price} €</Text>
      <View style={styles.overview}>
        <View>
          <Text
            numberOfLines={1}
            ellipsizedMode="tail"
            style={{ fontSize: 16, width: 245, marginRight: 15 }}
          >
            {title}
          </Text>
          <View style={styles.stars}>
            {stars}
            <Text style={styles.reviews}>{reviews} avis</Text>
          </View>
        </View>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </View>
    </View>
  );
}

export default Card;
