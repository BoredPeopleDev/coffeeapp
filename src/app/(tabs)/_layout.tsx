
import { Tabs } from 'expo-router';

import {
  House,
  Coffee,
  MapPin,
  QrCode,
  Gift,
  User,
} from 'lucide-react-native';
import { View } from 'react-native';
import Snowfall from '../../components/common/Snowfall';
export default function TabsLayout() {

return (
  <View style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: '#E31B23',
        tabBarInactiveTintColor: '#FFFFFF',

        tabBarStyle: {
          backgroundColor: '#003F26',
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopColor: '#075337',
          borderTopWidth: 1,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          tabBarIcon: ({ color, size }) => (
            <Coffee color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="cafeterias"
        options={{
          title: 'Cafeterías',
          tabBarIcon: ({ color, size }) => (
            <MapPin color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="qr"
        options={{
          title: 'Mi QR',
          tabBarIcon: ({ color, size }) => (
            <QrCode color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="premios"
        options={{
          title: 'Premios',
          tabBarIcon: ({ color, size }) => (
            <Gift color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>

    <Snowfall />
  </View>
);

}
