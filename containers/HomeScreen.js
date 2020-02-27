import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import axios from "axios";

import Card from "./components/Card";
import styles from "./components/style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setData(response.data.rooms);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.home}>
      <View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="white"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            contentContainerStyle={styles.rooms}
            data={data}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Room", { roomId: item._id });
                  }}
                >
                  <Card
                    picture={item.photos[0]}
                    price={item.price}
                    title={item.title}
                    rating={item.ratingValue}
                    reviews={item.reviews}
                    avatar={item.user.account.photos[0]}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
