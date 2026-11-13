import { useEffect, useRef } from "react";

import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
//Fabian no estuvo aqui

import HomeHeader from "../../src/features/home/ui/HomeHeader";
import LocationCard from "../../src/features/home/ui/LocationCard";
import LoyaltyCard from "../../src/features/loyalty/ui/LoyaltyCard";
import PromotionCard from "../../src/features/promotions/ui/PromotionCard";
import ClientsOfMonth from "../../src/features/home/ui/ClientesOfMonth";


export default function HomeScreen() {
  const snowY = useRef(
    Array.from({ length: 12 }, () => new Animated.Value(-50)),
  ).current;

  useEffect(() => {
    const animations = snowY.map((position, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(position, {
            toValue: 500,
            duration: 3500 + index * 300,
            useNativeDriver: true,
          }),
          Animated.timing(position, {
            toValue: -50,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );
    });

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, []);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Encabezado */}
          <HomeHeader />

          {/* Tarjeta de fidelización */}
          <LoyaltyCard />
          {/* Clientes del mes */}
<ClientsOfMonth />

          {/* Promociones */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promociones para ti</Text>

            <Text style={styles.seeMore}>Ver todas</Text>
          </View>

          <PromotionCard
            titulo="Miércoles de frappes"
            descripcion="Disfruta tu frappe por solo $50"
            tipo="gift"
          />

          <PromotionCard
            titulo="Cada visita cuenta"
            descripcion="Acumula 8 sellos y descubre tu recompensa."
            tipo="coffee"
          />

          {/* Sucursales */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Encuéntranos</Text>
          </View>

          <LocationCard
            nombre="Nuestras cafeterías"
            descripcion="Consulta nuestras sucursales"
          />
        </View>
      </ScrollView>

      {/* Navegación inferior */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F4EE",
  },

  scroll: {
    flex: 1,
  },

  container: {
    position: "relative",
    padding: 22,
    paddingTop: 18,
    paddingBottom: 30,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#38251D",
  },

  seeMore: {
    color: "#A8754F",
    fontSize: 13,
    fontWeight: "600",
  },
});
