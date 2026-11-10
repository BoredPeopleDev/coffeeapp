
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Coffee } from 'lucide-react-native';

import { productos } from '../../data/products';

const nombresCategorias: Record<string, string> = {
  'calientes': 'Calientes',
  'frappes': 'Frappes',
  'bebidas-frias': 'Bebidas frías',
  'cafe-envasado': 'Café envasado',
};

export default function CategoriaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const nombreCategoria = nombresCategorias[id ?? ''];

  const productosFiltrados = productos.filter(
    (producto) => producto.categoria === nombreCategoria
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft color="#38251D" size={22} />
        <Text style={styles.backText}>Regresar al menú</Text>
      </Pressable>

      <Text style={styles.title}>
        {nombreCategoria || 'Categoría'}
      </Text>

      <Text style={styles.subtitle}>
        Descubre nuestros productos
      </Text>

      <Text style={styles.results}>
        {productosFiltrados.length} productos disponibles
      </Text>

      {productosFiltrados.map((producto) => (
        <View key={producto.id} style={styles.card}>
          <View style={styles.image}>
            <Coffee color="#A77B59" size={45} />
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>
              {producto.nombre}
            </Text>

            <Text style={styles.description}>
              {producto.descripcion}
            </Text>

            <View style={styles.footer}>
              <Text style={styles.price}>
                ${producto.precio.toFixed(2)}
              </Text>

              <Text style={[
                styles.availability,
                !producto.disponible && styles.unavailable,
              ]}>
                {producto.disponible ? 'Disponible' : 'Agotado'}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {productosFiltrados.length === 0 && (
        <View style={styles.empty}>
          <Coffee color="#A77B59" size={45} />

          <Text style={styles.emptyTitle}>
            Próximamente
          </Text>

          <Text style={styles.emptyText}>
            Estamos preparando productos para esta categoría.
          </Text>
        </View>
      )}
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  backText: {
    color: '#38251D',
    marginLeft: 8,
    fontWeight: '600',
  },
  title: {
    color: '#38251D',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8C8178',
    fontSize: 14,
    marginTop: 7,
  },
  results: {
    color: '#8C8178',
    fontSize: 13,
    marginTop: 25,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,
  },
  image: {
    height: 150,
    backgroundColor: '#EBDCCB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: 17,
  },
  name: {
    color: '#38251D',
    fontSize: 17,
    fontWeight: 'bold',
  },
  description: {
    color: '#8C8178',
    fontSize: 13,
    marginTop: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  price: {
    color: '#A77B59',
    fontSize: 19,
    fontWeight: 'bold',
  },
  availability: {
    color: '#6D8B65',
    fontSize: 12,
    fontWeight: '600',
  },
  unavailable: {
    color: '#B45B50',
  },
  empty: {
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  emptyTitle: {
    color: '#38251D',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  emptyText: {
    color: '#8C8178',
    textAlign: 'center',
    marginTop: 8,
  },
});
