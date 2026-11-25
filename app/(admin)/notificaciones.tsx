
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";

import {
  BellRing,
  Send,
  Users,
  CalendarClock,
  History,
  ChevronRight,
  Megaphone,
  Plus,
  TrendingUp,
} from "lucide-react-native";

import { router } from "expo-router";

const campaigns = [
  {
    title: "Miércoles de frappé",
    description: "Promoción para clientes frecuentes",
    status: "Enviada",
    date: "23 nov 2026",
  },
  {
    title: "CafiChristmas",
    description: "Campaña de temporada navideña",
    status: "Borrador",
    date: "Pendiente",
  },
];

const groups = [
  {
    name: "Todos los clientes",
    description: "Clientes activos con permiso para promociones",
    icon: Users,
    count: "856",
  },
  {
    name: "Clientes frecuentes",
    description: "Clientes con visitas recurrentes",
    icon: TrendingUp,
    count: "320",
  },
  {
    name: "Clientes inactivos",
    description: "Clientes sin visitas recientes",
    icon: History,
    count: "125",
  },
  {
    name: "Clientes por sucursal",
    description: "Segmentación por cafetería",
    icon: Megaphone,
    count: "2 grupos",
  },
];

export default function NotificacionesScreen() {
  const mostrarAviso = (seccion: string) => {
    Alert.alert(
      seccion,
      "Esta sección la construiremos en el siguiente paso. Por ahora estamos trabajando con datos de demostración."
    );
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
          <View style={styles.headerIcon}>
            <BellRing color="#F5EBDD" size={25} />
          </View>

          <Text style={styles.headerSubtitle}>
            PANEL ADMINISTRATIVO
          </Text>

          <Text style={styles.headerTitle}>
            Notificaciones
          </Text>

          <Text style={styles.headerDescription}>
            Comunícate con tus clientes y comparte promociones de CAFILOVERS.
          </Text>
        </View>

        {/* RESUMEN */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Resumen de campañas
          </Text>
          <Text style={styles.demoLabel}>
            DEMO
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Send color="#80583D" size={21} />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Enviadas</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Users color="#80583D" size={21} />
            </View>
            <Text style={styles.statValue}>856</Text>
            <Text style={styles.statLabel}>Clientes elegibles</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <CalendarClock color="#80583D" size={21} />
            </View>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Programadas</Text>
          </View>
        </View>

        {/* NUEVA NOTIFICACIÓN */}
<Pressable
  style={styles.createButton}
  onPress={() => router.push("/(admin)/notificacion-nueva")}
>
  <View style={styles.createIcon}>
    <Plus color="#FFFFFF" size={23} />
  </View>

  <View style={styles.createInfo}>
    <Text style={styles.createTitle}>
      Crear notificación
    </Text>
  </View>
</Pressable>

        {/* FUNCIONES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Administración
          </Text>
        </View>

        <View style={styles.menuContainer}>
          <Pressable
            style={styles.menuCard}
            onPress={() => router.push("/(admin)/grupos-difusion")}
          >
            <View style={styles.menuIcon}>
              <Users color="#80583D" size={23} />
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>
                Grupos de difusión
              </Text>
              <Text style={styles.menuDescription}>
                Organiza y segmenta a tus clientes.
              </Text>
            </View>
            <ChevronRight color="#A89588" size={20} />
          </Pressable>

          <Pressable
            style={styles.menuCard}
            onPress={() => mostrarAviso("Notificaciones programadas")}
          >
            <View style={styles.menuIcon}>
              <CalendarClock color="#80583D" size={23} />
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>
                Programadas
              </Text>
              <Text style={styles.menuDescription}>
                Consulta los próximos envíos.
              </Text>
            </View>
            <ChevronRight color="#A89588" size={20} />
          </Pressable>

          <Pressable
            style={styles.menuCard}
            onPress={() => mostrarAviso("Historial de envíos")}
          >
            <View style={styles.menuIcon}>
              <History color="#80583D" size={23} />
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>
                Historial de envíos
              </Text>
              <Text style={styles.menuDescription}>
                Revisa las campañas anteriores.
              </Text>
            </View>
            <ChevronRight color="#A89588" size={20} />
          </Pressable>
        </View>

        {/* GRUPOS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Grupos disponibles
          </Text>
          <Text style={styles.sectionLink}>
            {groups.length} grupos
          </Text>
        </View>

        <View style={styles.groupsContainer}>
          {groups.map((group) => {
            const Icon = group.icon;

            return (
              <Pressable
                key={group.name}
                style={styles.groupRow}
                onPress={() => mostrarAviso(group.name)}
              >
                <View style={styles.groupIcon}>
                  <Icon color="#80583D" size={21} />
                </View>

                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>
                    {group.name}
                  </Text>
                  <Text style={styles.groupDescription}>
                    {group.description}
                  </Text>
                </View>

                <Text style={styles.groupCount}>
                  {group.count}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* CAMPAÑAS RECIENTES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Campañas recientes
          </Text>
        </View>

        <View style={styles.campaignContainer}>
          {campaigns.map((campaign) => (
            <View key={campaign.title} style={styles.campaignRow}>
              <View style={styles.campaignIcon}>
                <Megaphone color="#80583D" size={21} />
              </View>

              <View style={styles.campaignInfo}>
                <Text style={styles.campaignTitle}>
                  {campaign.title}
                </Text>
                <Text style={styles.campaignDescription}>
                  {campaign.description}
                </Text>
                <Text style={styles.campaignDate}>
                  {campaign.date}
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  campaign.status === "Enviada"
                    ? styles.statusSent
                    : styles.statusDraft,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    campaign.status === "Enviada"
                      ? styles.statusSentText
                      : styles.statusDraftText,
                  ]}
                >
                  {campaign.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          CAFILOVERS · NOTIFICACIONES
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
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#5A3C2A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    fontSize: 17,
    fontWeight: "bold",
  },

  demoLabel: {
    color: "#A87950",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  sectionLink: {
    color: "#9A7251",
    fontSize: 12,
  },

  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 14,
    gap: 9,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  statValue: {
    color: "#38251D",
    fontSize: 23,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#8B7869",
    fontSize: 10,
    marginTop: 4,
  },

  createButton: {
    backgroundColor: "#80583D",
    marginHorizontal: 18,
    marginTop: 22,
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  createIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#A87950",
    alignItems: "center",
    justifyContent: "center",
  },

  createInfo: {
    flex: 1,
    marginLeft: 12,
  },

  createTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  createDescription: {
    color: "#E8D8C8",
    fontSize: 10,
    marginTop: 4,
  },

  menuContainer: {
    paddingHorizontal: 18,
    gap: 10,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  menuIcon: {
    width: 43,
    height: 43,
    backgroundColor: "#F2E9DF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  menuInfo: {
    flex: 1,
    marginLeft: 13,
  },

  menuTitle: {
    color: "#38251D",
    fontSize: 14,
    fontWeight: "bold",
  },

  menuDescription: {
    color: "#948174",
    fontSize: 11,
    marginTop: 4,
  },

  groupsContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 17,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  groupRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1EAE2",
  },

  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  groupInfo: {
    flex: 1,
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

  groupCount: {
    color: "#80583D",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 6,
  },

  campaignContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 17,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  campaignRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1EAE2",
  },

  campaignIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  campaignInfo: {
    flex: 1,
    marginLeft: 11,
  },

  campaignTitle: {
    color: "#38251D",
    fontSize: 12,
    fontWeight: "bold",
  },

  campaignDescription: {
    color: "#948174",
    fontSize: 10,
    marginTop: 4,
  },

  campaignDate: {
    color: "#A89588",
    fontSize: 9,
    marginTop: 5,
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },

  statusSent: {
    backgroundColor: "#E7F2E9",
  },

  statusDraft: {
    backgroundColor: "#F5EBDD",
  },

  statusText: {
    fontSize: 9,
    fontWeight: "bold",
  },

  statusSentText: {
    color: "#43845D",
  },

  statusDraftText: {
    color: "#9A7251",
  },

  footer: {
    color: "#A89588",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 1.5,
    marginTop: 30,
  },
});
