import { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    // Animate title
    titleOpacity.value = withSequence(
      withTiming(1, { duration: 800 }),
      withDelay(2500, withTiming(0, { duration: 500 }))
    );

    // Animate subtitle with delay
    subtitleOpacity.value = withSequence(
      withDelay(1000, withTiming(1, { duration: 800 })),
      withDelay(1500, withTiming(0, { duration: 500 }))
    );

    // Fade out entire screen
    screenOpacity.value = withDelay(2500, withTiming(0, { duration: 500 }, () => {
      runOnJS(onComplete)();
    }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: withTiming(titleOpacity.value * -10) }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: withTiming(subtitleOpacity.value * -10) }],
  }));

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      <Image
        source={require('@/assets/images/image.png')}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={['rgba(45, 198, 201, 0.5)', 'rgba(28, 42, 74, 0.7)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <Animated.Text style={[styles.title, titleStyle]}>
          Ich bin SparPilot
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          Deine All-in-One Spar-App
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});