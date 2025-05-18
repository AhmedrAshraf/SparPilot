import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Products' }: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <ArrowLeft size={24} color="#16a085" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        Entdecke die besten Angebote in allen Kategorien
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#16a085',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5f6368',
    fontWeight: '400',
    lineHeight: 24,
  },
});