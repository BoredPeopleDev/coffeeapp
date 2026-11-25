
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";

import {
  ArrowLeft,
  Users,
  Plus,
  Search,
  Store,
  TrendingUp,
  History,
  UserPlus,
  X,
} from "lucide-react-native";

import { router } from "expo-router";

// ==========================================
// TIPO DE GRUPO
// ==========================================

type Grupo = {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  cantidad: number;
  habilitado: boolean;
};

// ==========================================
// GRUPOS INICIALES
// ==========================================

const gruposIniciales: Grupo[] = [
  {
    id: "1",
    nombre: "Todos los clientes",
    descripcion: "Clientes activos de CAFILOVERS",
    tipo: "General",
    cantidad: 856,
    habilitado: true,
  },
  {
    id: "2",
    nombre: "Clientes frecuentes",
    descripcion: "Clientes con visitas recurrentes",
    tipo: "Frecuencia",
    cantidad: 320,
    habilitado: true,
  },
  {
    id: "3",
    nombre: "Clientes inactivos",
    descripcion: "Clientes sin visitas recientes",
    tipo: "Inactividad",
    cantidad: 125,
    habilitado: true,
  },
  {
    id: "4",
    nombre: "Sucursal principal",
    descripcion: "Clientes de la sucursal principal",
    tipo: "Sucursal",
    cantidad: 480,
    habilitado: true,
  },
  {
    id: "5",
    nombre: "Segunda sucursal",
    descripcion: "Clientes de la segunda sucursal",
    tipo: "Sucursal",
    cantidad: 376,
    habilitado: true,
  },
];

// ==========================================
// PANTALLA PRINCIPAL
// ==========================================

