import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CategoryTile from './CategoryTile';
import { Category } from '@/types/categories';

interface CategoryGridProps {
  categories: Category[];
}

const GRID_PADDING = 24;
const GRID_GAP = 16;
const TILES_PER_ROW = 2;

const screenWidth = Dimensions.get('window').width;
const tileWidth = (screenWidth - (GRID_PADDING * 2) - GRID_GAP) / TILES_PER_ROW;

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <Animated.View 
      entering={FadeInDown.duration(600).delay(300)}
      style={styles.container}
    >
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <CategoryTile 
            key={category.id}
            category={category}
            index={index}
            width={tileWidth}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GRID_PADDING,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
});