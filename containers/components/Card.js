import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../components/style";

function Card({ data, picture, price, title, rating, reviews, avatar }) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Ionicons
        style={{ marginRight: 9 }}
        name="ios-star"
        size={20}
        color="#E2B01C"
      />
    );
  }
  for (let i = 0; i < 5 - rating; i++) {
    stars.push(
      <Ionicons
        style={{ marginRight: 9 }}
        name="ios-star"
        size={20}
        color="#B3B2B3"
      />
    );
  }

  return (
    <>
      {/* <FlatList
data={data}
renderItem={({item})}
/> */}
      <View style={styles.card}>
        <Image source={picture} style={styles.picture} />
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
          <Image source={avatar} style={styles.avatar} />
        </View>
      </View>
    </>
  );
}

export default Card;
