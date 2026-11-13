import { Clock, Coffee, MapPin, Navigation } from "lucide-react-native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SectionHeader from "../../src/components/common/SectionHeader";
// hola
const sucursales = [
  {
    id: 1,
    nombre: "Cafiver - Centro",
    direccion: "Dirección de la primera sucursal",
    horario: "Horario por confirmar",
    imagen: require("../../assets/cafeteria-centro.jpg"),
  },
  {
    id: 2,
    nombre: "Cafiver - Ixtac",
    direccion: "Dirección de la segunda sucursal",
    horario: "Horario por confirmar",
    imagen: require("../../assets/cafeteria-ixtac.jpg"),
  },
];

export default function CafeteriasScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        title="Nuestras cafeterías"
        subtitle="Encuentra tu Cafiver más cercano"
      />

      <View style={styles.banner}>
        <Coffee color="#E8D5C4" size={35} />

        <Text style={styles.bannerTitle}>
          ¡Siempre hay un buen momento para un café!
        </Text>

        <Text style={styles.bannerText}>
          Descubre nuestras sucursales y disfruta tu bebida favorita.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Nuestras sucursales</Text>

      {sucursales.map((sucursal) => (
        <View key={sucursal.id} style={styles.card}>
          {/* Fotografía de la sucursal */}
          <Image
            source={sucursal.imagen}
            style={
              sucursal.id === 1 ? styles.branchImageCentro : styles.branchImage
            }
            resizeMode="cover"
          />

          <View style={styles.cardContent}>
            <Text style={styles.branchName}>{sucursal.nombre}</Text>

            <View style={styles.infoRow}>
              <MapPin color="#A77B59" size={18} />
              <Text style={styles.infoText}>{sucursal.direccion}</Text>
            </View>

            <View style={styles.infoRow}>
              <Clock color="#A77B59" size={18} />
              <Text style={styles.infoText}>{sucursal.horario}</Text>
            </View>

            <Pressable
              style={styles.button}
              onPress={() => {
                console.log("Abrir ubicación:", sucursal.nombre);
              }}
            >
              <Navigation color="#FFFFFF" size={18} />
              <Text style={styles.buttonText}>Cómo llegar</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EE",
  },
  content: {
    padding: 22,
    paddingTop: 35,
    paddingBottom: 40,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#38251D",
  },
  subtitle: {
    color: "#8C8178",
    fontSize: 14,
    marginTop: 7,
    marginBottom: 25,
  },
  banner: {
    backgroundColor: "#38251D",
    borderRadius: 23,
    padding: 24,
    marginBottom: 30,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 15,
  },
  bannerText: {
    color: "#E8D5C4",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
  sectionTitle: {
    color: "#38251D",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 20,
  },
  branchImage: {
    width: "100%",
    height: 190,
  },

  branchImageCentro: {
    width: "100%",
    height: 190,
  },
  cardContent: {
    padding: 18,
  },
  branchName: {
    color: "#38251D",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    color: "#8C8178",
    fontSize: 13,
    marginLeft: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "#38251D",
    padding: 14,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 9,
  },
});
