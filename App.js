import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './screens/HomeScreen';
import Store from "./screens/StoreScreen";
import Locations from "./screens/LocationScreen";
import Blog from "./screens/BlogScreen";
import Jewelery from "./screens/JeweleryScreen";
import Electronic from "./screens/ElectronicScreen";
import Clothing from "./screens/ClothingScreen";
import Checkout from "./screens/CheckoutScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
      <>
        <Stack.Screen name= "Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Store" component={Store} options={{ headerShown: false }}/>
        <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }}/>
        <Stack.Screen name="Locations" component={Locations} options={{ headerShown: false }} />
        <Stack.Screen name="Blog" component={Blog} options={{ headerShown: false }}/>
        <Stack.Screen name="Jewelery" component={Jewelery} options={{ headerShown: false }}/>
        <Stack.Screen name="Electronic" component={Electronic} options={{ headerShown: false }}/>
        <Stack.Screen name="Clothing" component={Clothing} options={{ headerShown: false }}/>
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

