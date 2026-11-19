
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CafeteriaCard from "../../src/features/admin/ui/CafeteriaCard";
import { useAdmin } from "../../src/features/admin/context/AdminContext";
import { router } from "expo-router";

export default function CafeteriasScreen() {
  const { cafeterias } = useAdmin();

  const totalClientes = cafeterias.reduce(
    (total, cafeteria) => total + cafeteria.clientes,
    0
  );

  const totalVisitas = cafeterias.reduce(
    (total, cafeteria) => total + cafeteria.visitas,
    0
  );

  const sucursalesActivas = cafeterias.filter(
    (cafeteria) => cafeteria.estado === "Activa"
  ).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.etiqueta}>ADMINISTRACIÓN</Text>
        <Text style={styles.titulo}>Cafeterías</Text>
        <Text style={styles.descripcion}>
          Administra las sucursales de Cafiver y consulta su actividad.
        </Text>
      </View>

      {/* Resumen general */}
      <View style={styles.resumen}>
        <View style={styles.resumenCard}>
          <Text style={styles.resumenNumero}>
            {cafeterias.length}
          </Text>
          <Text style={styles.resumenLabel}>Sucursales</Text>
        </View>

        <View style={styles.resumenCard}>
          <Text style={styles.resumenNumero}>
            {sucursalesActivas}
          </Text>
          <Text style={styles.resumenLabel}>Activas</Text>
        </View>
      </View>

      {/* Estadísticas */}
      <View style={styles.estadisticas}>
        <View style={styles.estadisticaItem}>
          <Text style={styles.estadisticaLabel}>Clientes registrados</Text>
          <Text style={styles.estadisticaNumero}>
            {totalClientes.toLocaleString("es-MX")}
          </Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.estadisticaItem}>
          <Text style={styles.estadisticaLabel}>Visitas acumuladas</Text>
          <Text style={styles.estadisticaNumero}>
            {totalVisitas.toLocaleString("es-MX")}
          </Text>
        </View>
      </View>

      {/* Lista de cafeterías */}
      <View style={styles.seccion}>
        <View style={styles.seccionHeader}>
          <Text style={styles.seccionTitulo}>Sucursales registradas</Text>
          <Text style={styles.contador}>
            {cafeterias.length} sucursales
          </Text>
        </View>

       {cafeterias.map((cafeteria) => (
  <CafeteriaCard
    key={cafeteria.id}
    cafeteria={cafeteria}
    onPress={() =>
      router.push({
        pathname: "/(admin)/cafeteria-detalle",
        params: {
          id: String(cafeteria.id),
        },
      })
    }
  />
))}
      </View>

      <Text style={styles.nota}>
        Información de demostración. Los datos reales se mostrarán
        cuando conectemos el backend.
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
    paddingBottom: 35,
  },
  header: {
    marginBottom: 22,
  },
  etiqueta: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#A58A70",
    marginBottom: 8,
  },
  titulo: {
    fontSize: 29,
    fontWeight: "800",
    color: "#38251D",
  },
  descripcion: {
    fontSize: 14,
    color: "#88786B",
    marginTop: 7,
    lineHeight: 21,
  },
  resumen: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  resumenCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 17,
    borderWidth: 1,
    borderColor: "#EDE5DA",
  },
  resumenNumero: {
    fontSize: 27,
    fontWeight: "800",
    color: "#38251D",
  },
  resumenLabel: {
    fontSize: 12,
    color: "#88786B",
    marginTop: 5,
  },
  estadisticas: {
    backgroundColor: "#38251D",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 27,
  },
  estadisticaItem: {
    flex: 1,
  },
  estadisticaLabel: {
    color: "#D8C9B9",
    fontSize: 11,
  },
  estadisticaNumero: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 7,
  },
  separador: {
    width: 1,
    height: 42,
    backgroundColor: "#766257",
    marginHorizontal: 12,
  },
  seccion: {
    marginBottom: 12,
  },
  seccionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seccionTitulo: {
    fontSize: 17,
    fontWeight: "800",
    color: "#38251D",
  },
  contador: {
    fontSize: 11,
    color: "#88786B",
  },
  nota: {
    color: "#A18F7F",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 17,
    marginTop: 10,
  },
});
