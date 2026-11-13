import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // INICIO DE SESIÓN DE PRUEBA
  const iniciarSesion = () => {
    const correoDemo = "demo@cafilovers.com";
    const passwordDemo = "Cafi1234";

    if (!correo.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Ingresa tu correo y contraseña.");
      return;
    }

    if (
      correo.trim().toLowerCase() === correoDemo &&
      password === passwordDemo
    ) {
      Alert.alert(
        "¡Bienvenido a Cafilovers!",
        "Has iniciado sesión correctamente.",
        [
          {
            text: "Continuar",
            onPress: () => router.replace("/(tabs)"),
          },
        ],
      );
    } else {
      Alert.alert(
        "Datos incorrectos",
        "El correo o la contraseña no son correctos.",
      );
    }
  };

  return (
    <LinearGradient
      colors={["#001C13", "#00452D", "#00251A"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* LOGO */}
          <Image
            source={require("../../assets/logo-navidad.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* ENCABEZADO */}
          <Text style={styles.title}>¡Qué gusto tenerte de vuelta!</Text>

          <Text style={styles.subtitle}>
            Inicia sesión y disfruta tus recompensas.
          </Text>

          {/* FORMULARIO */}
          <View style={styles.form}>
            {/* CORREO */}
            <Text style={styles.label}>Correo electrónico</Text>

            <TextInput
              style={styles.input}
              placeholder="Ingresa tu correo"
              placeholderTextColor="#999999"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* CONTRASEÑA */}
            <Text style={styles.label}>Contraseña</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!mostrarPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setMostrarPassword(!mostrarPassword)}
              >
                <Text style={styles.showPassword}>
                  {mostrarPassword ? "Ocultar" : "Ver"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* RECUPERAR CONTRASEÑA */}
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() =>
                Alert.alert(
                  "Recuperar contraseña",
                  "Esta función estará disponible próximamente.",
                )
              }
            >
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* INICIAR SESIÓN */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={iniciarSesion}
            >
              <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>

            {/* REGISTRO */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta?</Text>

              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* VOLVER */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/welcome")}
          >
            <Text style={styles.backText}>← Volver al inicio</Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <Text style={styles.footer}>CAFILOVERS · HECHO PARA DISFRUTAR</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 45,
    paddingBottom: 30,
  },

  logo: {
    width: 190,
    height: 170,
    marginBottom: 15,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#D8E9DF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 35,
  },

  form: {
    width: "100%",
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 9,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    height: 54,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#38251D",
  },

  passwordContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    height: 54,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#38251D",
  },

  showPassword: {
    color: "#B51F2B",
    fontWeight: "bold",
    padding: 8,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 15,
    marginBottom: 30,
  },

  forgotText: {
    color: "#FFFFFF",
    fontSize: 13,
    textDecorationLine: "underline",
  },

  loginButton: {
    backgroundColor: "#B51F2B",
    borderRadius: 30,
    paddingVertical: 17,
    alignItems: "center",
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 28,
    gap: 5,
  },

  registerText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  registerLink: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  backButton: {
    marginTop: 30,
    padding: 10,
  },

  backText: {
    color: "#D8E9DF",
    fontSize: 14,
  },

  footer: {
    color: "#B8D5C6",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 30,
    textAlign: "center",
  },
});
