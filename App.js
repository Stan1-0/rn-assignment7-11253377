import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from './components/homeScreen';
import Checkout from "./components/checkoutScreen";
import Store from "./components/storeScreen";
import Locations from "./components/locationScreen";
import Blog from "./components/blogScreen";
import Jewelery from "./components/jeweleryScreen";
import Electronic from "./components/electronicScreen";
import Clothing from "./components/clothingScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack(){
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
         name= 'Home'
         component = {Home}
         options={{ headerShown: false }}
         />
        <Stack.Screen
         name= 'Checkout'
         component = {Checkout}
         options={{ headerShown: false }}
         />
      </Stack.Navigator>
  );
}

function MyDrawer(){
  return(
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Store" component={Store} options={{ headerShown: false }}/>
      <Drawer.Screen name="Locations" component={Locations} options={{ headerShown: false }} />
      <Drawer.Screen name="Blog" component={Blog} options={{ headerShown: false }}/>
      <Drawer.Screen name="Jewelery" component={Jewelery} options={{ headerShown: false }}/>
      <Drawer.Screen name="Electronic" component={Electronic} options={{ headerShown: false }}/>
      <Drawer.Screen name="Clothing" component={Clothing} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
} 

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
      <MyDrawer/>
    </NavigationContainer>
  );
}

