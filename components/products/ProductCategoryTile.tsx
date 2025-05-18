import { StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { ProductCategory } from '@/types/products';

interface ProductCategoryTileProps {
  category: ProductCategory;
}

const TILE_GAP = 8;
const TILES_PER_ROW = 2;
const SCREEN_PADDING = 16;
const screenWidth = Dimensions.get('window').width;
const tileWidth = (screenWidth - (SCREEN_PADDING * 2) - (TILE_GAP * (TILES_PER_ROW - 1))) / TILES_PER_ROW;

export default function ProductCategoryTile({ category }: ProductCategoryTileProps) {
  return (
    <Link href={`/products/${category.id}/macbook-air-m3`} asChild>
      <TouchableOpacity style={styles.container}>
        <Image source={{ uri: category.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.itemCount}>{category.itemCount} items</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: tileWidth,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: tileWidth,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginHorizontal: 12,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 12,
    marginHorizontal: 12,
  },
});