export default function GruposDifusionScreen() {
  const [grupos, setGrupos] = useState<Grupo[]>(gruposIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // ==========================================
  // BUSCAR GRUPOS
  // ==========================================

  const gruposFiltrados = grupos.filter((grupo) =>
    grupo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ==========================================
  // CREAR GRUPO
  // ==========================================

  const crearGrupo = () => {
    if (!nombre.trim()) {
      Alert.alert("Nombre requerido", "Escribe el nombre del grupo.");
      return;
    }

    const nuevoGrupo: Grupo = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || "Grupo personalizado",
      tipo: "Personalizado",
      cantidad: 0,
      habilitado: true,
    };

    setGrupos((actuales) => [...actuales, nuevoGrupo]);

    setNombre("");
    setDescripcion("");
    setMostrarFormulario(false);

    Alert.alert(
      "Grupo creado",
      "El grupo se agregó correctamente a la demostración."
    );
  };

  // ==========================================
  // HABILITAR / DESHABILITAR GRUPO
  // ==========================================

  const cambiarEstadoGrupo = (id: string) => {
    setGrupos((actuales) =>
      actuales.map((grupo) =>
        grupo.id === id
          ? { ...grupo, habilitado: !grupo.habilitado }
          : grupo
      )
    );
  };

  // ==========================================
  // MOSTRAR DETALLE
  // ==========================================

  const mostrarDetalle = (grupo: Grupo) => {
    Alert.alert(
      grupo.nombre,
      `${grupo.descripcion}\n\nTipo: ${grupo.tipo}\nClientes estimados: ${grupo.cantidad}\nEstado: ${
        grupo.habilitado ? "Activo" : "Deshabilitado"
      }\n\nLa asignación de clientes se conectará posteriormente con la base de datos.`
    );
  };

  // ==========================================
  // ELIMINAR GRUPO PERSONALIZADO
  // ==========================================

  const eliminarGrupo = (id: string) => {
    const grupo = grupos.find((item) => item.id === id);

    if (!grupo || grupo.tipo !== "Personalizado") {
      Alert.alert(
        "No disponible",
        "Los grupos predeterminados no se pueden eliminar."
      );
      return;
    }

    Alert.alert(
      "Eliminar grupo",
      `¿Deseas eliminar "${grupo.nombre}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () =>
            setGrupos((actuales) =>
              actuales.filter((item) => item.id !== id)
            ),
        },
      ]
    );
  };

  // ==========================================
  // ICONOS SEGÚN EL TIPO DE GRUPO
  // ==========================================

  const obtenerIcono = (tipo: string) => {
    switch (tipo) {
      case "Sucursal":
        return Store;
      case "Frecuencia":
        return TrendingUp;
      case "Inactividad":
        return History;
      case "Personalizado":
        return UserPlus;
      default:
        return Users;
    }
  };

  // ==========================================
  // INTERFAZ
  // ==========================================

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

          <View style={styles.headerIcon}>
            <Users color="#F5EBDD" size={25} />
          </View>

          <Text style={styles.headerSubtitle}>
            PANEL ADMINISTRATIVO
          </Text>

          <Text style={styles.headerTitle}>
            Grupos de difusión
          </Text>

          <Text style={styles.headerDescription}>
            Organiza a tus clientes y dirige tus promociones al público correcto.
          </Text>
        </View>

        {/* RESUMEN */}

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Users color="#80583D" size={22} />

            <Text style={styles.statValue}>
              {grupos.length}
            </Text>

            <Text style={styles.statLabel}>
              Grupos registrados
            </Text>
          </View>

          <View style={styles.statCard}>
            <UserPlus color="#80583D" size={22} />

            <Text style={styles.statValue}>
              {grupos.reduce(
                (total, grupo) => total + grupo.cantidad,
                0
              )}
            </Text>

            <Text style={styles.statLabel}>
              Suma de clientes estimados
            </Text>
          </View>
        </View>

        {/* BUSCADOR */}

        <View style={styles.searchContainer}>
          <Search color="#A89588" size={20} />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar grupo..."
            placeholderTextColor="#A89588"
            value={busqueda}
            onChangeText={setBusqueda}
          />

          {busqueda.length > 0 && (
            <Pressable onPress={() => setBusqueda("")}>
              <X color="#A89588" size={19} />
            </Pressable>
          )}
        </View>

        {/* BOTÓN CREAR */}

        <Pressable
          style={styles.createButton}
          onPress={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <Plus color="#FFFFFF" size={21} />

          <Text style={styles.createButtonText}>
            Crear grupo personalizado
          </Text>
        </Pressable>

        {/* FORMULARIO */}

        {mostrarFormulario && (
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                Nuevo grupo
              </Text>

              <Pressable
                onPress={() => setMostrarFormulario(false)}
              >
                <X color="#80583D" size={21} />
              </Pressable>
            </View>

            <Text style={styles.inputLabel}>
              Nombre del grupo
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. Clientes de temporada"
              placeholderTextColor="#A89588"
              value={nombre}
              onChangeText={setNombre}
              maxLength={45}
            />

            <Text style={styles.inputLabel}>
              Descripción
            </Text>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Describe el propósito de este grupo..."
              placeholderTextColor="#A89588"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              maxLength={120}
            />

            <Text style={styles.demoNotice}>
              La selección automática de clientes se habilitará al conectar la base de datos.
            </Text>

            <Pressable
              style={styles.saveButton}
              onPress={crearGrupo}
            >
              <Text style={styles.saveButtonText}>
                Guardar grupo
              </Text>
            </Pressable>
          </View>
        )}

        {/* LISTADO DE GRUPOS */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Grupos disponibles
          </Text>

          <Text style={styles.sectionCount}>
            {gruposFiltrados.length} grupos
          </Text>
        </View>

        <View style={styles.groupsCard}>
          {gruposFiltrados.length === 0 ? (
            <View style={styles.emptyState}>
              <Users color="#B5A393" size={35} />

              <Text style={styles.emptyTitle}>
                No encontramos grupos
              </Text>

              <Text style={styles.emptyDescription}>
                Intenta con otro nombre de búsqueda.
              </Text>
            </View>
          ) : (
            gruposFiltrados.map((grupo, index) => {
              const Icon = obtenerIcono(grupo.tipo);

              return (
                <View
                  key={grupo.id}
                  style={[
                    styles.groupRow,
                    index === gruposFiltrados.length - 1 &&
                      styles.lastGroupRow,
                  ]}
                >
                  {/* INFORMACIÓN DEL GRUPO */}

                  <Pressable
                    style={styles.groupMain}
                    onPress={() => mostrarDetalle(grupo)}
                  >
                    <View style={styles.groupIcon}>
                      <Icon color="#80583D" size={22} />
                    </View>

                    <View style={styles.groupInfo}>
                      <Text style={styles.groupName}>
                        {grupo.nombre}
                      </Text>

                      <Text style={styles.groupDescription}>
                        {grupo.descripcion}
                      </Text>

                      <Text style={styles.groupType}>
                        {grupo.tipo}
                      </Text>

                      <Text
                        style={[
                          styles.groupStatus,
                          grupo.habilitado
                            ? styles.groupStatusActive
                            : styles.groupStatusInactive,
                        ]}
                      >
                        {grupo.habilitado
                          ? "● Grupo activo"
                          : "● Grupo deshabilitado"}
                      </Text>
                    </View>

                    <View style={styles.groupCountContainer}>
                      <Text style={styles.groupCount}>
                        {grupo.cantidad}
                      </Text>

                      <Text style={styles.groupCountLabel}>
                        clientes
                      </Text>
                    </View>
                  </Pressable>

                  {/* ACCIONES DEL GRUPO */}

                  <View style={styles.groupActions}>
                    <Pressable
                      style={[
                        styles.actionButton,
                        grupo.habilitado
                          ? styles.disableButton
                          : styles.enableButton,
                      ]}
                      onPress={() => cambiarEstadoGrupo(grupo.id)}
                    >
                      <Text
                        style={[
                          styles.actionButtonText,
                          grupo.habilitado
                            ? styles.disableButtonText
                            : styles.enableButtonText,
                        ]}
                      >
                        {grupo.habilitado
                          ? "Deshabilitar"
                          : "Habilitar"}
                      </Text>
                    </Pressable>

                    {/* SOLO SE PUEDEN ELIMINAR LOS PERSONALIZADOS */}

                    {grupo.tipo === "Personalizado" && (
                      <Pressable
                        style={styles.deleteButton}
                        onPress={() => eliminarGrupo(grupo.id)}
                      >
                        <X color="#B85C50" size={18} />
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* NOTA */}

        <View style={styles.footerCard}>
          <Users color="#80583D" size={20} />

          <Text style={styles.footerDescription}>
            Los grupos personalizados se guardan únicamente durante esta sesión de demostración. La segmentación real se conectará con PostgreSQL.
          </Text>
        </View>

        <Text style={styles.footer}>
          CAFILOVERS · GRUPOS DE DIFUSIÓN
        </Text>
      </ScrollView>
    </View>
  );
}

// ==========================================
// ESTILOS
// ==========================================

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
    backgroundColor: "#5A3C2A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#5A3C2A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },

  headerSubtitle: {
    color: "#C7A987",
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 7,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  headerDescription: {
    color: "#DDCFC1",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },

  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  statValue: {
    color: "#38251D",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 8,
  },

  statLabel: {
    color: "#948174",
    fontSize: 10,
    marginTop: 4,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: 20,
    paddingHorizontal: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E9DED1",
    height: 53,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    color: "#38251D",
    fontSize: 12,
  },

  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#80583D",
    marginHorizontal: 18,
    marginTop: 13,
    padding: 15,
    borderRadius: 13,
    gap: 9,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: 15,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  formTitle: {
    color: "#38251D",
    fontSize: 16,
    fontWeight: "bold",
  },

  inputLabel: {
    color: "#705747",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#F7F2EC",
    borderWidth: 1,
    borderColor: "#E9DED1",
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: "#38251D",
    fontSize: 12,
  },

  descriptionInput: {
    minHeight: 75,
    textAlignVertical: "top",
  },

  demoNotice: {
    color: "#A87950",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 12,
  },

  saveButton: {
    backgroundColor: "#80583D",
    padding: 14,
    borderRadius: 11,
    alignItems: "center",
    marginTop: 15,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 27,
    marginBottom: 13,
  },

  sectionTitle: {
    color: "#38251D",
    fontSize: 16,
    fontWeight: "bold",
  },

  sectionCount: {
    color: "#9A7251",
    fontSize: 11,
  },

  groupsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 16,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  groupRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1EAE2",
    paddingVertical: 14,
  },

  lastGroupRow: {
    borderBottomWidth: 0,
  },

  groupMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  groupIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  groupInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 11,
  },

  groupName: {
    color: "#38251D",
    fontSize: 12,
    fontWeight: "bold",
  },

  groupDescription: {
    color: "#948174",
    fontSize: 10,
    marginTop: 4,
  },

  groupType: {
    color: "#A87950",
    fontSize: 9,
    marginTop: 5,
  },

  groupStatus: {
    fontSize: 9,
    marginTop: 5,
    fontWeight: "600",
  },

  groupStatusActive: {
    color: "#43845D",
  },

  groupStatusInactive: {
    color: "#B85C50",
  },

  groupCountContainer: {
    alignItems: "flex-end",
    marginLeft: 5,
  },

  groupCount: {
    color: "#80583D",
    fontSize: 15,
    fontWeight: "bold",
  },

  groupCountLabel: {
    color: "#A89588",
    fontSize: 9,
    marginTop: 2,
  },

  groupActions: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
    gap: 5,
  },

  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 75,
    alignItems: "center",
  },

  disableButton: {
    backgroundColor: "#F5EBDD",
  },

  enableButton: {
    backgroundColor: "#E7F2E9",
  },

  actionButtonText: {
    fontSize: 9,
    fontWeight: "bold",
  },

  disableButtonText: {
    color: "#9A7251",
  },

  enableButtonText: {
    color: "#43845D",
  },

  deleteButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },

  emptyState: {
    alignItems: "center",
    padding: 30,
  },

  emptyTitle: {
    color: "#38251D",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 12,
  },

  emptyDescription: {
    color: "#948174",
    fontSize: 11,
    marginTop: 6,
    textAlign: "center",
  },

  footerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFE2D2",
    marginHorizontal: 18,
    marginTop: 18,
    padding: 14,
    borderRadius: 13,
    gap: 10,
  },

  footerDescription: {
    flex: 1,
    color: "#75563F",
    fontSize: 10,
    lineHeight: 16,
  },

  footer: {
    color: "#A89588",
    textAlign: "center",
    fontSize: 9,
    letterSpacing: 1.2,
    marginTop: 25,
  },
});
