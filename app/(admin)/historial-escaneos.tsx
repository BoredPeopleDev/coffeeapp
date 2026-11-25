
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";

import {
  QrCode,
  Search,
  CheckCircle2,
  XCircle,
  Coffee,
  Filter,
  RotateCcw,
} from "lucide-react-native";

type ResultadoEscaneo = "Otorgado" | "Rechazado";

interface Escaneo {
  id: string;
  nombreUsuario: string;
  sucursal: string;
  empleado: string;
  fecha: string;
  resultado: ResultadoEscaneo;
  motivo: string;
}

const escaneosDemo: Escaneo[] = [
  {
    id: "1",
    nombreUsuario: "María González",
    sucursal: "Sucursal principal",
    empleado: "Ana López",
    fecha: "2026-11-23T10:35:00",
    resultado: "Otorgado",
    motivo: "",
  },
  {
    id: "2",
    nombreUsuario: "Carlos Hernández",
    sucursal: "Segunda sucursal",
    empleado: "Pedro Ramírez",
    fecha: "2026-11-23T11:20:00",
    resultado: "Rechazado",
    motivo: "El cliente ya recibió un sello hoy.",
  },
  {
    id: "3",
    nombreUsuario: "Laura Martínez",
    sucursal: "Sucursal principal",
    empleado: "Ana López",
    fecha: "2026-11-22T09:15:00",
    resultado: "Otorgado",
    motivo: "",
  },
  {
    id: "4",
    nombreUsuario: "José Ramírez",
    sucursal: "Segunda sucursal",
    empleado: "Pedro Ramírez",
    fecha: "2026-11-22T13:40:00",
    resultado: "Rechazado",
    motivo: "El cliente ya recibió un sello hoy.",
  },
  {
    id: "5",
    nombreUsuario: "Fernanda Cruz",
    sucursal: "Sucursal principal",
    empleado: "Ana López",
    fecha: "2026-11-21T12:10:00",
    resultado: "Otorgado",
    motivo: "",
  },
];

// CONVERTIR FECHA DD/MM/AAAA A AAAA-MM-DD
const convertirFechaFiltro = (fecha: string): string | null => {
  if (!fecha.trim()) return null;

  const partes = fecha.trim().split("/");

  if (partes.length !== 3) return null;

  const [dia, mes, anio] = partes.map(Number);

  if (
    !dia ||
    !mes ||
    !anio ||
    anio < 1000 ||
    mes < 1 ||
    mes > 12 ||
    dia < 1 ||
    dia > 31
  ) {
    return null;
  }

  const fechaValidar = new Date(anio, mes - 1, dia);

  if (
    fechaValidar.getFullYear() !== anio ||
    fechaValidar.getMonth() !== mes - 1 ||
    fechaValidar.getDate() !== dia
  ) {
    return null;
  }

  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
};

