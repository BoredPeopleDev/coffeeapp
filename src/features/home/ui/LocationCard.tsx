
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';

type LocationCardProps = {
  nombre: string;
  descripcion: string;
};

export default function LocationCard({
  nombre,
  descripcion,
}: LocationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <MapPin color="#A77B59" size={31} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{nombre}</Text>
        <Text style={styles.description}>{descripcion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: '#EBDCCB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#38251D',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#8C8178',
    fontSize: 14,
  },
});
