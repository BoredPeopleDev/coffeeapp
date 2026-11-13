
import { View, Text, StyleSheet } from 'react-native';
import { Gift, Coffee } from 'lucide-react-native';

type PromotionCardProps = {
  titulo: string;
  descripcion: string;
  tipo: 'gift' | 'coffee';
};

export default function PromotionCard({
  titulo,
  descripcion,
  tipo,
}: PromotionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {tipo === 'gift' ? (
          <Gift color="#38251D" size={30} />
        ) : (
          <Coffee color="#38251D" size={30} />
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{titulo}</Text>
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
