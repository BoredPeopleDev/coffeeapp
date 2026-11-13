import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings,
  User,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import SectionHeader from "../../src/components/common/SectionHeader";

const opciones = [
  {
    id: 1,
    titulo: "Mis datos personales",
    Icon: User,
  },
  {
    id: 2,
    titulo: "Mis sucursales favoritas",
    Icon: MapPin,
  },
  {
    id: 3,
    titulo: "Configuración",
    Icon: Settings,
  },
  {
    id: 4,
    titulo: "Ayuda y soporte",
    Icon: HelpCircle,
  },
];

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader
        title="Mi perfil"
        subtitle="Administra tu cuenta Cafilovers"
      />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <User color="#FFFFFF" size={38} />
        </View>

        <Text style={styles.name}>Eduardo Rodríguez</Text>
        <Text style={styles.member}>Miembro Cafilovers</Text>

        <View style={styles.divider} />

        <View style={styles.contactRow}>
          <Mail color="#E8D5C4" size={19} />
          <Text style={styles.contactText}>eduardo@email.com</Text>
        </View>

        <View style={styles.contactRow}>
          <Phone color="#E8D5C4" size={19} />
          <Text style={styles.contactText}>Teléfono no registrado</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Mi cuenta</Text>

      {opciones.map((opcion) => {
        const Icon = opcion.Icon;

        return (
          <Pressable
            key={opcion.id}
            style={styles.option}
            onPress={() => {
              console.log("Seleccionaste:", opcion.titulo);
            }}
          >
            <View style={styles.optionIcon}>
              <Icon color="#A77B59" size={22} />
            </View>

            <Text style={styles.optionText}>{opcion.titulo}</Text>

            <ChevronRight color="#958A82" size={21} />
          </Pressable>
        );
      })}

      <Pressable
        style={styles.logout}
        onPress={() => console.log("Cerrar sesión")}
      >
        <LogOut color="#B45B50" size={21} />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>

      <Text style={styles.version}>Cafilovers · Versión 1.0.0</Text>
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
  profileCard: {
    backgroundColor: "#38251D",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#A77B59",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  member: {
    color: "#E8D5C4",
    marginTop: 6,
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: "#70594D",
    width: "100%",
    marginVertical: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 13,
  },
  contactText: {
    color: "#FFFFFF",
    fontSize: 13,
    marginLeft: 12,
  },
  sectionTitle: {
    color: "#38251D",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 15,
  },
  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F4EBE1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  optionText: {
    color: "#38251D",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    marginTop: 12,
  },
  logoutText: {
    color: "#B45B50",
    fontWeight: "bold",
    marginLeft: 10,
  },
  version: {
    textAlign: "center",
    color: "#958A82",
    fontSize: 11,
    marginTop: 12,
  },
});
