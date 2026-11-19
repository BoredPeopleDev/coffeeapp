
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#F8F4EE',
        },
      }}
    >
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(employee)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
  name="(admin)"
  options={{ headerShown: false }}
/>
    </Stack>
  );
}
