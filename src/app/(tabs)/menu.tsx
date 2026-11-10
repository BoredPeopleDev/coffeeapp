
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import SectionHeader from '../../components/common/SectionHeader';
import { useRouter } from 'expo-router';
import { Coffee, CupSoda, GlassWater, Package } from 'lucide-react-native';
const categorias = [
  {
    id: 'calientes',
    nombre: 'Calientes',
    descripcion: 'Disfruta nuestras bebidas calientes',
    Icon: Coffee,
    color: '#D9B99B',
  },
  {
    id: 'frappes',
    nombre: 'Frappes',
    descripcion: 'Bebidas cremosas y frías',
    Icon: CupSoda,
    color: '#B88965',
  },
    {
    id: 'bebidas-frias',
    nombre: 'CafiAllDay',
    descripcion: 'Refrescantes para ti',
    Icon: GlassWater,
    color: '#CBAE91',
  },
  {
    id: 'cafe-envasado',
    nombre: 'Café envasado',
    descripcion: 'Lleva Cafiver a casa',
    Icon: Package,
    color: '#8C6048',
  },
];
export default function MenuScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
  title="Nuestro menú"
  subtitle="Descubre tu próxima bebida favorita"
/>

      <View style={styles.grid}>
        {categorias.map((categoria) => {
          const Icon = categoria.Icon;

          return (
            <Pressable
              key={categoria.id}
              style={styles.card}
              onPress={() =>
                router.push(`/categoria/${categoria.id}` as any)
              }
            >
           


{categoria.id === 'cafe-envasado' ? (
  <ImageBackground
    source={require('../../../assets/cafe-envasado.jpg')}
    style={styles.image}
     imageStyle={{
      transform: [
        { scale: 1.0 },
        { translateY: 0 },
      ],
    }}
    resizeMode="cover"
  />
) : categoria.id === 'calientes' ? (
  <ImageBackground
    source={require('../../../assets/bebida-caliente.jpg')}
    style={styles.image}
    imageStyle={{
      transform: [
        { scale: 1.0 },
        { translateY: 0 },
      ],
    }}
    resizeMode="cover"
  />
) : categoria.id === 'bebidas-frias' ? (
  <ImageBackground
    source={require('../../../assets/caffiallday.jpeg')}
    style={styles.image}
    resizeMode="cover"
  /> )
   : categoria.id === 'frappes' ? (
  <ImageBackground
    source={require('../../../assets/frappe.jpeg')}
    style={styles.image}
    resizeMode="cover"
  /> )

 : (
  <View
    style={[
      styles.image,
      { backgroundColor: categoria.color },
    ]}
  >
    <Icon color="#FFFFFF" size={55} strokeWidth={1.5} />
  </View>
)}



              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  {categoria.nombre}
                </Text>

                <Text style={styles.cardDescription}>
                  {categoria.descripcion}
                </Text>

                <Text style={styles.seeMore}>
                  Ver productos →
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EE',
  },
  content: {
    padding: 20,
    paddingTop: 35,
    paddingBottom: 35,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 18,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 13,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38251D',
  },
  cardDescription: {
    fontSize: 11,
    color: '#8C8178',
    marginTop: 5,
  },
  
 imageStyle: {
  borderTopLeftRadius: 20,
  borderTopRightRadius: 0,
  transform: [
    { translateY:0 },
    { scale: 1.15 },
  ],
},

imageOverlay: {
  flex: 1,
  backgroundColor: 'rgba(56, 37, 29, 0.20)',
  justifyContent: 'center',
  alignItems: 'center',
},
  seeMore: {
    color: '#A77B59',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 12,
  },
});
