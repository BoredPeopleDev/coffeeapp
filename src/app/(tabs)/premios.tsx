
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import SectionHeader from '../../components/common/SectionHeader';
import { Gift, Coffee, Star, Lock } from 'lucide-react-native';

const premios = [
  {
    id: 1,
    nombre: 'Bebida gratis',
    descripcion: 'Disfruta una bebida de nuestra selección.',
    sellos: 8,
    Icon: Coffee,
  },
  {
    id: 2,
    nombre: 'Recompensa especial',
    descripcion: 'Una sorpresa especial para nuestros clientes.',
    sellos: 16,
    Icon: Gift,
  },
  {
    id: 3,
    nombre: 'Cliente VIP',
    descripcion: 'Un beneficio exclusivo para ti.',
    sellos: 24,
    Icon: Star,
  },
];

export default function PremiosScreen() {
  const sellosActuales = 3;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
    <SectionHeader
  title="Mis premios"
  subtitle="Descubre las recompensas que tenemos para ti"
/>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>
          Tu progreso actual
        </Text>

        <Text style={styles.progressNumber}>
          {sellosActuales} / 8 sellos
        </Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${(sellosActuales / 8) * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.progressDescription}>
          Te faltan {8 - sellosActuales} sellos para tu primera recompensa.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Catálogo de premios
      </Text>

      {premios.map((premio) => {
        const desbloqueado = sellosActuales >= premio.sellos;
        const Icon = premio.Icon;

        return (
          <View key={premio.id} style={styles.rewardCard}>
            <View style={styles.rewardIcon}>
              <Icon color="#A77B59" size={30} />
            </View>

            <View style={styles.rewardInfo}>
              <Text style={styles.rewardTitle}>
                {premio.nombre}
              </Text>

              <Text style={styles.rewardDescription}>
                {premio.descripcion}
              </Text>

              <Text style={styles.rewardStamps}>
                {premio.sellos} sellos
              </Text>
            </View>

            {desbloqueado ? (
              <Gift color="#6D8B65" size={24} />
            ) : (
              <Lock color="#958A82" size={22} />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EE',
  },
  content: {
    padding: 22,
    paddingTop: 35,
    paddingBottom: 40,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#38251D',
  },
  subtitle: {
    color: '#8C8178',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 25,
  },
  progressCard: {
    backgroundColor: '#38251D',
    borderRadius: 22,
    padding: 22,
    marginBottom: 30,
  },
  progressTitle: {
    color: '#E8D5C4',
    fontSize: 14,
  },
  progressNumber: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 17,
  },
  progressBackground: {
    height: 9,
    backgroundColor: '#70594D',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: 9,
    backgroundColor: '#D7AD87',
    borderRadius: 10,
  },
  progressDescription: {
    color: '#E8D5C4',
    fontSize: 12,
    marginTop: 14,
  },
  sectionTitle: {
    color: '#38251D',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  rewardIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#F4EBE1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    color: '#38251D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardDescription: {
    color: '#8C8178',
    fontSize: 12,
    marginTop: 5,
  },
  rewardStamps: {
    color: '#A77B59',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 7,
  },
});
