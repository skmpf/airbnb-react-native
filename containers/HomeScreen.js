import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import axios from "axios";

import Card from "./components/Card";

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
    <ScrollView>
      <View style={styles.container}>
        <View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="white"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
              {data.map(room => {
                return (
                  <Card
                    key={room._id}
                    data={data}
                    picture={{ uri: room.photos[0] }}
                    price={room.price}
                    title={room.title}
                    rating={room.ratingValue}
                    reviews={room.reviews}
                    avatar={{ uri: room.user.account.photos[0] }}
                  />
                );
              })}
            </>
          )}
        </View>

        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 27
  }
});
