
import { View, Text, StyleSheet } from 'react-native';
import { User, Snowflake } from 'lucide-react-native';

export default function HomeHeader() {
  return (
    <View style={styles.header}>

      {/* Copos de nieve decorativos */}
      <Snowflake
        color="#A8E8FF"
        size={24}
        style={styles.snowflakeOne}
      />

      <Snowflake
        color="#D5F5FF"
        size={17}
        style={styles.snowflakeTwo}
      />

      <Snowflake
        color="#A8E8FF"
        size={20}
        style={styles.snowflakeThree}
      />

      <View style={styles.content}>
        <View>
          <Text style={styles.greeting}>
            ¡Hola, Eduardo!
          </Text>

          <Text style={styles.subtitle}>
            Qué gusto tenerte de vuelta
          </Text>
        </View>

        <View style={styles.avatar}>
          <User color="#FFFFFF" size={25} />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B51F2B',
    marginHorizontal: -22,
    marginTop: -18,
    marginBottom: -55,
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 80,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    position: 'relative',
    overflow: 'hidden',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },

  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    color: '#F8E7E7',
    marginTop: 5,
    fontSize: 14,
  },

  avatar: {
    backgroundColor: '#8E1722',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  snowflakeOne: {
    position: 'absolute',
    top: 12,
    right: 100,
  },

  snowflakeTwo: {
    position: 'absolute',
    bottom: 18,
    left: 45,
  },

  snowflakeThree: {
    position: 'absolute',
    top: 75,
    right: 25,
  },
});
