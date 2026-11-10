
import { View, Text, StyleSheet } from 'react-native';
import { Snowflake } from 'lucide-react-native';
interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Snowflake color="#36CFFF" size={23} style={styles.snow1} />
      <Snowflake color="#8AE5FF" size={27} style={styles.snow2} />
      <Snowflake color="#A8EEFF" size={35} style={styles.snow3} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B51F2B',
    marginHorizontal: -35,
    marginTop: -50,
    marginBottom: 38,
    paddingHorizontal: 22,
    paddingTop: 95,
    paddingBottom: 30,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
  }
  ,snow1: {
  position: 'absolute',
  top: 100,
  right: 25,
},
snow2: {
  position: 'absolute',
  top: 60,
  left: 25,
},
snow3: {
  position: 'absolute',
  top: 145,
  right: 80,
},
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFE5E5',
    marginTop: 7,
  },
});
