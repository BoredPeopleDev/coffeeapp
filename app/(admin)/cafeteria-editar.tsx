import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useAdmin } from "../../src/features/admin/context/AdminContext";

export default function CafeteriaEditarScreen() {
  const params = useLocalSearchParams();
  const { cafeterias, actualizarCafeteria } = useAdmin();

  const id = Number(params.id);

  const cafeteria = cafeterias.find(
    (item) => item.id === id
  );

  const [nombre, setNombre] = useState(cafeteria?.nombre ?? "");
  const [sucursal, setSucursal] = useState(cafeteria?.sucursal ?? "");
  const [direccion, setDireccion] = useState(cafeteria?.direccion ?? "");
  const [horario, setHorario] = useState(cafeteria?.horario ?? "");

  if (!cafeteria) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>No se encontró la cafetería</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.volver}>← Regresar</Text>
        </Pressable>
      </View>
    );
  }

  const guardarCambios = () => {
    if (!nombre.trim() || !sucursal.trim() || !direccion.trim() || !horario.trim()) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, completa todos los campos."
      );
      return;
    }

    actualizarCafeteria(id, {
      nombre: nombre.trim(),
      sucursal: sucursal.trim(),
      direccion: direccion.trim(),
      horario: horario.trim(),
    });

    Alert.alert(
      "Cambios guardados",
      "La información de la cafetería se actualizó correctamente.",
      [
        {
          text: "Aceptar",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.volver}>← Regresar</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.etiqueta}>ADMINISTRACIÓN</Text>
        <Text style={styles.titulo}>Editar cafetería</Text>
        <Text style={styles.descripcion}>
          Actualiza la información de esta sucursal.
        </Text>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.label}>Nombre de la empresa</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ej. Cafiver"
          placeholderTextColor="#A18F7F"
        />

        <Text style={styles.label}>Nombre de la sucursal</Text>
        <TextInput
          style={styles.input}
          value={sucursal}
          onChangeText={setSucursal}
          placeholder="Ej. Sucursal principal"
          placeholderTextColor="#A18F7F"
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={direccion}
          onChangeText={setDireccion}
          placeholder="Dirección de la cafetería"
          placeholderTextColor="#A18F7F"
        />

        <Text style={styles.label}>Horario de atención</Text>
        <TextInput
          style={styles.input}
          value={horario}
          onChangeText={setHorario}
          placeholder="Ej. Lunes a sábado · 8:00 a 20:00"
          placeholderTextColor="#A18F7F"
        />

        <Pressable
          style={styles.saveButton}
          onPress={guardarCambios}
        >
          <Text style={styles.saveButtonText}>
            Guardar cambios
          </Text>
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>
            Cancelar
          </Text>
        </Pressable>
      </View>

      <Text style={styles.nota}>
        Los cambios se conservarán temporalmente mientras la aplicación
        permanezca abierta. Todavía no se guardan en el servidor.
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
  volver: {
    color: "#8B6D57",
    fontSize: 14,
    fontWeight: "700",
  },
  header: {
    marginBottom: 25,
  },
  etiqueta: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#A58A70",
    marginBottom: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#38251D",
  },
  descripcion: {
    fontSize: 14,
    color: "#88786B",
    marginTop: 7,
    lineHeight: 21,
  },
  formulario: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EDE5DA",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#38251D",
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#F8F5F0",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E8DED2",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: "#38251D",
  },
  saveButton: {
    backgroundColor: "#38251D",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 28,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  cancelButton: {
    backgroundColor: "#F3EDE4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  cancelButtonText: {
    color: "#8B443D",
    fontSize: 14,
    fontWeight: "700",
  },
  nota: {
    textAlign: "center",
    color: "#A18F7F",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 20,
  },
});