import * as React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Jewelery() {
  return (
    <SafeAreaView>
        <View style={{flex: 1,padding: 16}}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Jewelery</Text>
        </View>
        </View>
    </SafeAreaView>
  );
}

export default Jewelery;