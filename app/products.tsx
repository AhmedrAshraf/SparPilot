import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const CATEGORIES = [
  { id: '1', emoji: '📱', title: 'Technik' },
  { id: '2', emoji: '🪑', title: 'Haushalt' },
  { id: '3', emoji: '👕', title: 'Mode' },
  { id: '4', emoji: '🧴', title: 'Drogerie & Beauty' },
  { id: '5', emoji: '🧸', title: 'Kinder & Familie' },
  { id: '6', emoji: '📚', title: 'Büro & Schule' },
  { id: '7', emoji: '🧳', title: 'Reisen & Zubehör' },
  { id: '8', emoji: '➕', title: 'Weitere später' },
];

const GRID_PADDING = 24;
const GRID_GAP = 16;
const MIN_CARD_WIDTH = 160;

export default function ProductsScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  
  const availableWidth = windowWidth - (GRID_PADDING * 2);
  const columns = Math.max(2, Math.floor(availableWidth / (MIN_CARD_WIDTH + GRID_GAP)));
  const cardWidth = (availableWidth - (GRID_GAP * (columns - 1))) / columns;

  const handleCategoryPress = (category: string) => {
    if (category === 'Technik') {
      router.push('/products/technik');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#2DC6C9" strokeWidth={1.5} />
          </TouchableOpacity>
          <Text style={styles.title}>Produkte</Text>
          <Text style={styles.subtitle}>Wähle eine Kategorie</Text>
        </View>

        <View style={[styles.grid, { padding: GRID_PADDING, gap: GRID_GAP }]}>
          {CATEGORIES.map((category, index) => (
            <Animated.View
              key={category.id}
              entering={FadeInDown.duration(400).delay(index * 100)}
              style={[styles.gridItem, { width: cardWidth }]}
            >
              <TouchableOpacity
                style={styles.categoryCard}
                activeOpacity={0.9}
                onPress={() => handleCategoryPress(category.title)}
              >
                <Text style={styles.emoji}>{category.emoji}</Text>
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#2DC6C9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    aspectRatio: 1,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.3,
  },
});