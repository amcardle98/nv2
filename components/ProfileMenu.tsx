import React, { useState } from "react";
import { Menu, Divider, IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";

export function ProfileMenu() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const auth = FIREBASE_AUTH;

  return (
    <Menu
      theme={{ colors: { primary: "#6200ee" } }}
      style={styles.menu}
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition="top"
      anchor={<IconButton icon="menu" onPress={openMenu} />}
    >
      {/* <Menu.Item onPress={() => console.log("Profile")} title="Profile" />
      <Menu.Item onPress={() => console.log("Settings")} title="Settings" />
      <Divider /> */}
      <Menu.Item
        onPress={() =>
          //firebase sign out
          auth.signOut()
        }
        title="Logout"
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  menu: {
    marginTop: 40,
  },
});
