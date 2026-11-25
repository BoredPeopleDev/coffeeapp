
import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, StatusBar,
} from "react-native";

import {Coffee,Users,Gift, Store, ChartNoAxesCombined, CalendarDays, ChevronRight,Menu, Bell, TrendingUp, ClipboardList, QrCode,BellRing
} from "lucide-react-native";

import { useRouter } from "expo-router";

const indicators = [
  {
    title: "Visitas totales",
    value: "1,283",
    detail: "+12% este mes",
    icon: Coffee,
  },
  {
    title: "Usuarios",
    value: "856",
    detail: "+8% este mes",
    icon: Users,
  },
  {
    title: "Recompensas",
    value: "320",
    detail: "+15% este mes",
    icon: Gift,
  },
  {
    title: "Cafeterías",
    value: "2",
    detail: "Sucursales activas",
    icon: Store,
  },
];

const branches = [
  {
    name: "Cafiver",
    location: "Sucursal principal",
    visits: "756",
    percentage: "59%",
  },
  {
    name: "Cafiver",
    location: "Segunda sucursal",
    visits: "527",
    percentage: "41%",
  },
];

const modules = [
  {
  title: "Notificaciones",
  subtitle: "Promociones y grupos de difusión",
  icon: BellRing,
  route: "/(admin)/notificaciones",
},
  {
    title: "Usuarios",
    subtitle: "Gestionar clientes",
    icon: Users,
    route: "/(admin)/usuarios",
  },  {
    title: "Historial de usuarios",
    subtitle: "Consultar activaciones y desactivaciones",
    icon: ClipboardList,
    route: "/(admin)/historial-usuarios",
  },
  {
  title: "Historial de escaneos QR",
  subtitle: "Consultar sellos otorgados y rechazados",
  icon: QrCode,
  route: "/(admin)/historial-escaneos",
},
  {
    title: "Cafeterías",
    subtitle: "Administrar sucursales",
    icon: Store,
    route: "/(admin)/cafeterias",
  },
  {
    title: "Productos",
    subtitle: "Gestionar el menú",
    icon: Coffee,
    route: "/(admin)/productos",
  },
  {
    title: "Promociones",
    subtitle: "Ofertas y campañas",
    icon: Gift,
    route: "/(admin)/promociones",
  },
  {
    title: "Recompensas",
    subtitle: "Premios y beneficios",
    icon: Gift,
    route: "/(admin)/recompensas",
  },
  {
    title: "Reportes",
    subtitle: "Estadísticas generales",
    icon: ChartNoAxesCombined,
    route: "/(admin)/reportes",
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.brand}>
              <View style={styles.logoIcon}>
                <Coffee color="#E8D2B5" size={23} />
              </View>

              <View>
                <Text style={styles.logo}>Cafilovers</Text>
                <Text style={styles.brandSubtitle}>
                  ADMINISTRACIÓN
                </Text>
              </View>
            </View>

            <Pressable style={styles.headerButton}>
              <Bell color="#FFFFFF" size={21} />
            </Pressable>
          </View>

          <View style={styles.welcome}>
            <View>
              <Text style={styles.welcomeSmall}>
                PANEL ADMINISTRATIVO
              </Text>

              <Text style={styles.welcomeTitle}>
                ¡Hola, Administrador!
              </Text>

              <Text style={styles.welcomeDescription}>
                Este es el resumen de tus cafeterías.
              </Text>
            </View>

            <View style={styles.adminAvatar}>
              <Users color="#FFFFFF" size={23} />
            </View>
          </View>
        </View>

        {/* FECHA */}
        <View style={styles.dateContainer}>
          <CalendarDays color="#8B6A50" size={17} />

          <Text style={styles.dateText}>
            Resumen general · Octubre 2026
          </Text>
        </View>

        {/* INDICADORES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Resumen general
          </Text>

          <Text style={styles.sectionLink}>
            Este mes
          </Text>
        </View>

        <View style={styles.indicatorsGrid}>
          {indicators.map((item) => {
            const Icon = item.icon;

            return (
              <View key={item.title} style={styles.indicatorCard}>
                <View style={styles.indicatorTop}>
                  <View style={styles.indicatorIcon}>
                    <Icon color="#80583D" size={21} />
                  </View>

                  <TrendingUp color="#43845D" size={16} />
                </View>

                <Text style={styles.indicatorValue}>
                  {item.value}
                </Text>

                <Text style={styles.indicatorTitle}>
                  {item.title}
                </Text>

                <Text style={styles.indicatorDetail}>
                  {item.detail}
                </Text>
              </View>
            );
          })}
        </View>

        {/* VISITAS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Actividad de visitas
          </Text>
          <Text style={styles.sectionLink}>
            Ver reportes
          </Text>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartValue}>1,283</Text>
              <Text style={styles.chartDescription}>
                Visitas registradas
              </Text>
            </View>

            <View style={styles.growthBadge}>
              <TrendingUp color="#43845D" size={14} />
              <Text style={styles.growthText}>12%</Text>
            </View>
          </View>

          <View style={styles.chart}>
            {[35, 55, 42, 70, 52, 83, 65, 92, 72, 100, 78, 88].map(
              (height, index) => (
                <View
                  key={index}
                  style={styles.barContainer}
                >
                  <View
                    style={[
                      styles.bar,
                      { height: `${height}%` },
                    ]}
                  />
                </View>
              )
            )}
          </View>

          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>01 Oct</Text>
            <Text style={styles.chartLabel}>15 Oct</Text>
            <Text style={styles.chartLabel}>31 Oct</Text>
          </View>

          <Text style={styles.demoNote}>
            Datos de demostración
          </Text>
        </View>

        {/* CAFETERÍAS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Visitas por cafetería
          </Text>
          <Store color="#8B6A50" size={20} />
        </View>

        <View style={styles.branchCard}>
          {branches.map((branch, index) => (
            <View key={index} style={styles.branchRow}>
              <View style={styles.branchIcon}>
                <Coffee color="#80583D" size={20} />
              </View>

              <View style={styles.branchInfo}>
                <Text style={styles.branchName}>
                  {branch.name}
                </Text>
                <Text style={styles.branchLocation}>
                  {branch.location}
                </Text>
              </View>

              <View style={styles.branchNumbers}>
                <Text style={styles.branchVisits}>
                  {branch.visits}
                </Text>
                <Text style={styles.branchPercentage}>
                  {branch.percentage}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Administración
          </Text>
          <Menu color="#8B6A50" size={21} />
        </View>

        <View style={styles.modulesContainer}>
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Pressable
                key={module.title}
                style={styles.moduleCard}
                onPress={() => router.push(module.route as never)}
              >
                <View style={styles.moduleIcon}>
                  <Icon color="#80583D" size={23} />
                </View>

                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleTitle}>
                    {module.title}
                  </Text>

                  <Text style={styles.moduleSubtitle}>
                    {module.subtitle}
                  </Text>
                </View>

                <ChevronRight color="#A89588" size={20} />
              </Pressable>
            );
          })}
        </View>

        {/* ACTIVIDAD RECIENTE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Actividad reciente
          </Text>
        </View>

        <View style={styles.activityCard}>
          <ClipboardList color="#80583D" size={24} />

          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>
              Panel administrativo
            </Text>
            <Text style={styles.activityDescription}>
              Aquí mostraremos los últimos movimientos del sistema.
            </Text>
          </View>
        </View>

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
    paddingBottom: 27,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logoIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#5A3C2A",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    color: "#F5EBDD",
    fontSize: 21,
    fontWeight: "bold",
  },

  brandSubtitle: {
    color: "#C7A987",
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 3,
  },

  headerButton: {
    backgroundColor: "#50372A",
    padding: 11,
    borderRadius: 13,
  },

  welcome: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeSmall: {
    color: "#C7A987",
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 7,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  welcomeDescription: {
    color: "#DDCFC1",
    fontSize: 12,
    marginTop: 6,
  },

  adminAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#765239",
    alignItems: "center",
    justifyContent: "center",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 8,
  },

  dateText: {
    color: "#806B5B",
    fontSize: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 13,
  },

  sectionTitle: {
    color: "#38251D",
    fontSize: 17,
    fontWeight: "bold",
  },

  sectionLink: {
    color: "#9A7251",
    fontSize: 12,
    fontWeight: "600",
  },

  indicatorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 14,
    gap: 10,
  },

  indicatorCard: {
    width: "48%",
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  indicatorTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  indicatorIcon: {
    backgroundColor: "#F2E9DF",
    padding: 9,
    borderRadius: 11,
  },

  indicatorValue: {
    color: "#38251D",
    fontSize: 25,
    fontWeight: "bold",
  },

  indicatorTitle: {
    color: "#675346",
    fontSize: 12,
    marginTop: 3,
  },

  indicatorDetail: {
    color: "#43845D",
    fontSize: 10,
    marginTop: 8,
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartValue: {
    color: "#38251D",
    fontSize: 27,
    fontWeight: "bold",
  },

  chartDescription: {
    color: "#8B7869",
    fontSize: 12,
    marginTop: 3,
  },

  growthBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7F2E9",
    padding: 8,
    borderRadius: 10,
    gap: 4,
  },

  growthText: {
    color: "#43845D",
    fontSize: 12,
    fontWeight: "bold",
  },

  chart: {
    height: 115,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9DED1",
  },

  barContainer: {
    width: "6%",
    height: "100%",
    justifyContent: "flex-end",
  },

  bar: {
    width: "100%",
    backgroundColor: "#966D4E",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  chartLabel: {
    color: "#9A897D",
    fontSize: 10,
  },

  demoNote: {
    color: "#B0A195",
    fontSize: 9,
    textAlign: "right",
    marginTop: 10,
  },

  branchCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    paddingHorizontal: 14,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  branchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1EAE2",
  },

  branchIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F2E9DF",
    justifyContent: "center",
    alignItems: "center",
  },

  branchInfo: {
    flex: 1,
    marginLeft: 11,
  },

  branchName: {
    color: "#38251D",
    fontWeight: "bold",
    fontSize: 13,
  },

  branchLocation: {
    color: "#9A897D",
    fontSize: 10,
    marginTop: 4,
  },

  branchNumbers: {
    alignItems: "flex-end",
  },

  branchVisits: {
    color: "#38251D",
    fontSize: 15,
    fontWeight: "bold",
  },

  branchPercentage: {
    color: "#9A7251",
    fontSize: 11,
    marginTop: 3,
  },

  modulesContainer: {
    paddingHorizontal: 18,
    gap: 10,
  },

  moduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  moduleIcon: {
    width: 43,
    height: 43,
    backgroundColor: "#F2E9DF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  moduleInfo: {
    flex: 1,
    marginLeft: 13,
  },

  moduleTitle: {
    color: "#38251D",
    fontSize: 14,
    fontWeight: "bold",
  },

  moduleSubtitle: {
    color: "#948174",
    fontSize: 11,
    marginTop: 4,
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  activityInfo: {
    flex: 1,
  },

  activityTitle: {
    color: "#38251D",
    fontWeight: "bold",
    fontSize: 13,
  },

  activityDescription: {
    color: "#948174",
    fontSize: 11,
    marginTop: 5,
  },

  footer: {
    color: "#A89588",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 1.5,
    marginTop: 30,
  },
});
