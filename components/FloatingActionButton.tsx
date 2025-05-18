import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

interface FloatingActionButtonProps {
  onPress: () => void;
}

export default function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <Animated.View 
      entering={FadeIn.duration(600).delay(800)}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#2DC6C9', '#1C2A4A']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.content}>
            <Sparkles size={32} color="white" strokeWidth={1.5} />
            <Text style={styles.label}>Coach</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100,
  },
  buttonWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});