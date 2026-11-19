
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { useUsuarios } from "../../src/features/admin/context/UsuariosContext";
import {
  ArrowLeft,
  UserRound,
  Mail,
  CalendarDays,
  Coffee,
  Gift,
  Clock,
  CheckCircle2,
} from "lucide-react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

export default function UsuarioDetalleScreen() {
  const router = useRouter();

 const { id } = useLocalSearchParams<{ id: string }>();

const { usuarios } = useUsuarios();

const usuario = usuarios.find((item) => item.id === id);

if (!usuario) {
  return (
    <View style={styles.container}>
      <Text>Usuario no encontrado.</Text>

      <Pressable onPress={() => router.back()}>
        <Text>← Regresar</Text>
      </Pressable>
    </View>
  );
}

const {
  nombre,
  correo,
  visitas,
  ultimaVisita,
  estado,
} = usuario;

const nombreUsuario = nombre || "Usuario DEMO";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FFFFFF" size={22} />
          </Pressable>

          <Text style={styles.brand}>CAFILOVERS</Text>
          <Text style={styles.brandSubtitle}>ADMINISTRACIÓN</Text>

          <Text style={styles.headerTitle}>Detalle de usuario</Text>
          <Text style={styles.headerDescription}>
            Información y actividad del cliente.
          </Text>
        </View>

        {/* PERFIL */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <UserRound color="#80583D" size={38} />
          </View>

          <Text style={styles.name}>{nombreUsuario}</Text>

          <View style={styles.emailRow}>
            <Mail color="#947C69" size={15} />
            <Text style={styles.email}>{correo || "Sin correo"}</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              estado === "Inactivo"
                ? styles.inactiveBadge
                : styles.activeBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                estado === "Inactivo"
                  ? styles.inactiveText
                  : styles.activeText,
              ]}
            >
              {estado || "Activo"}
            </Text>
          </View>
        </View>

        {/* INDICADORES */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Coffee color="#80583D" size={23} />
            <Text style={styles.statNumber}>{visitas || "0"}</Text>
            <Text style={styles.statLabel}>Visitas totales</Text>
          </View>

          <View style={styles.statCard}>
            <Gift color="#80583D" size={23} />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Recompensas</Text>
          </View>
        </View>

        {/* INFORMACIÓN */}
        <Text style={styles.sectionTitle}>Información general</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Mail color="#80583D" size={19} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Correo electrónico</Text>
              <Text style={styles.infoValue}>
                {correo || "Sin correo"}
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <CalendarDays color="#80583D" size={19} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Última visita</Text>
              <Text style={styles.infoValue}>
                {ultimaVisita || "Sin registros"}
              </Text>
            </View>
          </View>
        </View>

        {/* HISTORIAL */}
        <Text style={styles.sectionTitle}>Actividad reciente</Text>

        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <CheckCircle2 color="#43845D" size={22} />
          </View>

          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>
              Visita registrada
            </Text>
            <Text style={styles.activityDescription}>
              Cafiver · Sucursal principal
            </Text>
          </View>

          <Clock color="#A89588" size={17} />
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Gift color="#80583D" size={22} />
          </View>

          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>
              Recompensa canjeada
            </Text>
            <Text style={styles.activityDescription}>
              Bebida gratis
            </Text>
          </View>

          <Clock color="#A89588" size={17} />
        </View>

        <Text style={styles.demoNote}>
          Información de demostración · Sin conexión al servidor
        </Text>

        <Text style={styles.footer}>
          CAFILOVERS · ADMINISTRACIÓN
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EDE4",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  header: {
    backgroundColor: "#38251D",
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#50372A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  brand: {
    color: "#F5EBDD",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  brandSubtitle: {
    color: "#C7A987",
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 4,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 24,
  },

  headerDescription: {
    color: "#DDCFC1",
    fontSize: 12,
    marginTop: 7,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: 22,
    padding: 22,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    color: "#38251D",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 13,
    textAlign: "center",
  },

  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 7,
  },

  email: {
    color: "#948174",
    fontSize: 12,
  },

  statusBadge: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 13,
  },

  activeBadge: {
    backgroundColor: "#E5F2E8",
  },

  inactiveBadge: {
    backgroundColor: "#FBE8E4",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "bold",
  },

  activeText: {
    color: "#43845D",
  },

  inactiveText: {
    color: "#C45B4B",
  },

  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 15,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  statNumber: {
    color: "#38251D",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 12,
  },

  statLabel: {
    color: "#806B5B",
    fontSize: 11,
    marginTop: 4,
  },

  sectionTitle: {
    color: "#38251D",
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 27,
    marginBottom: 13,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 17,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
  },

  infoIcon: {
    width: 42,
    height: 42,
    backgroundColor: "#F2E9DF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: "#948174",
    fontSize: 10,
  },

  infoValue: {
    color: "#38251D",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },

  separator: {
    height: 1,
    backgroundColor: "#F0E9E1",
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginBottom: 10,
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9DED1",
    gap: 12,
  },

  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  activityInfo: {
    flex: 1,
  },

  activityTitle: {
    color: "#38251D",
    fontWeight: "bold",
    fontSize: 12,
  },

  activityDescription: {
    color: "#948174",
    fontSize: 10,
    marginTop: 4,
  },

  demoNote: {
    color: "#A89588",
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
  },

  footer: {
    color: "#A89588",
    fontSize: 10,
    textAlign: "center",
    letterSpacing: 1.5,
    marginTop: 18,
  },
});
