import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDrawerStatus } from "@react-navigation/drawer";
import ProductCard from "../components/productCard";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('@selectedItems');
        if (storedItems) {
          setSelectedItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error("Failed to retrieve selected items:", error);
      }
    };
    fetchSelectedItems();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/1');
        const json = await response.json();
        setProducts(json);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <ProductCard
      image={item.image}
      name={item.title}
      description={item.description}
      price={item.price}
    />
  );

  if (loading) {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

  const toggleSelection = async (itemId) => {
    let updatedItems = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    try {
      await AsyncStorage.setItem('@selectedItems', JSON.stringify(updatedItems));
      setSelectedItems(updatedItems);
    } catch (error) {
      console.error("Failed to update selected items:", error);
    }
  };

  const isDrawerOpen = useDrawerStatus();

  const checkout = () => {
    navigation.navigate("Checkout", { items: selectedItems });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.toggleDrawer()}>
              <Image source={require('../assets/Menu.png')}/>
            </TouchableOpacity>
            <Image source={require('../assets/Logo.png')} />
            <View style={styles.icons}>
              <TouchableOpacity style={styles.button}>
                <Image source={require('../assets/Search.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={checkout}>
                <Image source={require('../assets/shoppingBag.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>OUR STORY</Text>
            <View style={styles.icons}>
              <TouchableOpacity style={styles.button}>
                <Image source={require('../assets/Listview.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Image source={require('../assets/Filter.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Home;