import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from './screens/homeScreen';
import Store from "./screens/storeScreen";
import Locations from "./screens/locationScreen";
import Blog from "./screens/blogScreen";
import Jewelery from "./screens/jeweleryScreen";
import Electronic from "./screens/electronicScreen";
import Clothing from "./screens/clothingScreen";
import Checkout from "./screens/checkoutScreen";

const Drawer = createDrawerNavigator();
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

