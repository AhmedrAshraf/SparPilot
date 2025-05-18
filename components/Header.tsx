import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Header() {
  return (
    <Animated.View 
      entering={FadeInDown.duration(600).delay(100)}
      style={styles.container}
    >
      <Text style={styles.title}>SparPilot</Text>
      <Text style={styles.subtitle}>
        Dein intelligenter Begleiter für maximale Ersparnis
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#16a085',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5f6368',
    fontWeight: '400',
    lineHeight: 24,
  },
});