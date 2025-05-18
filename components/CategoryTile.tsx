import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Category } from '@/types/categories';

interface CategoryTileProps {
  category: Category;
  index: number;
  width: number;
}

export default function CategoryTile({ category, index, width }: CategoryTileProps) {
  const router = useRouter();
  const animationDelay = 400 + (index * 100);

  const handlePress = () => {
    if (category.title === 'Produkte') {
      router.push('/products');
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(animationDelay)}
      style={[styles.container, { width }]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.95}
        style={styles.button}
      >
        <View style={styles.content}>
          <Text style={styles.emoji}>{category.emoji}</Text>
          <Text style={styles.title}>{category.title}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  content: {
    padding: 28,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.3,
  },
});