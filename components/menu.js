import { View, Stylesheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Menu = ({isMenuOpen, setIsMenuOpen}) => {
    const navigation = useNavigation();
    const menuItems = [
        {name: 'Home', screen: 'Home'},
        {name: 'Checkout', screen: 'Checkout'},
        {name: 'Store', screen: 'Store'},
        {name: 'Locations', screen: 'Locations'},
        {name: 'Blog', screen: 'Blog'},
        {name: 'Jewelery', screen: 'Jewelery'},
        {name: 'Electronic', screen: 'Electronic'},
    ];

    return(
        <View style={[styles.container, isMenuOpen ? styles.menuOpen : styles.menuClosed]}>
            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.closeButton}>
                <Image source={require('../assets/Close.png')} style={styles.menuClose}/>
            </TouchableOpacity>
        <View style={styles.header}>
            <Text>ERIC ATSU</Text>
            <View style={styles.line}/>    
        </View>
        {menuItems.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => {
          setIsMenuOpen(false); 
          navigation.navigate(item.screen); 
        }}>
          <Text style={styles.menuItem}>{item.name}</Text>
        </TouchableOpacity>
      ))}
        </View>
    );
}


const styles = Stylesheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '63.5%',
        height: 1000,
        backgroundColor: 'white',
        zIndex: 10,
    },
    menuClose: {
        padding: 10,
    },
    menuOpen:{
        transform: [{ translateX: 0}],
    },
    menuClosed: {
        transform: [{ translateX: -1000}],
    }

})

export default Menu;