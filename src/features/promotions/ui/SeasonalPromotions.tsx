
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  Animated,
  StatusBar,
  ImageSourcePropType,
} from "react-native";

// Imágenes de promociones
const promotions = {
  featured: require("../../../../assets/imagenes/temporada/NAVIDAD-26.png"),
  poster: require("../../../../assets/imagenes/temporada/NAVIDAD-2.png"),
  experience: require("../../../../assets/imagenes/temporada/NAVIDAD-21.png"),
};

export default function SeasonalPromotions() {
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  // Valores para las animaciones
  const scale = useRef(new Animated.Value(0.92)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Abrir imagen
  const openImage = (image: ImageSourcePropType) => {
    setSelectedImage(image);
    setModalVisible(true);

    scale.setValue(0.92);
    opacity.setValue(0);

    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  // Cerrar imagen
  const closeImage = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      setSelectedImage(null);
    });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>
          La temporada navideña ya esta aqui!🎄
        </Text>

        <Text style={styles.subtitle}>
          Descubre nuestras bebidas de temporada
        </Text>
      </View>

      {/* Tarjeta principal */}
      <Pressable
        style={styles.featuredCard}
        onPress={() => openImage(promotions.featured)}
      >
        <Image
          source={promotions.featured}
          style={styles.featuredImage}
          resizeMode="cover"
        />

        <View style={styles.featuredOverlay}>
          <Text style={styles.featuredTitle}>
            Sabores de Navidad
          </Text>

          <Text style={styles.featuredDescription}>
            Disfruta nuestra colección de temporada.
          </Text>
        </View>
      </Pressable>

      {/* Catálogo secundario */}
      <View style={styles.catalogContainer}>
        {/* Cartel publicitario */}
        <Pressable
          style={styles.catalogCard}
          onPress={() => openImage(promotions.poster)}
        >
          <Image
            source={promotions.poster}
            style={styles.posterImage}
            resizeMode="contain"
          />

          <View style={styles.posterFooter}>
            <Text style={styles.posterTitle}>
              Campaña navideña
            </Text>

            <Text style={styles.posterSubtitle}>
              CAFIVER
            </Text>
          </View>
        </Pressable>

        {/* Fotografía de temporada */}
        <Pressable
          style={styles.catalogCard}
          onPress={() => openImage(promotions.experience)}
        >
          <Image
            source={promotions.experience}
            style={styles.catalogImage}
            resizeMode="cover"
          />

          <View style={styles.catalogFooter}>
            <Text style={styles.catalogTitle}>
              Vive la Navidad
            </Text>

            <Text style={styles.catalogSubtitle}>
              Momentos para compartir
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Modal de imagen */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeImage}
      >
        <StatusBar barStyle="light-content" />

        <View style={styles.modalContainer}>
          {/* Fondo de pantalla */}
          <Pressable
            style={styles.backgroundTouchable}
            onPress={closeImage}
          />

          {/* Tarjeta emergente animada */}
          {selectedImage && (
            <Animated.View
              style={[
                styles.expandedImageContainer,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            >
              <Pressable
                style={styles.imageTouchArea}
                onPress={closeImage}
              >
                {/* Fondo de la tarjeta */}
                <Image
                  source={selectedImage}
                  style={styles.expandedImage}
                  resizeMode="cover"
                />

                {/* Capa opaca */}
                <View style={styles.imageOverlay} />

                {/* Imagen original nítida */}
                <Image
                  source={selectedImage}
                  style={styles.expandedImageForeground}
                  resizeMode="contain"
                />
              </Pressable>
            </Animated.View>
          )}

          {/* Indicador */}
          <Text style={styles.modalHint}>
            Toca la imagen para cerrar
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -15,
    marginBottom: 25
  },

  // Encabezado
  header: {
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#38251D",
  },

  subtitle: {
    fontSize: 13,
    color: "#8A8179",
    marginTop: 5,
  },

  // Tarjeta principal
  featuredCard: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#285943",
  },

  featuredImage: {
    width: "100%",
    height: 190,
  },

  featuredOverlay: {
    padding: 15,
  },

  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },

  featuredDescription: {
    color: "#E8E5D6",
    fontSize: 12,
    marginTop: 4,
  },

  // Catálogo secundario
  catalogContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },

  catalogCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
  },

  posterImage: {
    width: "100%",
    height: 190,
    backgroundColor: "#281216",
  },

  catalogImage: {
    width: "100%",
    height: 190,
  },

  posterFooter: {
    padding: 10,
    backgroundColor: "#9E252D",
  },

  posterTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  posterSubtitle: {
    fontSize: 11,
    color: "#F8E8E3",
    marginTop: 3,
  },

  catalogFooter: {
    padding: 10,
    backgroundColor: "#EADBCB",
  },

  catalogTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#38251D",
  },

  catalogSubtitle: {
    fontSize: 11,
    color: "#80634F",
    marginTop: 3,
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(18, 11, 11, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  backgroundTouchable: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  // Tarjeta emergente
  expandedImageContainer: {
    width: "88%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  imageTouchArea: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },

  // Imagen de fondo
  expandedImage: {
    width: "100%",
    height: "100%",
  },

  // Opacidad del fondo interior
  imageOverlay: {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "rgba(18, 11, 11, 0.65)",
},

  // Imagen principal nítida
  expandedImageForeground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  modalHint: {
    position: "absolute",
    bottom: 35,
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.7,
  },
});
