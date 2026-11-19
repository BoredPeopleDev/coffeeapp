
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useAdmin } from "../../src/features/admin/context/AdminContext";
import { useLocalSearchParams, router } from "expo-router";

export default function CafeteriaDetalleScreen() {
 const params = useLocalSearchParams();

const { cafeterias, actualizarCafeteria } = useAdmin();

const id = Number(params.id);

const cafeteria = cafeterias.find(
  (item) => item.id === id
);

if (!cafeteria) {
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>
        No se encontró la cafetería
      </Text>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Regresar</Text>
      </Pressable>
    </View>
  );
}

const {
  nombre,
  sucursal,
  direccion,
  estado,
  visitas,
  clientes,
  horario,
} = cafeteria;

const activa = estado === "Activa";

const cambiarEstado = () => {
  console.log("Botón presionado");
  console.log("ID:", id);
  console.log("Estado actual:", estado);

  actualizarCafeteria(id, {
    estado: activa ? "Inactiva" : "Activa",
  });
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Botón regresar */}
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Regresar a cafeterías</Text>
      </Pressable>

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>☕</Text>
        </View>

        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.sucursal}>{sucursal}</Text>

        <View
          style={[
            styles.estado,
            activa ? styles.estadoActivo : styles.estadoInactivo,
          ]}
        >
          <Text
            style={[
              styles.estadoTexto,
              activa ? styles.textoActivo : styles.textoInactivo,
            ]}
          >
            {estado}
          </Text>
        </View>
      </View>

      {/* Estadísticas */}
      <Text style={styles.sectionTitle}>Resumen de actividad</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {visitas.toLocaleString("es-MX")}
          </Text>
          <Text style={styles.statLabel}>Visitas acumuladas</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {clientes.toLocaleString("es-MX")}
          </Text>
          <Text style={styles.statLabel}>Clientes registrados</Text>
        </View>
      </View>

      {/* Información */}
      <Text style={styles.sectionTitle}>Información de sucursal</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>{nombre}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Sucursal</Text>
          <Text style={styles.infoValue}>{sucursal}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Dirección</Text>
          <Text style={styles.infoValue}>{direccion}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Horario de atención</Text>
          <Text style={styles.infoValue}>{horario}</Text>
        </View>
      </View>

      {/* Acciones */}
      <Text style={styles.sectionTitle}>Administración</Text>

      <View style={styles.actionsCard}>
       <Pressable
  style={styles.editButton}
  onPress={() =>
    router.push({
      pathname: "/(admin)/cafeteria-editar",
      params: {
        id: String(cafeteria.id),
      },
    })
  }
>
  <Text style={styles.editButtonText}>
    ✏️ Editar información
  </Text>
</Pressable>

        <Pressable
  style={styles.statusButton}
  onPress={cambiarEstado}
>
  <Text style={styles.statusButtonText}>
    {activa ? "Desactivar sucursal" : "Activar sucursal"}
  </Text>
</Pressable>
      </View>

      <Text style={styles.note}>
        Información de demostración. Las acciones administrativas
        todavía no están conectadas al backend.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EDE4",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 22,
  },
  backText: {
    color: "#8B6D57",
    fontSize: 14,
    fontWeight: "700",
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 26,
    borderWidth: 1,
    borderColor: "#EDE5DA",
  },
  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 22,
    backgroundColor: "#F3EDE4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },
  icon: {
    fontSize: 38,
  },
  nombre: {
    fontSize: 25,
    fontWeight: "800",
    color: "#38251D",
  },
  sucursal: {
    fontSize: 14,
    color: "#88786B",
    marginTop: 5,
  },
  estado: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 14,
  },
  estadoActivo: {
    backgroundColor: "#E5F3E9",
  },
  estadoInactivo: {
    backgroundColor: "#FCE8E8",
  },
  estadoTexto: {
    fontSize: 12,
    fontWeight: "700",
  },
  textoActivo: {
    color: "#287A45",
  },
  textoInactivo: {
    color: "#B83232",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#38251D",
    marginBottom: 14,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 27,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDE5DA",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#38251D",
  },
  statLabel: {
    fontSize: 12,
    color: "#88786B",
    marginTop: 6,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 27,
    borderWidth: 1,
    borderColor: "#EDE5DA",
  },
  infoItem: {
    paddingVertical: 9,
  },
  infoLabel: {
    fontSize: 12,
    color: "#A18F7F",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#38251D",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0EAE2",
  },
  actionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#EDE5DA",
  },
  editButton: {
    backgroundColor: "#38251D",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  statusButton: {
    backgroundColor: "#F3EDE4",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statusButtonText: {
    color: "#8B443D",
    fontSize: 14,
    fontWeight: "700",
  },
  note: {
    textAlign: "center",
    color: "#A18F7F",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 20,
  },
});
