import {View, Text, Image, Stylesheet, ScrollView} from 'react-native'

const ProductDetailScreen = ({ route }) => {
    const {product} = route.params;

    return(
        <ScrollView style={styles.container}>
            <Image source={{uri: product.image}} style={Stylesheet.image} />
            <Text style={Stylesheet.name}>{product.title}</Text>
            <Text style={Stylesheet.description}>{product.description}</Text>
            <Text style={Stylesheet.price}>${product.price}</Text>
        </ScrollView>
    );
};

const styles = Stylesheet.create({
    container:{
        flex: 1,
        padding: 20,
        alignItems: 'center'
    }
})