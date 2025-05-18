import { StyleSheet, View, Text, TouchableOpacity, Image, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';

import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';
import { CATEGORIES } from '@/constants/categories';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={() => Keyboard.dismiss()}
        scrollEventThrottle={16}
      >
        <View style={styles.hero}>
          <Image
            source={require('../../assets/images/image.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <LinearGradient
            colors={['rgba(45, 198, 201, 0.5)', 'rgba(28, 42, 74, 0.7)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
          <View style={styles.heroContent}>
            <View style={styles.textContainer}>
              <Text style={styles.heroTitle}>SparPilot</Text>
              <Text style={styles.heroSubtitle}>Deine All-in-One Spar-App</Text>
              <View style={styles.sloganContainer}>
                <Text style={styles.slogan}>
                  Vergleiche. Deals. Cashback. Gutscheine.
                </Text>
                <Text style={styles.slogan}>
                  Timing. KI-Coaching.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.9}>
              <Text style={styles.heroButtonText}>Jetzt entdecken</Text>
              <ArrowRight size={20} color="#2DC6C9" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <SearchBar />
          <CategoryGrid categories={CATEGORIES} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hero: {
    height: 460,
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.95,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '120%',
    height: '120%',
    top: '-14%',
    left: '-10%',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    paddingTop: 80,
    paddingBottom: 60,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    opacity: 0.95,
    marginBottom: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  sloganContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  slogan: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    opacity: 0.9,
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  heroButton: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2DC6C9',
    letterSpacing: -0.3,
  },
  content: {
    flex: 1,
    marginTop: -48,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FAFBFC',
    paddingTop: 32,
  },
});