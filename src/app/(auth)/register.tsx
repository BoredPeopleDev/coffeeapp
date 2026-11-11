
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Image,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');

  const [sucursal, setSucursal] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const anioActual = new Date().getFullYear();

  // Validar fecha de nacimiento
  const validarFecha = () => {
    if (!dia || !mes || !anio) return false;

    const fecha = new Date(
      Number(anio),
      Number(mes) - 1,
      Number(dia)
    );

    const hoy = new Date();

    return (
      fecha.getFullYear() === Number(anio) &&
      fecha.getMonth() === Number(mes) - 1 &&
      fecha.getDate() === Number(dia) &&
      fecha <= hoy
    );
  };

  // Registrar usuario
  const registrarUsuario = () => {
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !dia ||
      !mes ||
      !anio ||
      !sucursal ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, completa todos los campos.'
      );
      return;
    }

    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());

    if (!correoValido) {
      Alert.alert(
        'Correo inválido',
        'Ingresa un correo electrónico válido.'
      );
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      Alert.alert(
        'Teléfono inválido',
        'Ingresa un número de teléfono de 10 dígitos.'
      );
      return;
    }

    if (!validarFecha()) {
      Alert.alert(
        'Fecha inválida',
        'Selecciona una fecha de nacimiento válida.'
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Contraseña inválida',
        'Tu contraseña debe tener al menos 8 caracteres.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Error',
        'Las contraseñas no coinciden.'
      );
      return;
    }

    const fechaNacimiento =
      `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

    Alert.alert(
      '¡Todo listo!',
      `Tu formulario está completo.\n\nFecha de nacimiento: ${fechaNacimiento}\nSucursal favorita: ${sucursal}\n\nPróximamente conectaremos tu registro con Cafilovers.`
    );
  };

  return (
    <LinearGradient
      colors={['#001C13', '#00452D', '#00251A']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* LOGO */}
          <Image
            source={require('../../../assets/logo-navidad.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* ENCABEZADO */}
          <Text style={styles.title}>
            ¡Únete a Cafilovers!
          </Text>

          <Text style={styles.subtitle}>
            Crea tu cuenta y comienza a disfrutar tus recompensas.
          </Text>

          <View style={styles.form}>

            {/* NOMBRE */}
            <Text style={styles.label}>Nombre completo</Text>

            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nombre"
              placeholderTextColor="#999999"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
            />

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

            {/* TELÉFONO */}
            <Text style={styles.label}>Teléfono</Text>

            <TextInput
              style={styles.input}
              placeholder="Ingresa tu número"
              placeholderTextColor="#999999"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
              maxLength={10}
            />

            {/* FECHA DE NACIMIENTO */}
            <Text style={styles.label}>Fecha de nacimiento</Text>

            <View style={styles.dateContainer}>

              {/* DÍA */}
              <View style={styles.datePicker}>
                <Picker
                  selectedValue={dia}
                  onValueChange={(value) => setDia(value)}
                  mode="dropdown"
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Día" value="" />

                  {Array.from({ length: 31 }, (_, i) => (
                    <Picker.Item
                      key={i + 1}
                      label={String(i + 1)}
                      value={String(i + 1)}
                    />
                  ))}
                </Picker>
              </View>

              {/* MES */}
              <View style={styles.datePicker}>
                <Picker
                  selectedValue={mes}
                  onValueChange={(value) => setMes(value)}
                  mode="dropdown"
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Mes" value="" />

                  {meses.map((nombreMes, index) => (
                    <Picker.Item
                      key={index + 1}
                      label={nombreMes}
                      value={String(index + 1)}
                    />
                  ))}
                </Picker>
              </View>

              {/* AÑO */}
              <View style={styles.datePicker}>
                <Picker
                  selectedValue={anio}
                  onValueChange={(value) => setAnio(value)}
                  mode="dropdown"
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Año" value="" />

                  {Array.from(
                    { length: anioActual - 1919 },
                    (_, i) => anioActual - i
                  ).map((year) => (
                    <Picker.Item
                      key={year}
                      label={String(year)}
                      value={String(year)}
                    />
                  ))}
                </Picker>
              </View>

            </View>

            {/* SUCURSAL */}
            <Text style={styles.label}>
              Selecciona tu sucursal favorita
            </Text>

            <View style={styles.branchContainer}>
              <TouchableOpacity
                style={[
                  styles.branchButton,
                  sucursal === '1' && styles.branchSelected,
                ]}
                onPress={() => setSucursal('1')}
              >
                <Text style={styles.branchText}>
                  SUCURSAL 1
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.branchButton,
                  sucursal === '2' && styles.branchSelected,
                ]}
                onPress={() => setSucursal('2')}
              >
                <Text style={styles.branchText}>
                  SUCURSAL 2
                </Text>
              </TouchableOpacity>
            </View>

            {/* CONTRASEÑA */}
            <Text style={styles.label}>Contraseña</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Mínimo 8 caracteres"
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
                  {mostrarPassword ? 'Ocultar' : 'Ver'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* CONFIRMAR CONTRASEÑA */}
            <Text style={styles.label}>Confirmar contraseña</Text>

            <TextInput
              style={styles.input}
              placeholder="Repite tu contraseña"
              placeholderTextColor="#999999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!mostrarPassword}
              autoCapitalize="none"
            />

            {/* BOTÓN REGISTRO */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={registrarUsuario}
            >
              <Text style={styles.registerButtonText}>
                CREAR MI CUENTA
              </Text>
            </TouchableOpacity>

          </View>

          {/* IR A LOGIN */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              ¿Ya tienes una cuenta?
            </Text>

            <TouchableOpacity
              onPress={() => router.replace('/login')}
            >
              <Text style={styles.loginLink}>
                Inicia sesión
              </Text>
            </TouchableOpacity>
          </View>

          {/* VOLVER */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/welcome')}
          >
            <Text style={styles.backText}>
              ← Volver al inicio
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            CAFILOVERS · HECHO PARA DISFRUTAR
          </Text>

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
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 35,
    paddingBottom: 30,
  },

  logo: {
    width: 150,
    height: 130,
    marginBottom: 10,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#D8E9DF',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  form: {
    width: '100%',
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 13,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#38251D',
  },

  dateContainer: {
  flexDirection: 'row',
  gap: 8,
  alignItems: 'center',
},

datePicker: {
  flex: 1,
  height: 105,
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  justifyContent: 'center',
},

picker: {
  width: '100%',
  height: 105,
  color: '#38251D',
},

pickerItem: {
  color: '#38251D',
  fontSize: 15,
},

  branchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 5,
  },

  branchButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  branchSelected: {
    backgroundColor: '#B51F2B',
    borderColor: '#B51F2B',
  },

  branchText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  passwordContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#38251D',
  },

  showPassword: {
    color: '#B51F2B',
    fontWeight: 'bold',
    padding: 8,
  },

  registerButton: {
    backgroundColor: '#B51F2B',
    borderRadius: 30,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 30,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 25,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 13,
  },

  loginLink: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  backButton: {
    marginTop: 20,
    padding: 10,
  },

  backText: {
    color: '#D8E9DF',
    fontSize: 14,
  },

  footer: {
    color: '#B8D5C6',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 25,
    textAlign: 'center',
  },
});
