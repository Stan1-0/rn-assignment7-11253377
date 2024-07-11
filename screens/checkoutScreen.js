import {
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Checkout = ({route}) => {
  const {items} = route.params || {}
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchSelectedItems = async () => {
      const storedItems = await AsyncStorage.getItem('@selectedItems');
      setSelectedItems(storedItems? JSON.parse(storedItems) : []);
    };
    fetchSelectedItems();
  }, []);

  const toggleSelection = (itemId) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter(id => id !== itemId) // Remove item if already selected
        : [...prevSelectedItems, itemId] // Add item if not selected
    );
  };

  const removeSelectedItem = async (itemId) => {
    const updatedItems = selectedItems.filter(id => id!== itemId);
    await AsyncStorage.setItem('@selectedItems', JSON.stringify(updatedItems));
    setSelectedItems(updatedItems);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require("../assets/Logo.png")} />
            <View style={styles.icons}>
              <TouchableOpacity style={styles.button}>
                <Image source={require("../assets/Search.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
          <Text style={styles.subtitle}>CHECKOUT</Text>
          </View>
          <View style={styles.grid}>
          <FlatList
            data={selectedItems.filter(item => item !== null)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
            <View  style={styles.card}>
            <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image}/>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.addbutton} onPress={() => removeSelectedItem(item)}>
                  <Image source={require('../assets/remove.png')}/>
                </TouchableOpacity>
            </View>
            </View>
             )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16",
  },
  icons: {
    flexDirection: "row",
  },
  button: {
    padding: 8,
  },
  imageContainer:{
    position: 'relative',
  },
  card:{
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  addbutton:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#676767',
    marginBottom: 8,
  },
  price:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dd8560'
  },
  section: {
    
    alignItems: 'center',
    padding: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Checkout;
