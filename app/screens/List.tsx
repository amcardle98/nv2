import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { usePresses } from "../../providers/press";

export type pressData = {
  envelopePacks: number;
  envelopesProcessed: number;
  envelopesProduced: number;
  name: string;
  softDeleted: boolean;
  speed: number;
  status: string;
};

type RouterProps = {
  navigation: NavigationProp<Record<string, string>>;
};

const List = ({ navigation }: RouterProps) => {
  const { presses } = usePresses();

  return (
    <FlatList
      style={styles.pressContainer}
      data={presses}
      renderItem={({ item }) => (
        <View style={styles.pressItem}>
          <View style={styles.pressHeader}>
            <Text style={styles.pressName}>{item.name}</Text>
            <Text>{item.status}</Text>
          </View>
          <Button
            title="Details"
            onPress={() => navigation.navigate("Details", item.name)}
          ></Button>
        </View>
      )}
      keyExtractor={(item) => item.name}
    />
  );
};

const styles = StyleSheet.create({
  pressContainer: {
    padding: 15,
    backgroundColor: "#f5f5f5", // Light background color
  },
  pressItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Adds shadow on Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow direction
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow spread
  },
  pressName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark text color
    marginBottom: 10,
  },
  pressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default List;
