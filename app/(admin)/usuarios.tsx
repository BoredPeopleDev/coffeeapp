
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import { useUsuarios } from "../../src/features/admin/context/UsuariosContext";

import {
  Search,
  Users,
  UserRound,
  ChevronRight,
  ArrowLeft,
  UserPlus,
  SlidersHorizontal,
} from "lucide-react-native";

import { useRouter } from "expo-router";


export default function UsuariosScreen() {
  const router = useRouter();
const { usuarios } = useUsuarios();
  const totalUsuarios = usuarios.length;

const usuariosActivos = usuarios.filter(
  (usuario) => usuario.estado === "Activo"
).length;

  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const coincideBusqueda =
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtro === "Todos" || usuario.estado === filtro;

    return coincideBusqueda && coincideEstado;
  });

 
const verUsuario = (usuario: typeof usuarios[number]) => {
  router.push({
    pathname: "/(admin)/usuario-detalle",
    params: {
      id: String(usuario.id),
    },
  });
};

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

          <Text style={styles.brand}>
            CAFILOVERS
          </Text>

          <Text style={styles.headerSubtitle}>
            ADMINISTRACIÓN
          </Text>

          <Text style={styles.headerTitle}>
            Gestión de usuarios
          </Text>

          <Text style={styles.headerDescription}>
            Consulta y administra los clientes de tus cafeterías.
          </Text>
        </View>

        {/* RESUMEN */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Users color="#80583D" size={22} />
            </View>

            <Text style={styles.summaryNumber}>{totalUsuarios}</Text>
            <Text style={styles.summaryLabel}>
              Usuarios registrados
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <UserRound color="#43845D" size={22} />
            </View>

           <Text style={styles.summaryNumber}>{usuariosActivos}</Text>
            <Text style={styles.summaryLabel}>
              Usuarios activos
            </Text>
          </View>
        </View>

        {/* LISTADO */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Clientes registrados
            </Text>

            <Text style={styles.sectionSubtitle}>
              Consulta la información de tus clientes.
            </Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() =>
              Alert.alert(
                "Nuevo usuario",
                "Aquí podremos crear usuarios desde el panel administrativo."
              )
            }
          >
            <UserPlus color="#FFFFFF" size={20} />
          </Pressable>
        </View>

        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <Search color="#947C69" size={20} />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o correo..."
            placeholderTextColor="#A89588"
            value={busqueda}
            onChangeText={setBusqueda}
            autoCapitalize="none"
          />

          <SlidersHorizontal color="#947C69" size={19} />
        </View>

        {/* FILTROS */}
        <View style={styles.filters}>
          {["Todos", "Activo", "Inactivo"].map((item) => {
            const seleccionado = filtro === item;

            return (
              <Pressable
                key={item}
                style={[
                  styles.filterButton,
                  seleccionado && styles.filterSelected,
                ]}
                onPress={() => setFiltro(item)}
              >
                <Text
                  style={[
                    styles.filterText,
                    seleccionado && styles.filterTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.resultsText}>
          {usuariosFiltrados.length} usuarios encontrados
        </Text>

        {/* TARJETAS DE USUARIOS */}
        {usuariosFiltrados.map((usuario) => (
          <Pressable
            key={usuario.id}
            style={styles.userCard}
        onPress={() => verUsuario(usuario)}
          >
            <View style={styles.userTop}>
              <View style={styles.avatar}>
                <UserRound color="#80583D" size={23} />
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {usuario.nombre}
                </Text>

                <Text style={styles.userEmail}>
                  {usuario.correo}
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  usuario.estado === "Activo"
                    ? styles.activeBadge
                    : styles.inactiveBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    usuario.estado === "Activo"
                      ? styles.activeText
                      : styles.inactiveText,
                  ]}
                >
                  {usuario.estado}
                </Text>
              </View>
            </View>

            <View style={styles.userDetails}>
              <View>
                <Text style={styles.detailLabel}>
                  VISITAS
                </Text>
                <Text style={styles.detailValue}>
                  {usuario.visitas}
                </Text>
              </View>

              <View>
                <Text style={styles.detailLabel}>
                  ÚLTIMA VISITA
                </Text>
                <Text style={styles.detailValue}>
                  {usuario.ultimaVisita}
                </Text>
              </View>

              <ChevronRight color="#A89588" size={21} />
            </View>
          </Pressable>
        ))}

        {usuariosFiltrados.length === 0 && (
          <View style={styles.emptyState}>
            <Users color="#A89588" size={35} />

            <Text style={styles.emptyTitle}>
              No encontramos usuarios
            </Text>

            <Text style={styles.emptyDescription}>
              Intenta con otro nombre o filtro.
            </Text>
          </View>
        )}

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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  brand: {
    color: "#F5EBDD",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  headerSubtitle: {
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

  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 17,
    gap: 10,
    marginTop: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  summaryIcon: {
    backgroundColor: "#F2E9DF",
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryNumber: {
    color: "#38251D",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 12,
  },

  summaryLabel: {
    color: "#806B5B",
    fontSize: 11,
    marginTop: 4,
  },

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    color: "#38251D",
    fontSize: 18,
    fontWeight: "bold",
  },

  sectionSubtitle: {
    color: "#948174",
    fontSize: 11,
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#38251D",
    width: 43,
    height: 43,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  searchContainer: {
    marginHorizontal: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 13,
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  searchInput: {
    flex: 1,
    color: "#38251D",
    fontSize: 12,
  },

  filters: {
    flexDirection: "row",
    paddingHorizontal: 18,
    gap: 9,
    marginTop: 15,
  },

  filterButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 9,
    paddingHorizontal: 17,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  filterSelected: {
    backgroundColor: "#38251D",
    borderColor: "#38251D",
  },

  filterText: {
    color: "#806B5B",
    fontSize: 12,
    fontWeight: "600",
  },

  filterTextSelected: {
    color: "#FFFFFF",
  },

  resultsText: {
    color: "#948174",
    fontSize: 11,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  userCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginBottom: 12,
    padding: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  userTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  userInfo: {
    flex: 1,
    marginLeft: 11,
  },

  userName: {
    color: "#38251D",
    fontSize: 13,
    fontWeight: "bold",
  },

  userEmail: {
    color: "#948174",
    fontSize: 10,
    marginTop: 4,
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },

  activeBadge: {
    backgroundColor: "#E5F2E8",
  },

  inactiveBadge: {
    backgroundColor: "#FBE8E4",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "bold",
  },

  activeText: {
    color: "#43845D",
  },

  inactiveText: {
    color: "#C45B4B",
  },

  userDetails: {
    borderTopWidth: 1,
    borderTopColor: "#F0E9E1",
    marginTop: 15,
    paddingTop: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detailLabel: {
    color: "#A89588",
    fontSize: 9,
    letterSpacing: 0.7,
  },

  detailValue: {
    color: "#594334",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 5,
  },

  emptyState: {
    alignItems: "center",
    padding: 35,
  },

  emptyTitle: {
    color: "#38251D",
    fontWeight: "bold",
    marginTop: 12,
  },

  emptyDescription: {
    color: "#948174",
    fontSize: 12,
    marginTop: 5,
  },

  footer: {
    color: "#A89588",
    fontSize: 10,
    textAlign: "center",
    letterSpacing: 1.5,
    marginTop: 25,
  },
});
