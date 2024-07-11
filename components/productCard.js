import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

const ProductCard=({image, name, description, price}) =>{
    const shortDescription = description.length > 50 ? `${description.substring(0,50)}...`: description;

return(
    <View style={styles.grid}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <TouchableOpacity style={styles.addbutton} key={item.id} onPress={() => toggleSelection(item)}>
          <Image source={require('../assets/add_circle.png')}/>
        </TouchableOpacity>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{shortDescription}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
);};

const styles = StyleSheet.create({
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        gap: 10,
      },
      imageContainer: {
        position: 'relative',
      },
      addbutton: {
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
      }
})

export default ProductCard;