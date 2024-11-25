import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Login from "./app/screens/Login";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { PressProvider } from "./providers/press";
import { PaperProvider } from "react-native-paper";
import { ProfileMenu } from "./components/ProfileMenu";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <PressProvider>
      <PaperProvider>
        <InsideStack.Navigator
          screenOptions={{
            headerLeft: () => <ProfileMenu />,
          }}
        >
          <InsideStack.Screen name="Dashboard" component={List} />
          <InsideStack.Screen name="Details" component={Details} />
        </InsideStack.Navigator>
      </PaperProvider>
    </PressProvider>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="InsideLayout"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
