import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function SearchScreen() {
  const { query } = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Results for: {query}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
  },
});