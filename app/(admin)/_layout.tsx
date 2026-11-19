
import { Stack } from "expo-router";

import { AdminProvider } from "../../src/features/admin/context/AdminContext";

import { UsuariosProvider } from "../../src/features/admin/context/UsuariosContext";

export default function AdminLayout() {
  return (
    <AdminProvider>
      <UsuariosProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
            contentStyle: {
              backgroundColor: "#F8F4EE",
            },
            gestureEnabled: true,
          }}
        />
      </UsuariosProvider>
    </AdminProvider>
  );
}
