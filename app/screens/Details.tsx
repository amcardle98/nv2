import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { usePresses } from "../../providers/press";

const Details = ({ route }: { route: any }) => {
  const { presses } = usePresses();
  const press = presses.find((press) => press.name === route.params);

  if (!press) {
    return (
      <View>
        <Text>Press not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{press.name}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.info}>
          <Text>Envelopes Processed: {press.envelopesProcessed}</Text>
          <Text>Envelopes Produced: {press.envelopesProduced}</Text>
          <Text>Envelopes Packs: {press.envelopePacks}</Text>
          <Text>Speed: {press.speed}</Text>
          <Text>Status: {press.status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 15,
    marginHorizontal: 15,
  },
  name: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default Details;
