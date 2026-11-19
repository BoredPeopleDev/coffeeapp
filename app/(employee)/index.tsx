
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Alert,
} from "react-native";
import {
  User,
  LogOut,
  ScanQrCode,
  Coffee,
  ShoppingBag,
  CakeSlice,
  Sandwich,
  ChevronRight,
  Snowflake,
} from "lucide-react-native";

const products = [
  {
    id: "1",
    name: "Cheesecake de zarzamora",
    description: "Postre destacado de la semana",
    icon: CakeSlice,
    color: "#F2DFD5",
  },
  {
    id: "2",
    name: "Baguette",
    description: "Nuestra recomendación semanal",
    icon: Sandwich,
    color: "#EADFC8",
  },
  {
    id: "3",
    name: "Café del mes",
    description: "Bolsa de café envasado",
    icon: ShoppingBag,
    color: "#DCC9B8",
  },
];

export default function EmployeeScreen() {
  const { width } = useWindowDimensions();

  const isTablet = width >= 700;

  const handleScan = () => {
    Alert.alert(
      "Escáner QR",
      "Aquí conectaremos la cámara para escanear el código del cliente."
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "La función de cierre de sesión se conectará posteriormente."
    );
  };

  return (
    <ScrollView
      style={styles.safe}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ENCABEZADO */}
      <View style={styles.header}>
        <Snowflake
          color="#A8E8FF"
          size={22}
          style={styles.snowflake}
        />

        <View style={styles.headerTop}>
          <Text style={styles.logo}>CAFILOVERS</Text>
          <Coffee color="#FFFFFF" size={25} />
        </View>

        <View style={styles.headerContent}>
          <View style={styles.avatar}>
            <User color="#FFFFFF" size={25} />
          </View>

          <View style={styles.employeeInfo}>
            <Text style={styles.greeting}>¡Hola, empleado!</Text>
            <Text style={styles.subtitle}>
              Bienvenido a tu espacio de trabajo
            </Text>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut color="#FFFFFF" size={21} />
          </Pressable>
        </View>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <View
        style={[
          styles.mainContent,
          isTablet && styles.tabletContent,
        ]}
      >
        {/* ESCÁNER */}
        <View
          style={[
            styles.scannerSection,
            isTablet && styles.scannerTablet,
          ]}
        >
          <Text style={styles.sectionTitle}>
            Atención al cliente
          </Text>

          <Text style={styles.sectionDescription}>
            Escanea el código QR del cliente para registrar su visita.
          </Text>

          <Pressable
            style={styles.scannerCard}
            onPress={handleScan}
          >
            <View style={styles.scannerIcon}>
              <ScanQrCode color="#FFFFFF" size={65} />
            </View>

            <Text style={styles.scannerTitle}>
              Escanear código QR
            </Text>

            <Text style={styles.scannerDescription}>
              Registra los sellos de fidelización
            </Text>

            <View style={styles.scanButton}>
              <Text style={styles.scanButtonText}>
                Abrir escáner
              </Text>
              <ChevronRight color="#FFFFFF" size={19} />
            </View>
          </Pressable>
        </View>

        {/* PRODUCTOS DE LA SEMANA */}
        <View
          style={[
            styles.productsSection,
            isTablet && styles.productsTablet,
          ]}
        >
          <View style={styles.productsHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Productos de la semana
              </Text>
              <Text style={styles.sectionDescription}>
                ¡Recomiéndalos a nuestros clientes!
              </Text>
            </View>
          </View>

          {products.map((product) => {
            const ProductIcon = product.icon;

            return (
              <View
                key={product.id}
                style={styles.productCard}
              >
                <View
                  style={[
                    styles.productImage,
                    { backgroundColor: product.color },
                  ]}
                >
                  <ProductIcon
                    color="#69452F"
                    size={38}
                  />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {product.name}
                  </Text>

                  <Text style={styles.productDescription}>
                    {product.description}
                  </Text>

                  <Text style={styles.productLabel}>
                    PRODUCTO DESTACADO
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <Text style={styles.footer}>
        CAFILOVERS · Cada visita cuenta
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F4EE",
  },

  container: {
    paddingBottom: 30,
  },

  header: {
    backgroundColor: "#B51F2B",
    paddingHorizontal: 22,
    paddingTop: 35,
    paddingBottom: 28,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    backgroundColor: "#8E1722",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  employeeInfo: {
    flex: 1,
    marginLeft: 12,
  },

  greeting: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#F8E7E7",
    fontSize: 12,
    marginTop: 4,
  },

  logoutButton: {
    padding: 10,
  },

  snowflake: {
    position: "absolute",
    right: 75,
    top: 65,
  },

  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  tabletContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 25,
  },

  scannerSection: {
    marginBottom: 28,
  },

  scannerTablet: {
    flex: 1,
    marginBottom: 0,
  },

  productsSection: {
    marginBottom: 15,
  },

  productsTablet: {
    flex: 1,
  },

  sectionTitle: {
    color: "#38251D",
    fontSize: 19,
    fontWeight: "bold",
  },

  sectionDescription: {
    color: "#8A7669",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 16,
  },

  scannerCard: {
    backgroundColor: "#3B241B",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 260,
  },

  scannerIcon: {
    width: 105,
    height: 105,
    borderRadius: 22,
    backgroundColor: "#68432F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17,
  },

  scannerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  scannerDescription: {
    color: "#E6D5C9",
    fontSize: 12,
    marginTop: 7,
  },

  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B51F2B",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 25,
    marginTop: 20,
  },

  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },

  productsHeader: {
    marginBottom: 5,
  },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 11,
    borderRadius: 17,
    marginBottom: 12,
    elevation: 2,
  },

  productImage: {
    width: 85,
    height: 85,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  productInfo: {
    flex: 1,
    marginLeft: 13,
  },

  productName: {
    color: "#38251D",
    fontSize: 15,
    fontWeight: "bold",
  },

  productDescription: {
    color: "#8A7669",
    fontSize: 11,
    marginTop: 5,
  },

  productLabel: {
    color: "#A8754F",
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 8,
    letterSpacing: 0.5,
  },

  footer: {
    textAlign: "center",
    color: "#A89588",
    fontSize: 11,
    marginTop: 15,
  },
});