export default function HistorialEscaneos() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroSucursal, setFiltroSucursal] = useState("Todas");
  const [filtroResultado, setFiltroResultado] = useState("Todos");

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const totalOtorgados = escaneosDemo.filter(
    (item) => item.resultado === "Otorgado"
  ).length;

  const totalRechazados = escaneosDemo.filter(
    (item) => item.resultado === "Rechazado"
  ).length;

  const inicioConvertido = convertirFechaFiltro(fechaInicio);
  const finConvertido = convertirFechaFiltro(fechaFin);

  const fechasValidas =
    (!fechaInicio.trim() || inicioConvertido !== null) &&
    (!fechaFin.trim() || finConvertido !== null) &&
    (!inicioConvertido ||
      !finConvertido ||
      inicioConvertido <= finConvertido);

  // FILTRAR ESCANEOS
  const escaneosFiltrados = useMemo(() => {
    return escaneosDemo.filter((item) => {
      const texto = busqueda.toLowerCase().trim();

      const coincideBusqueda =
        item.nombreUsuario.toLowerCase().includes(texto) ||
        item.empleado.toLowerCase().includes(texto);

      const coincideSucursal =
        filtroSucursal === "Todas" ||
        item.sucursal.toLowerCase().includes(filtroSucursal.toLowerCase());

      const coincideResultado =
        filtroResultado === "Todos" ||
        item.resultado === filtroResultado;

      const fechaEscaneo = new Date(item.fecha);

      const fechaRegistro = [
        fechaEscaneo.getFullYear(),
        String(fechaEscaneo.getMonth() + 1).padStart(2, "0"),
        String(fechaEscaneo.getDate()).padStart(2, "0"),
      ].join("-");

      const coincideFechaInicio =
        !inicioConvertido || fechaRegistro >= inicioConvertido;

      const coincideFechaFin =
        !finConvertido || fechaRegistro <= finConvertido;

      return (
        fechasValidas &&
        coincideBusqueda &&
        coincideSucursal &&
        coincideResultado &&
        coincideFechaInicio &&
        coincideFechaFin
      );
    });
  }, [
    busqueda,
    filtroSucursal,
    filtroResultado,
    inicioConvertido,
    finConvertido,
    fechasValidas,
  ]);

  // FORMATEAR FECHA
  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);

    return date.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // FORMATEAR HORA
  const formatearHora = (fecha: string) => {
    return new Date(fecha).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // LIMPIAR FILTROS
  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroSucursal("Todas");
    setFiltroResultado("Todos");
    setFechaInicio("");
    setFechaFin("");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <QrCode color="#E8D2B5" size={27} />
          </View>

          <Text style={styles.headerTitle}>
            Historial de escaneos QR
          </Text>

          <Text style={styles.headerDescription}>
            Consulta los registros de sellos otorgados y rechazados.
          </Text>
        </View>

        {/* RESUMEN */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconGreen}>
              <CheckCircle2 color="#43845D" size={22} />
            </View>

            <Text style={styles.summaryValue}>
              {totalOtorgados}
            </Text>

            <Text style={styles.summaryLabel}>
              Sellos otorgados
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIconRed}>
              <XCircle color="#BD5A4D" size={22} />
            </View>

            <Text style={styles.summaryValue}>
              {totalRechazados}
            </Text>

            <Text style={styles.summaryLabel}>
              Escaneos rechazados
            </Text>
          </View>
        </View>

        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <Search color="#9A897D" size={20} />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cliente o empleado..."
            placeholderTextColor="#A89588"
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

        {/* FILTROS */}
        <View style={styles.filtersCard}>
          <View style={styles.filtersHeader}>
            <Filter color="#80583D" size={18} />
            <Text style={styles.filtersTitle}>Filtros</Text>
          </View>

          {/* FILTRO SUCURSAL */}
          <Text style={styles.filterLabel}>Sucursal</Text>

          <View style={styles.filterOptions}>
            {["Todas", "Principal", "Segunda"].map((opcion) => (
              <Pressable
                key={opcion}
                onPress={() => setFiltroSucursal(opcion)}
                style={[
                  styles.filterChip,
                  filtroSucursal === opcion && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    filtroSucursal === opcion && styles.filterChipTextActive,
                  ]}
                >
                  {opcion}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* FILTRO RESULTADO */}
          <Text style={styles.filterLabel}>Resultado</Text>

          <View style={styles.filterOptions}>
            {["Todos", "Otorgado", "Rechazado"].map((opcion) => (
              <Pressable
                key={opcion}
                onPress={() => setFiltroResultado(opcion)}
                style={[
                  styles.filterChip,
                  filtroResultado === opcion && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    filtroResultado === opcion && styles.filterChipTextActive,
                  ]}
                >
                  {opcion}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* FILTRO POR FECHAS */}
          <Text style={styles.filterLabel}>Periodo de consulta</Text>

          <View style={styles.dateFilters}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputLabel}>Desde</Text>

              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#A89588"
                value={fechaInicio}
                onChangeText={setFechaInicio}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputLabel}>Hasta</Text>

              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#A89588"
                value={fechaFin}
                onChangeText={setFechaFin}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>

          {!fechasValidas && (
            <Text style={styles.dateError}>
              Verifica las fechas. Utiliza DD/MM/AAAA y asegúrate de que
              la fecha inicial no sea posterior a la final.
            </Text>
          )}

          {/* LIMPIAR FILTROS */}
          <Pressable
            style={styles.clearFiltersButton}
            onPress={limpiarFiltros}
          >
            <RotateCcw color="#80583D" size={15} />

            <Text style={styles.clearFiltersText}>
              Limpiar filtros
            </Text>
          </Pressable>
        </View>

        {/* LISTADO */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Registros de escaneo
          </Text>

          <Text style={styles.sectionCount}>
            {escaneosFiltrados.length} registros
          </Text>
        </View>

        {escaneosFiltrados.length === 0 ? (
          <View style={styles.emptyCard}>
            <QrCode color="#B5A393" size={40} />

            <Text style={styles.emptyTitle}>
              {fechasValidas ? "No hay resultados" : "Fechas incorrectas"}
            </Text>

            <Text style={styles.emptyDescription}>
              {fechasValidas
                ? "No encontramos escaneos con los filtros seleccionados."
                : "Revisa las fechas que ingresaste para consultar el historial."}
            </Text>
          </View>
        ) : (
          escaneosFiltrados.map((item) => {
            const otorgado = item.resultado === "Otorgado";

            return (
              <View key={item.id} style={styles.scanCard}>
                <View style={styles.scanTop}>
                  <View style={styles.customerInfo}>
                    <View style={styles.customerIcon}>
                      <Coffee color="#80583D" size={20} />
                    </View>

                    <View style={styles.customerText}>
                      <Text style={styles.customerName}>
                        {item.nombreUsuario}
                      </Text>

                      <Text style={styles.branchText}>
                        {item.sucursal}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.resultBadge,
                      otorgado ? styles.badgeGranted : styles.badgeRejected,
                    ]}
                  >
                    {otorgado ? (
                      <CheckCircle2 color="#43845D" size={13} />
                    ) : (
                      <XCircle color="#BD5A4D" size={13} />
                    )}

                    <Text
                      style={[
                        styles.resultText,
                        otorgado ? styles.textGranted : styles.textRejected,
                      ]}
                    >
                      {item.resultado}
                    </Text>
                  </View>
                </View>

                <View style={styles.scanDivider} />

                <View style={styles.scanDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Empleado</Text>
                    <Text style={styles.detailValue}>
                      {item.empleado}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Fecha</Text>
                    <Text style={styles.detailValue}>
                      {formatearFecha(item.fecha)}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Hora</Text>
                    <Text style={styles.detailValue}>
                      {formatearHora(item.fecha)}
                    </Text>
                  </View>
                </View>

                {!otorgado && (
                  <View style={styles.rejectionBox}>
                    <Text style={styles.rejectionLabel}>
                      Motivo del rechazo
                    </Text>

                    <Text style={styles.rejectionText}>
                      {item.motivo}
                    </Text>
                  </View>
                )}
              </View>
            );
          })
        )}

        <Text style={styles.demoNote}>
          Historial de demostración · Datos locales
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
    paddingTop: 35,
    paddingHorizontal: 22,
    paddingBottom: 27,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#5A3C2A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerDescription: {
    color: "#DDCFC1",
    fontSize: 12,
    marginTop: 7,
    lineHeight: 19,
  },

  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  summaryIconGreen: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#E7F2E9",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryIconRed: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F9E9E6",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryValue: {
    color: "#38251D",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },

  summaryLabel: {
    color: "#8B7869",
    fontSize: 11,
    marginTop: 3,
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
  },

  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 9,
    color: "#38251D",
    fontSize: 12,
  },

  filtersCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: 15,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  filtersHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },

  filtersTitle: {
    color: "#38251D",
    fontSize: 14,
    fontWeight: "bold",
  },

  filterLabel: {
    color: "#806B5B",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 9,
  },

  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 15,
  },

  filterChip: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F0EA",
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  filterChipActive: {
    backgroundColor: "#5A3C2A",
    borderColor: "#5A3C2A",
  },

  filterChipText: {
    color: "#806B5B",
    fontSize: 11,
  },

  filterChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  dateFilters: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  dateInputContainer: {
    flex: 1,
  },

  dateInputLabel: {
    color: "#806B5B",
    fontSize: 10,
    marginBottom: 7,
  },

  dateInput: {
    height: 43,
    backgroundColor: "#F5F0EA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9DED1",
    paddingHorizontal: 10,
    color: "#38251D",
    fontSize: 12,
  },

  dateError: {
    color: "#BD5A4D",
    fontSize: 10,
    marginBottom: 12,
    lineHeight: 15,
  },

  clearFiltersButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1EAE2",
  },

  clearFiltersText: {
    color: "#80583D",
    fontSize: 11,
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 25,
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

  scanCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginBottom: 11,
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  scanTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },

  customerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  customerIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  customerText: {
    flex: 1,
    marginLeft: 10,
  },

  customerName: {
    color: "#38251D",
    fontSize: 13,
    fontWeight: "bold",
  },

  branchText: {
    color: "#9A897D",
    fontSize: 10,
    marginTop: 4,
  },

  resultBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 20,
  },

  badgeGranted: {
    backgroundColor: "#E7F2E9",
  },

  badgeRejected: {
    backgroundColor: "#F9E9E6",
  },

  resultText: {
    fontSize: 10,
    fontWeight: "bold",
  },

  textGranted: {
    color: "#43845D",
  },

  textRejected: {
    color: "#BD5A4D",
  },

  scanDivider: {
    height: 1,
    backgroundColor: "#F1EAE2",
    marginVertical: 13,
  },

  scanDetails: {
    gap: 9,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailLabel: {
    color: "#9A897D",
    fontSize: 11,
  },

  detailValue: {
    color: "#675346",
    fontSize: 11,
    fontWeight: "600",
  },

  rejectionBox: {
    backgroundColor: "#FBF1EF",
    borderRadius: 10,
    padding: 11,
    marginTop: 13,
  },

  rejectionLabel: {
    color: "#BD5A4D",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },

  rejectionText: {
    color: "#805B53",
    fontSize: 11,
    lineHeight: 17,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  emptyTitle: {
    color: "#38251D",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 12,
  },

  emptyDescription: {
    color: "#9A897D",
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 17,
  },

  demoNote: {
    color: "#B0A195",
    fontSize: 10,
    textAlign: "center",
    marginTop: 18,
  },

  footer: {
    color: "#A89588",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 1.5,
    marginTop: 20,
  },
});
