import React, { useState, useEffect,} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from "../components/productCard";
import Menu from "../components/menu";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
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

const handleAddToCart = async (product) => {
  try {
    const storedCart = await AsyncStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];
    cart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    console.log('Added to cart:', product);
    Alert.alert('Success', 'Product added to cart');
  } catch (error) {
    console.error('Error adding to cart:', error);
    Alert.alert('Error', 'Could not add product to cart');
  }
};
 

  const checkout = () => {
    navigation.navigate("Checkout", { items: selectedItems });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <Image
          source={require("../assets/Menu.png")}
          s
        />
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
            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
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
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({item}) => (
              <ProductCard
              image={item.image}
              name={item.title}
              description={item.description}
              price={item.price}
              />
            )}
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