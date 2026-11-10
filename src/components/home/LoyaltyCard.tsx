
import { useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  Easing,
} from 'react-native';

import { Coffee, RotateCcw, Snowflake } from 'lucide-react-native';

export default function LoyaltyCard() {
  const totalSellos = 8;
  const sellosActuales = 3;

  const [volteada, setVolteada] = useState(false);

  const giro = useRef(new Animated.Value(0)).current;

  const voltearTarjeta = () => {
    const destino = volteada ? 0 : 180;

    Animated.timing(giro, {
      toValue: destino,
      duration: 650,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    setVolteada(!volteada);
  };

  const giroImagen = giro.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const giroSellos = giro.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <Pressable onPress={voltearTarjeta}>
      <View style={styles.cardContainer}>

        {/* PRIMERA CARA: LOGO NAVIDEÑO */}
        <Animated.View
          style={[
            styles.card,
            styles.front,
            {
              transform: [
                { perspective: 1000 },
                { rotateY: giroImagen },
              ],
            },
          ]}
        >
          <Image
            source={require('../../../assets/card-navidad.png')}
            style={styles.backImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* SEGUNDA CARA: SELLOS */}
        <Animated.View
          style={[
            styles.card,
            styles.stampsCard,
            {
              transform: [
                { perspective: 1000 },
                { rotateY: giroSellos },
              ],
            },
          ]}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.brand}>CAFILOVERS</Text>
              <Text style={styles.title}>
                Tu próxima recompensa
              </Text>
            </View>

            <Coffee color="#E8D5C4" size={38} />
          </View>

          <Text style={styles.progress}>
            {sellosActuales} de {totalSellos} sellos
          </Text>

          <View style={styles.stampsContainer}>
            {Array.from({ length: totalSellos }).map((_, index) => {
              const completado = index < sellosActuales;

              return (
                <View
                  key={index}
                  style={[
                    styles.stamp,
                    completado && styles.stampCompleted,
                  ]}
                >
                 {completado ? (
  <Snowflake color="#FFFFFF" size={23} />
) : (
  <Text style={styles.stampNumber}>
    {index + 1}
  </Text>
)}
                </View>
              );
            })}
          </View>

          <Text style={styles.message}>
            ¡Sigue acumulando visitas!
          </Text>
        </Animated.View>

      </View>

      <View style={styles.flipHint}>
        <RotateCcw color="#A77B59" size={15} />
        <Text style={styles.hintText}>
          {volteada
            ? 'Toca para ver tu tarjeta navideña'
            : 'Toca para descubrir tus sellos'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 245,
    marginBottom: 5,
  },

  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },

  front: {
    backgroundColor: '#075337',
  },

  backImage: {
    width: '100%',
    height: '100%',
  },

  stampsCard: {
    backgroundColor: '#075337',
    padding: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brand: {
    color: '#E8D5C4',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 8,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },

  progress: {
    color: '#E8D5C4',
    fontSize: 16,
    marginTop: 28,
    marginBottom: 18,
  },

  stampsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stamp: {
    width: 39,
    height: 39,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E8D5C4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stampCompleted: {
    backgroundColor: '#ff0000',
    borderColor: '#ff6f00',
  },

  stampNumber: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  message: {
    color: '#E8D5C4',
    fontSize: 14,
    marginTop: 24,
  },

  flipHint: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 10,
    marginBottom: 20,
  },

  hintText: {
    color: '#8C8178',
    fontSize: 12,
  },
});
