import { StyleSheet, View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Bookmark } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function WatchlistScreen() {
  const router = useRouter();
  const watchlist: any[] = []; // Empty array for demonstration

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.header}
      >
        <View style={styles.titleContainer}>
          <Bookmark size={28} color="#2DC6C9" strokeWidth={1.5} />
          <Text style={styles.title}>Watchlist</Text>
        </View>
        <Text style={styles.subtitle}>
          Behalte deine Favoriten im Blick
        </Text>
      </Animated.View>

      {watchlist.length === 0 ? (
        <Animated.View 
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.emptyContainer}
        >
          <Text style={styles.emptyTitle}>
            Noch nichts gemerkt?
          </Text>
          <Text style={styles.emptyDescription}>
            Füge Produkte oder Reisen zur Watchlist hinzu, um sie später im Blick zu behalten.
          </Text>
          <Pressable
            onPress={() => router.push('/products')}
            style={styles.browseButton}
          >
            <Text style={styles.browseButtonText}>Jetzt stöbern</Text>
          </Pressable>
        </Animated.View>
      ) : (
        <View style={styles.content}>
          {/* Watchlist items will go here */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#2DC6C9',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  browseButton: {
    backgroundColor: '#2DC6C9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});