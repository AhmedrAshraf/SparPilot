import { StyleSheet, View, Dimensions } from 'react-native';
import { ProductCategory } from '@/types/products';
import ProductCategoryTile from './ProductCategoryTile';

interface ProductCategoryGridProps {
  categories: ProductCategory[];
}

export default function ProductCategoryGrid({ categories }: ProductCategoryGridProps) {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <ProductCategoryTile key={category.id} category={category} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 8,
  },
});