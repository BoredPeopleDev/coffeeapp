
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  TextInput,
} from "react-native";

import { useRouter } from "expo-router";

import {
  ArrowLeft,
  Search,
  UserRound,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  History,
} from "lucide-react-native";

import { useUsuarios } from "../../src/features/admin/context/UsuariosContext";

export default function HistorialUsuariosScreen() {
  const router = useRouter();

  const { movimientos } = useUsuarios();

  // FILTROS DEL HISTORIAL
  const [filtroSucursal, setFiltroSucursal] = useState("Todas");
  const [filtroMovimiento, setFiltroMovimiento] = useState("Todos");

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [filtroResponsable, setFiltroResponsable] = useState("");

  // FORMATEAR FECHA
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // CONVERTIR DD/MM/AAAA A AAAA-MM-DD
  const convertirFecha = (fecha: string) => {
    if (!fecha.trim()) return "";

    const partes = fecha.split("/");

    if (partes.length !== 3) return null;

    const [dia, mes, anio] = partes;

    if (
      dia.length !== 2 ||
      mes.length !== 2 ||
      anio.length !== 4
    ) {
      return null;
    }

    const diaNumero = Number(dia);
    const mesNumero = Number(mes);
    const anioNumero = Number(anio);

    const fechaValidada = new Date(
      anioNumero,
      mesNumero - 1,
      diaNumero
    );

    if (
      fechaValidada.getFullYear() !== anioNumero ||
      fechaValidada.getMonth() !== mesNumero - 1 ||
      fechaValidada.getDate() !== diaNumero
    ) {
      return null;
    }

    return `${anio}-${mes}-${dia}`;
  };

  // APLICAR FILTROS
  const movimientosFiltrados = useMemo(() => {
    const inicio = convertirFecha(fechaInicio);
    const fin = convertirFecha(fechaFin);

    return movimientos.filter((movimiento) => {
      // FILTRO POR SUCURSAL
      const sucursal = movimiento.sucursal.toLowerCase();

      const coincideSucursal =
        filtroSucursal === "Todas" ||
        (filtroSucursal === "Principal" &&
          sucursal.includes("principal")) ||
        (filtroSucursal === "Segunda" &&
          sucursal.includes("segunda"));

      // FILTRO POR TIPO DE MOVIMIENTO
      const coincideMovimiento =
        filtroMovimiento === "Todos" ||
        movimiento.accion === filtroMovimiento;

      // FILTRO POR RESPONSABLE
      const coincideResponsable =
        movimiento.realizadoPor
          .toLowerCase()
          .includes(filtroResponsable.trim().toLowerCase());

      // FILTRO POR FECHA
      const fechaMovimiento = new Date(movimiento.fecha);

      const fechaISO = [
        fechaMovimiento.getFullYear(),
        String(fechaMovimiento.getMonth() + 1).padStart(2, "0"),
        String(fechaMovimiento.getDate()).padStart(2, "0"),
      ].join("-");

      const coincideFecha =
        inicio !== null &&
        fin !== null &&
        (!inicio || fechaISO >= inicio) &&
        (!fin || fechaISO <= fin);

      return (
        coincideSucursal &&
        coincideMovimiento &&
        coincideResponsable &&
        coincideFecha
      );
    });
  }, [
    movimientos,
    filtroSucursal,
    filtroMovimiento,
    fechaInicio,
    fechaFin,
    filtroResponsable,
  ]);

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

          <Text style={styles.brandSubtitle}>
            ADMINISTRACIÓN
          </Text>

          <Text style={styles.headerTitle}>
            Historial de usuarios
          </Text>

          <Text style={styles.headerDescription}>
            Registro de activaciones y desactivaciones.
          </Text>
        </View>

        {/* RESUMEN */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <History color="#80583D" size={25} />
          </View>

          <View style={styles.summaryInfo}>
            <Text style={styles.summaryNumber}>
              {movimientosFiltrados.length}
            </Text>

            <Text style={styles.summaryLabel}>
              Movimientos encontrados
            </Text>
          </View>
        </View>

        {/* FILTROS */}
        <View style={styles.filtersCard}>
          <View style={styles.filtersHeader}>
            <Search color="#80583D" size={20} />

            <Text style={styles.filtersTitle}>
              Filtrar movimientos
            </Text>
          </View>

          {/* FILTRO POR SUCURSAL */}
          <Text style={styles.filterLabel}>Sucursal</Text>

          <View style={styles.filterOptions}>
            {["Todas", "Principal", "Segunda"].map((opcion) => (
              <Pressable
                key={opcion}
                style={[
                  styles.filterChip,
                  filtroSucursal === opcion &&
                    styles.filterChipActive,
                ]}
                onPress={() => setFiltroSucursal(opcion)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    filtroSucursal === opcion &&
                      styles.filterChipTextActive,
                  ]}
                >
                  {opcion}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* FILTRO POR TIPO DE MOVIMIENTO */}
          <Text style={styles.filterLabel}>
            Tipo de movimiento
          </Text>

          <View style={styles.filterOptions}>
            {["Todos", "Activación", "Desactivación"].map(
              (opcion) => (
                <Pressable
                  key={opcion}
                  style={[
                    styles.filterChip,
                    filtroMovimiento === opcion &&
                      styles.filterChipActive,
                  ]}
                  onPress={() => setFiltroMovimiento(opcion)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filtroMovimiento === opcion &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {opcion}
                  </Text>
                </Pressable>
              )
            )}
          </View>

          {/* FILTRO POR FECHAS */}
          <Text style={styles.filterLabel}>Periodo</Text>

          <View style={styles.dateFilters}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputLabel}>
                Desde
              </Text>

              <TextInput
                style={styles.filterInput}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#A89588"
                value={fechaInicio}
                onChangeText={setFechaInicio}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputLabel}>
                Hasta
              </Text>

              <TextInput
                style={styles.filterInput}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#A89588"
                value={fechaFin}
                onChangeText={setFechaFin}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>

          {/* FILTRO POR RESPONSABLE */}
          <Text style={styles.filterLabel}>
            Responsable
          </Text>

          <TextInput
            style={styles.filterInput}
            placeholder="Buscar por nombre del responsable"
            placeholderTextColor="#A89588"
            value={filtroResponsable}
            onChangeText={setFiltroResponsable}
            autoCapitalize="none"
          />

          {/* LIMPIAR FILTROS */}
          <Pressable
            style={styles.clearFiltersButton}
            onPress={() => {
              setFiltroSucursal("Todas");
              setFiltroMovimiento("Todos");
              setFechaInicio("");
              setFechaFin("");
              setFiltroResponsable("");
            }}
          >
            <Text style={styles.clearFiltersText}>
              Limpiar filtros
            </Text>
          </Pressable>
        </View>

        {/* HISTORIAL */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Movimientos recientes
          </Text>
        </View>

        {movimientosFiltrados.length === 0 ? (
          <View style={styles.emptyCard}>
            <History color="#B5A393" size={42} />

            <Text style={styles.emptyTitle}>
              {movimientos.length === 0
                ? "Sin movimientos registrados"
                : "No hay resultados"}
            </Text>

            <Text style={styles.emptyDescription}>
              {movimientos.length === 0
                ? "Cuando se active o desactive una cuenta, el movimiento aparecerá aquí."
                : "No encontramos movimientos con los filtros seleccionados."}
            </Text>
          </View>
        ) : (
          movimientosFiltrados.map((movimiento) => {
            const esDesactivacion =
              movimiento.accion === "Desactivación";

            return (
              <View
                key={movimiento.id}
                style={styles.movementCard}
              >
                {/* CLIENTE Y ACCIÓN */}
                <View style={styles.movementHeader}>
                  <View style={styles.userIcon}>
                    <UserRound
                      color="#80583D"
                      size={22}
                    />
                  </View>

                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                      {movimiento.nombreUsuario}
                    </Text>

                    <Text style={styles.actionDescription}>
                      {movimiento.accion}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.actionBadge,
                      esDesactivacion
                        ? styles.inactiveBadge
                        : styles.activeBadge,
                    ]}
                  >
                    {esDesactivacion ? (
                      <XCircle
                        color="#C45B4B"
                        size={14}
                      />
                    ) : (
                      <CheckCircle2
                        color="#43845D"
                        size={14}
                      />
                    )}

                    <Text
                      style={[
                        styles.actionBadgeText,
                        esDesactivacion
                          ? styles.inactiveText
                          : styles.activeText,
                      ]}
                    >
                      {esDesactivacion
                        ? "Desactivado"
                        : "Activado"}
                    </Text>
                  </View>
                </View>

                <View style={styles.separator} />

                {/* MOTIVO */}
                <Text style={styles.infoLabel}>
                  Motivo del movimiento
                </Text>

                <Text style={styles.reasonText}>
                  {movimiento.motivo}
                </Text>

                {/* RESPONSABLE */}
                <View style={styles.detailRow}>
                  <ShieldCheck
                    color="#80583D"
                    size={17}
                  />

                  <View style={styles.detailContent}>
                    <Text style={styles.infoLabel}>
                      Realizado por
                    </Text>

                    <Text style={styles.detailValue}>
                      {movimiento.realizadoPor}
                    </Text>
                  </View>
                </View>

                {/* SUCURSAL */}
                <View style={styles.detailRow}>
                  <UserRound
                    color="#80583D"
                    size={17}
                  />

                  <View style={styles.detailContent}>
                    <Text style={styles.infoLabel}>
                      Sucursal
                    </Text>

                    <Text style={styles.detailValue}>
                      {movimiento.sucursal}
                    </Text>
                  </View>
                </View>

                {/* FECHA */}
                <View style={styles.detailRow}>
                  <Clock
                    color="#80583D"
                    size={17}
                  />

                  <View style={styles.detailContent}>
                    <Text style={styles.infoLabel}>
                      Fecha y hora
                    </Text>

                    <Text style={styles.detailValue}>
                      {formatearFecha(movimiento.fecha)}
                    </Text>
                  </View>
                </View>
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

  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: 20,
    padding: 18,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryInfo: {
    flex: 1,
  },

  summaryNumber: {
    color: "#38251D",
    fontSize: 25,
    fontWeight: "bold",
  },

  summaryLabel: {
    color: "#806B5B",
    fontSize: 11,
    marginTop: 3,
  },

  // FILTROS
  filtersCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: 20,
    padding: 16,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  filtersHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 15,
  },

  filtersTitle: {
    color: "#38251D",
    fontSize: 15,
    fontWeight: "bold",
  },

  filterLabel: {
    color: "#675346",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 9,
  },

  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },

  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#F3EDE4",
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  filterChipActive: {
    backgroundColor: "#38251D",
    borderColor: "#38251D",
  },

  filterChipText: {
    color: "#806B5B",
    fontSize: 11,
    fontWeight: "600",
  },

  filterChipTextActive: {
    color: "#FFFFFF",
  },

  dateFilters: {
    flexDirection: "row",
    gap: 10,
  },

  dateInputContainer: {
    flex: 1,
  },

  dateInputLabel: {
    color: "#948174",
    fontSize: 10,
    marginBottom: 6,
  },

  filterInput: {
    backgroundColor: "#F8F4EE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9DED1",
    paddingHorizontal: 11,
    paddingVertical: 11,
    color: "#38251D",
    fontSize: 12,
  },

  clearFiltersButton: {
    alignSelf: "flex-end",
    marginTop: 16,
    paddingVertical: 7,
  },

  clearFiltersText: {
    color: "#B51F2B",
    fontSize: 12,
    fontWeight: "bold",
  },

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 27,
    marginBottom: 13,
  },

  sectionTitle: {
    color: "#38251D",
    fontSize: 17,
    fontWeight: "bold",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    padding: 30,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
    alignItems: "center",
  },

  emptyTitle: {
    color: "#38251D",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptyDescription: {
    color: "#948174",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 8,
  },

  movementCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginBottom: 13,
    padding: 16,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  movementHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  userIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    color: "#38251D",
    fontSize: 13,
    fontWeight: "bold",
  },

  actionDescription: {
    color: "#948174",
    fontSize: 10,
    marginTop: 4,
  },

  actionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },

  activeBadge: {
    backgroundColor: "#E5F2E8",
  },

  inactiveBadge: {
    backgroundColor: "#FBE8E4",
  },

  actionBadgeText: {
    fontSize: 9,
    fontWeight: "bold",
  },

  activeText: {
    color: "#43845D",
  },

  inactiveText: {
    color: "#C45B4B",
  },

  separator: {
    height: 1,
    backgroundColor: "#F0E9E1",
    marginVertical: 15,
  },

  infoLabel: {
    color: "#948174",
    fontSize: 10,
  },

  reasonText: {
    color: "#38251D",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
    marginBottom: 15,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 13,
  },

  detailContent: {
    flex: 1,
  },

  detailValue: {
    color: "#38251D",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },

  demoNote: {
    color: "#A89588",
    fontSize: 10,
    textAlign: "center",
    marginTop: 15,
  },

  footer: {
    color: "#A89588",
    fontSize: 10,
    textAlign: "center",
    letterSpacing: 1.5,
    marginTop: 18,
  },
});
