
import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const CARD_WIDTH = screenWidth - 44;

const clients = [
  {
    id: "1",
    image: require("../../../../assets/imagenes/clientes-mes/Cliente1.jpeg"),
  },
  {
    id: "2",
    image: require("../../../../assets/imagenes/clientes-mes/Cliente2.jpeg"),
  },
];

export default function ClientsOfMonth() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_WIDTH);

    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
    <Text style={styles.title}>🎄 Clientes del mes ✨</Text>
  <Text style={styles.subtitle}>
    Celebramos a nuestra comunidad Cafilovers.
  </Text>
</View>

      {/* Carrusel */}
      <FlatList
        data={clients}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.imageOverlay}>
              <Text style={styles.imageLabel}>
                Cafilovers
              </Text>
            </View>
          </View>
        )}
      />

      {/* Indicadores */}
      <View style={styles.indicators}>
        {clients.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 25,
  },

header: {
  backgroundColor: "#9E252D",
  paddingVertical: 14,
  paddingHorizontal: 18,
  borderTopLeftRadius: 18,
  borderTopRightRadius: 18,
  borderWidth: 1,
  borderColor: "#C99A52",
  marginBottom: 0,
},

title: {
  fontSize: 19,
  fontWeight: "bold",
  color: "#FFFFFF",
},

subtitle: {
  fontSize: 13,
  color: "#F7E5D0",
  marginTop: 4,
},

card: {
  width: CARD_WIDTH,
  height: 220,
  borderBottomLeftRadius: 18,
  borderBottomRightRadius: 18,
  overflow: "hidden",
  backgroundColor: "#E8DED2",
},

  image: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  imageLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    gap: 7,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#D5C8BA",
  },

  activeDot: {
    width: 22,
    backgroundColor: "#A8754F",
  },
});
