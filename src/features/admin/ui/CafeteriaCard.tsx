
import { StyleSheet, Text, View , Pressable} from "react-native";
import type { Cafeteria } from "../data/cafeteriasDemo";

interface CafeteriaCardProps {
  cafeteria: Cafeteria;
  onPress?: () => void;
}

export default function CafeteriaCard({
  cafeteria,
  onPress,
}: CafeteriaCardProps) {
  const activa = cafeteria.estado === "Activa";

  return (
  <Pressable style={styles.card} onPress={onPress}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>☕</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.nombre}>{cafeteria.nombre}</Text>
          <Text style={styles.sucursal}>{cafeteria.sucursal}</Text>
        </View>

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
            {cafeteria.estado}
          </Text>
        </View>
      </View>

      {/* Dirección */}
      <Text style={styles.direccion}>
        📍 {cafeteria.direccion}
      </Text>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumero}>
            {cafeteria.visitas.toLocaleString("es-MX")}
          </Text>
          <Text style={styles.statLabel}>Visitas</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statNumero}>
            {cafeteria.clientes.toLocaleString("es-MX")}
          </Text>
          <Text style={styles.statLabel}>Clientes</Text>
        </View>
      </View>

      {/* Horario */}
      <View style={styles.footer}>
        <Text style={styles.horario}>
          🕒 {cafeteria.horario}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EDE5DA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F3EDE4",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "700",
    color: "#38251D",
  },
  sucursal: {
    fontSize: 13,
    color: "#88786B",
    marginTop: 3,
  },
  estado: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  estadoActivo: {
    backgroundColor: "#E5F3E9",
  },
  estadoInactivo: {
    backgroundColor: "#FCE8E8",
  },
  estadoTexto: {
    fontSize: 11,
    fontWeight: "700",
  },
  textoActivo: {
    color: "#287A45",
  },
  textoInactivo: {
    color: "#B83232",
  },
  direccion: {
    fontSize: 13,
    color: "#88786B",
    marginTop: 17,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F5F0",
    borderRadius: 12,
    padding: 14,
    marginTop: 17,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statNumero: {
    fontSize: 21,
    fontWeight: "800",
    color: "#38251D",
  },
  statLabel: {
    fontSize: 12,
    color: "#88786B",
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 35,
    backgroundColor: "#E3D9CC",
  },
  footer: {
    marginTop: 15,
  },
  horario: {
    fontSize: 12,
    color: "#75675D",
  },
});
