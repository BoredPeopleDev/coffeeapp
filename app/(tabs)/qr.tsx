import { QrCode, ShieldCheck } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import SectionHeader from "../../src/components/common/SectionHeader";

export default function QRScreen() {
  const codigoCliente = "CAFILOVERS-CLIENTE-001";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader
        title="Mi código QR"
        subtitle="Identifícate y acumula tus sellos"
      />

      <View style={styles.qrCard}>
        <View style={styles.iconContainer}>
          <QrCode color="#A77B59" size={28} />
        </View>

        <Text style={styles.cardTitle}>Tu identificación Cafilovers</Text>

        <Text style={styles.cardSubtitle}>Eduardo Rodríguez</Text>

        <View style={styles.qrContainer}>
          <QRCode
            value={codigoCliente}
            size={210}
            color="#38251D"
            backgroundColor="#FFFFFF"
          />
        </View>

        <Text style={styles.code}>{codigoCliente}</Text>

        <Text style={styles.instruction}>
          Muestra este código al personal de nuestra cafetería.
        </Text>
      </View>

      <View style={styles.security}>
        <ShieldCheck color="#6D8B65" size={25} />

        <View style={styles.securityText}>
          <Text style={styles.securityTitle}>Tu cuenta está protegida</Text>

          <Text style={styles.securityDescription}>
            Este es un QR de demostración. La validación real se realizará desde
            nuestro servidor.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EE",
  },
  content: {
    padding: 22,
    paddingTop: 35,
    paddingBottom: 40,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#38251D",
  },
  subtitle: {
    color: "#8C8178",
    fontSize: 14,
    marginTop: 7,
    marginBottom: 28,
  },
  qrCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#F4EBE1",
    padding: 13,
    borderRadius: 15,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#38251D",
  },
  cardSubtitle: {
    color: "#8C8178",
    marginTop: 7,
    marginBottom: 25,
  },
  qrContainer: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFEAE5",
    borderRadius: 15,
  },
  code: {
    color: "#A77B59",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 18,
    letterSpacing: 1,
  },
  instruction: {
    color: "#8C8178",
    fontSize: 13,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 20,
  },
  security: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginTop: 20,
    alignItems: "center",
  },
  securityText: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    color: "#38251D",
    fontWeight: "bold",
    marginBottom: 5,
  },
  securityDescription: {
    color: "#8C8178",
    fontSize: 12,
    lineHeight: 18,
  },
});
