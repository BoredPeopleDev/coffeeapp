
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Snowflake } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsPosition = useRef(new Animated.Value(30)).current;

  const [showButtons, setShowButtons] = useState(false);

  const snowflakes = useRef(
    Array.from({ length: 12 }, () => new Animated.Value(-40))
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      setShowButtons(true);

      Animated.parallel([
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsPosition, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3500);

    const animations = snowflakes.map((position, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(position, {
            toValue: height + 40,
            duration: 4500 + index * 350,
            useNativeDriver: true,
          }),
          Animated.timing(position, {
            toValue: -40,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach(animation => animation.start());

    return () => {
      clearTimeout(timer);
      animations.forEach(animation => animation.stop());
    };
  }, []);

  return (
    <LinearGradient
      colors={['#001C13', '#00452D', '#00251A']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Nieve animada */}
      <View pointerEvents="none" style={styles.snowLayer}>
        {snowflakes.map((position, index) => (
          <Animated.View
            key={index}
            style={[
              styles.snowflake,
              {
                left: `${(index * 37 + 8) % 100}%`,
                transform: [{ translateY: position }],
              },
            ]}
          >
            <Snowflake
              color="#D8F5EA"
              size={14 + (index % 3) * 5}
            />
          </Animated.View>
        ))}
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            source={require('../../../assets/logo-navidad.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }}
        >
          <Text style={styles.welcome}>
            ¡BIENVENIDO!
          </Text>
          <Text style={styles.subtitle}>
            Tu café, tus momentos, tus recompensas.
          </Text>
        </Animated.View>

        {showButtons && (
          <Animated.View
            style={[
              styles.buttonsContainer,
              {
                opacity: buttonsOpacity,
                transform: [{ translateY: buttonsPosition }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginText}>
                INICIAR SESIÓN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerText}>
                CREAR CUENTA
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <Text style={styles.footer}>
          CAFILOVERS · HECHO PARA DISFRUTAR
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
snowLayer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
},
  snowflake: {
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: width * 0.85,
    height: height * 0.38,
    marginBottom: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 3,
  },
  subtitle: {
    color: '#D8E9DF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 35,
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#B51F2B',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  registerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 35,
    color: '#B8D5C6',
    fontSize: 10,
    letterSpacing: 2,
  },
});
