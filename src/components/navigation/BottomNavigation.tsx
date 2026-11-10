
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';

import {
  House,
  Coffee,
  MapPin,
  QrCode,
  Gift,
  User,
} from 'lucide-react-native';

const tabs = [
  { id: '/', label: 'Inicio', Icon: House },
  { id: '/menu', label: 'Menú', Icon: Coffee },
  { id: '/cafeterias', label: 'Cafeterías', Icon: MapPin },
  { id: '/qr', label: 'Mi QR', Icon: QrCode },
  { id: '/premios', label: 'Premios', Icon: Gift },
  { id: '/perfil', label: 'Perfil', Icon: User },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const activo = pathname === tab.id;
        const Icon = tab.Icon;

        return (
          <Pressable
            key={tab.id}
            style={styles.tab}
            onPress={() => router.push(tab.id as any)}
          >
            <Icon
              size={22}
              color={activo ? '#A77B59' : '#958A82'}
              strokeWidth={activo ? 2.5 : 2}
            />

            <Text
              style={[
                styles.label,
                activo && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEAE5',
    paddingTop: 10,
    paddingBottom: 24,
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 5,
  },
  label: {
    fontSize: 10,
    color: '#958A82',
  },
  activeLabel: {
    color: '#A77B59',
    fontWeight: 'bold',
  },
});
