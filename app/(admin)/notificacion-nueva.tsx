
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
  BellRing,
  Users,
  Send,
  CalendarClock,
  Eye,
  Megaphone,
  CheckCircle2,
} from "lucide-react-native";

import { router } from "expo-router";

type Grupo =
  | "Todos los clientes"
  | "Clientes frecuentes"
  | "Clientes inactivos"
  | "Sucursal principal"
  | "Segunda sucursal";

const grupos: {
  nombre: Grupo;
  descripcion: string;
  cantidad: string;
}[] = [
  {
    nombre: "Todos los clientes",
    descripcion: "Todos los clientes activos y elegibles",
    cantidad: "856",
  },
  {
    nombre: "Clientes frecuentes",
    descripcion: "Clientes con visitas recurrentes",
    cantidad: "320",
  },
  {
    nombre: "Clientes inactivos",
    descripcion: "Clientes sin visitas recientes",
    cantidad: "125",
  },
  {
    nombre: "Sucursal principal",
    descripcion: "Clientes de la sucursal principal",
    cantidad: "480",
  },
  {
    nombre: "Segunda sucursal",
    descripcion: "Clientes de la segunda sucursal",
    cantidad: "376",
  },
];

export default function NotificacionNuevaScreen() {
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [grupo, setGrupo] = useState<Grupo>("Todos los clientes");
  const [tipoEnvio, setTipoEnvio] = useState<"Ahora" | "Programar">("Ahora");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const grupoSeleccionado = grupos.find(
    (item) => item.nombre === grupo
  );

  const validarFormulario = () => {
    if (!titulo.trim()) {
      Alert.alert("Falta el título", "Escribe el título de la promoción.");
      return false;
    }

    if (!mensaje.trim()) {
      Alert.alert("Falta el mensaje", "Escribe el mensaje para tus clientes.");
      return false;
    }

    if (tipoEnvio === "Programar" && (!fecha.trim() || !hora.trim())) {
      Alert.alert(
        "Faltan datos",
        "Indica la fecha y hora para programar la notificación."
      );
      return false;
    }

    return true;
  };

  const mostrarVistaPrevia = () => {
    if (!validarFormulario()) return;

    Alert.alert(
      "Vista previa de la notificación",
      `${titulo}\n\n${mensaje}\n\nDestinatarios: ${grupo}\nEnvío: ${
        tipoEnvio === "Ahora"
          ? "Inmediato"
          : `${fecha} a las ${hora}`
      }`,
      [{ text: "Cerrar" }]
    );
  };

  const guardarCampana = () => {
    if (!validarFormulario()) return;

    Alert.alert(
      tipoEnvio === "Ahora" ? "Campaña preparada" : "Campaña programada",
      `La campaña "${titulo}" se ha registrado como demostración.\n\nTodavía no se enviarán notificaciones reales.`,
      [
        {
          text: "Volver a notificaciones",
          onPress: () => router.back(),
        },
      ]
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
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FFFFFF" size={22} />
          </Pressable>

          <View style={styles.headerIcon}>
            <BellRing color="#F5EBDD" size={25} />
          </View>

          <Text style={styles.headerSubtitle}>
            PANEL ADMINISTRATIVO
          </Text>

          <Text style={styles.headerTitle}>
            Crear notificación
          </Text>

          <Text style={styles.headerDescription}>
            Diseña una campaña y comunícate con tus clientes.
          </Text>
        </View>

        {/* INFORMACIÓN */}
        <View style={styles.infoBanner}>
          <Megaphone color="#80583D" size={21} />
          <Text style={styles.infoText}>
            Configura tu promoción, selecciona a quién deseas enviarla y revisa
            el contenido antes de continuar.
          </Text>
        </View>

        {/* CONTENIDO */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Contenido de la notificación
          </Text>
          <Text style={styles.stepLabel}>01</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.inputLabel}>Título de la promoción</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Miércoles de frappé"
            placeholderTextColor="#A89588"
            value={titulo}
            onChangeText={setTitulo}
            maxLength={60}
          />

          <Text style={styles.characterCount}>
            {titulo.length}/60 caracteres
          </Text>

          <Text style={styles.inputLabel}>Mensaje para los clientes</Text>

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Escribe aquí los detalles de tu promoción..."
            placeholderTextColor="#A89588"
            value={mensaje}
            onChangeText={setMensaje}
            multiline
            textAlignVertical="top"
            maxLength={250}
          />

          <Text style={styles.characterCount}>
            {mensaje.length}/250 caracteres
          </Text>
        </View>

        {/* DESTINATARIOS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Seleccionar destinatarios
          </Text>
          <Text style={styles.stepLabel}>02</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.recipientHeader}>
            <Users color="#80583D" size={21} />
            <Text style={styles.recipientTitle}>
              Grupos de difusión
            </Text>
          </View>

          <Text style={styles.helperText}>
            Selecciona el grupo que recibirá esta promoción.
          </Text>

          {grupos.map((item) => {
            const seleccionado = grupo === item.nombre;

            return (
              <Pressable
                key={item.nombre}
                style={[
                  styles.groupOption,
                  seleccionado && styles.groupOptionSelected,
                ]}
                onPress={() => setGrupo(item.nombre)}
              >
                <View style={styles.groupOptionInfo}>
                  <Text
                    style={[
                      styles.groupName,
                      seleccionado && styles.groupNameSelected,
                    ]}
                  >
                    {item.nombre}
                  </Text>

                  <Text style={styles.groupDescription}>
                    {item.descripcion}
                  </Text>
                </View>

                <View style={styles.groupRight}>
                  <Text style={styles.groupCount}>
                    {item.cantidad}
                  </Text>

                  <View
                    style={[
                      styles.radio,
                      seleccionado && styles.radioSelected,
                    ]}
                  >
                    {seleccionado && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
              </Pressable>
            );
          })}

          <View style={styles.recipientSummary}>
            <Users color="#80583D" size={18} />
            <Text style={styles.recipientSummaryText}>
              Destinatarios estimados:{" "}
              <Text style={styles.recipientSummaryNumber}>
                {grupoSeleccionado?.cantidad ?? "0"} clientes
              </Text>
            </Text>
          </View>
        </View>

        {/* PROGRAMACIÓN */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Configuración del envío
          </Text>
          <Text style={styles.stepLabel}>03</Text>
        </View>

        <View style={styles.card}>
          <Pressable
            style={[
              styles.deliveryOption,
              tipoEnvio === "Ahora" && styles.deliveryOptionSelected,
            ]}
            onPress={() => setTipoEnvio("Ahora")}
          >
            <View style={styles.deliveryIcon}>
              <Send color="#80583D" size={21} />
            </View>

            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryTitle}>
                Enviar ahora
              </Text>
              <Text style={styles.deliveryDescription}>
                Envío inmediato cuando se habilite el servicio.
              </Text>
            </View>

            <View
              style={[
                styles.radio,
                tipoEnvio === "Ahora" && styles.radioSelected,
              ]}
            >
              {tipoEnvio === "Ahora" && (
                <View style={styles.radioInner} />
              )}
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.deliveryOption,
              tipoEnvio === "Programar" && styles.deliveryOptionSelected,
            ]}
            onPress={() => setTipoEnvio("Programar")}
          >
            <View style={styles.deliveryIcon}>
              <CalendarClock color="#80583D" size={21} />
            </View>

            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryTitle}>
                Programar envío
              </Text>
              <Text style={styles.deliveryDescription}>
                Selecciona cuándo deseas enviar la campaña.
              </Text>
            </View>

            <View
              style={[
                styles.radio,
                tipoEnvio === "Programar" && styles.radioSelected,
              ]}
            >
              {tipoEnvio === "Programar" && (
                <View style={styles.radioInner} />
              )}
            </View>
          </Pressable>

          {tipoEnvio === "Programar" && (
            <View style={styles.scheduleContainer}>
              <Text style={styles.inputLabel}>Fecha de envío</Text>

              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#A89588"
                value={fecha}
                onChangeText={setFecha}
                keyboardType="numeric"
                maxLength={10}
              />

              <Text style={styles.inputLabel}>Hora de envío</Text>

              <TextInput
                style={styles.input}
                placeholder="Ej. 10:30 AM"
                placeholderTextColor="#A89588"
                value={hora}
                onChangeText={setHora}
                maxLength={10}
              />
            </View>
          )}
        </View>

        {/* VISTA PREVIA */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Vista previa
          </Text>
          <Eye color="#80583D" size={19} />
        </View>

        <View style={styles.previewCard}>
          <View style={styles.previewTop}>
            <View style={styles.previewLogo}>
              <BellRing color="#FFFFFF" size={20} />
            </View>

            <View style={styles.previewBrand}>
              <Text style={styles.previewBrandName}>
                CAFILOVERS
              </Text>
              <Text style={styles.previewTime}>
                Notificación de promoción
              </Text>
            </View>
          </View>

          <Text style={styles.previewTitle}>
            {titulo.trim() || "Título de tu promoción"}
          </Text>

          <Text style={styles.previewMessage}>
            {mensaje.trim() || "Aquí aparecerá el mensaje que recibirán tus clientes."}
          </Text>

          <Text style={styles.previewFooter}>
            CAFIVER · CAFILOVERS
          </Text>
        </View>

        {/* ACCIONES */}
        <Pressable
          style={styles.previewButton}
          onPress={mostrarVistaPrevia}
        >
          <Eye color="#80583D" size={19} />
          <Text style={styles.previewButtonText}>
            Revisar campaña
          </Text>
        </Pressable>

        <Pressable
          style={styles.submitButton}
          onPress={guardarCampana}
        >
          <CheckCircle2 color="#FFFFFF" size={20} />
          <Text style={styles.submitButtonText}>
            {tipoEnvio === "Ahora"
              ? "Preparar notificación"
              : "Guardar programación"}
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          CAFILOVERS · CAMPAÑAS DE DEMOSTRACIÓN
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
    paddingBottom: 40,
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

  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFE2D2",
    marginHorizontal: 18,
    marginTop: 20,
    padding: 14,
    borderRadius: 14,
    gap: 10,
  },

  infoText: {
    flex: 1,
    color: "#75563F",
    fontSize: 11,
    lineHeight: 17,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#38251D",
    fontSize: 16,
    fontWeight: "bold",
  },

  stepLabel: {
    color: "#A87950",
    fontSize: 11,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 17,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  inputLabel: {
    color: "#705747",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 9,
    marginTop: 8,
  },

  input: {
    backgroundColor: "#F7F2EC",
    borderWidth: 1,
    borderColor: "#E9DED1",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 13,
    color: "#38251D",
    fontSize: 13,
  },

  messageInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },

  characterCount: {
    color: "#A89588",
    fontSize: 10,
    textAlign: "right",
    marginTop: 5,
    marginBottom: 12,
  },

  recipientHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  recipientTitle: {
    color: "#38251D",
    fontSize: 14,
    fontWeight: "bold",
  },

  helperText: {
    color: "#948174",
    fontSize: 11,
    marginTop: 8,
    marginBottom: 12,
  },

  groupOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0E8DF",
    marginBottom: 8,
  },

  groupOptionSelected: {
    backgroundColor: "#F8F1E9",
    borderColor: "#A87950",
  },

  groupOptionInfo: {
    flex: 1,
  },

  groupName: {
    color: "#38251D",
    fontSize: 12,
    fontWeight: "bold",
  },

  groupNameSelected: {
    color: "#80583D",
  },

  groupDescription: {
    color: "#948174",
    fontSize: 10,
    marginTop: 4,
  },

  groupRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  groupCount: {
    color: "#80583D",
    fontSize: 11,
    fontWeight: "bold",
  },

  radio: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CBB9A7",
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    borderColor: "#80583D",
  },

  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#80583D",
  },

  recipientSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: "#F3EDE4",
    padding: 12,
    borderRadius: 11,
    marginTop: 8,
  },

  recipientSummaryText: {
    color: "#75563F",
    fontSize: 11,
  },

  recipientSummaryNumber: {
    fontWeight: "bold",
    color: "#38251D",
  },

  deliveryOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 11,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#F0E8DF",
    marginBottom: 10,
    gap: 10,
  },

  deliveryOptionSelected: {
    backgroundColor: "#F8F1E9",
    borderColor: "#A87950",
  },

  deliveryIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "#F2E9DF",
    alignItems: "center",
    justifyContent: "center",
  },

  deliveryInfo: {
    flex: 1,
  },

  deliveryTitle: {
    color: "#38251D",
    fontSize: 12,
    fontWeight: "bold",
  },

  deliveryDescription: {
    color: "#948174",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },

  scheduleContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0E8DF",
  },

  previewCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    padding: 17,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9DED1",
  },

  previewTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },

  previewLogo: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#80583D",
    alignItems: "center",
    justifyContent: "center",
  },

  previewBrand: {
    marginLeft: 10,
  },

  previewBrandName: {
    color: "#38251D",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  previewTime: {
    color: "#A89588",
    fontSize: 10,
    marginTop: 3,
  },

  previewTitle: {
    color: "#38251D",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },

  previewMessage: {
    color: "#705747",
    fontSize: 12,
    lineHeight: 19,
  },

  previewFooter: {
    color: "#A89588",
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 17,
  },

  previewButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    marginHorizontal: 18,
    marginTop: 20,
    padding: 15,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#80583D",
    backgroundColor: "#FFFFFF",
  },

  previewButtonText: {
    color: "#80583D",
    fontSize: 13,
    fontWeight: "bold",
  },

  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    marginHorizontal: 18,
    marginTop: 12,
    padding: 16,
    borderRadius: 13,
    backgroundColor: "#80583D",
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },

  footer: {
    color: "#A89588",
    textAlign: "center",
    fontSize: 9,
    letterSpacing: 1.2,
    marginTop: 28,
  },
});
